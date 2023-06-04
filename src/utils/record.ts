import {exec, spawn} from 'child_process';
import {Readable} from 'stream';
import * as fs from 'fs';

const cmd = 'sox';
const args = ['-d', '-t', 'coreaudio', '-t', 'wav', '-'];
const soundBasePath = 'sounds/';
const onStartSound = soundBasePath + 'Hero.aiff';
const onStopSound = soundBasePath + 'Submarine.aiff';
const onCancelSound = soundBasePath + 'Cancel.aiff';

let recordingProcess: ReturnType<typeof spawn> | null = null;
let audioBuffer: Buffer[] = [];

export async function startRecording(): Promise<void> {
	if (recordingProcess !== null) {
		throw new Error('Already recording.');
	}
	audioBuffer = [];
	recordingProcess = spawn(cmd, args);

	recordingProcess.stdout!.on('data', (data: Buffer) => {
		audioBuffer.push(data);
	});

	exec(`afplay ${onStartSound}`);
}

export function isRecording(): boolean {
	return recordingProcess !== null;
}

export async function stopRecording() {
	if (recordingProcess === null) {
		return;
	}
	exec(`afplay ${onStopSound}`);
	recordingProcess.kill('SIGINT');
	const audioData = Buffer.concat(audioBuffer);
	const fileName = `.rec.wav`;
	const fileStream = fs.createWriteStream(fileName);
	const readableStream = new Readable();
	readableStream.push(audioData);
	readableStream.push(null);
	readableStream.pipe(fileStream);
	await new Promise<void>((resolve, reject) => {
		fileStream.on('finish', () => {
			resolve();
		});
		fileStream.on('error', err => {
			reject(err);
		});
	});
	recordingProcess = null;
}

export const cancelRecording = async () => {
	if (recordingProcess === null) {
		return;
	}
	exec(`afplay ${onCancelSound}`);
	recordingProcess.kill('SIGINT');
	recordingProcess = null;
};
