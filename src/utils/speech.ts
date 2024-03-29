import * as fs from 'fs/promises';
import {
	GlobalKeyboardListener,
	IGlobalKeyListener,
} from 'node-global-key-listener';
import {globalPaste} from './pasteGlobal.js';
import {speechToText} from './speechToText.js';

const v = new GlobalKeyboardListener();

export const transcribeAndPaste = async (filePathOverride?: string) => {
	const filePath = filePathOverride || '.rec.wav';

	const file = await fs.readFile(filePath);
	const transcription = await speechToText(file, ``);

	globalPaste(transcription);
	return transcription;
};

let ctrlDown = false;
let shiftDown = false;
let optionDown = false;
let commandDown = false;

export const startListening = ({
	onCancelRecording,
	onStartOrStop,
}: {
	onCancelRecording: () => void;
	onStartOrStop: () => void;
}) => {
	const listener: IGlobalKeyListener = function (e) {
		if (e.rawKey.name === 'Control') {
			ctrlDown = e.state === 'DOWN';
		} else if (e.rawKey.name === 'Shift') {
			shiftDown = e.state === 'DOWN';
		} else if (e.rawKey.name === 'Option') {
			optionDown = e.state === 'DOWN';
		} else if (e.rawKey.name === 'Command') {
			commandDown = e.state === 'DOWN';
		}

		if (commandDown && e.rawKey.name === 'Escape' && e.state === 'DOWN') {
			onCancelRecording();
		}

		if (
			ctrlDown &&
			shiftDown &&
			optionDown &&
			commandDown &&
			e.rawKey.name === 'W' &&
			e.state === 'DOWN'
		) {
			onStartOrStop();
		}
	};
	v.addListener(listener);

	return () => {
		v.removeListener(listener);
	};
};
