import {Box, Text} from 'ink';
import React, {useEffect, useState} from 'react';
import {
	cancelRecording,
	startRecording,
	stopRecording,
} from './utils/record.js';
import {startListening, transcribeAndPaste} from './utils/speech.js';

export const apiKey = process.env['OPENAPI_API_KEY'];

export default function App() {
	const [isInitiated, setIsInitiated] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [isTranscribing, setIsTranscribing] = useState(false);

	const [previousTranscription, setPreviousTranscription] = useState<string>();

	const onCancelRecording = () => {
		setIsRecording(false);
		cancelRecording();
	};

	const onStartOrStop = () => {
		if (isRecording) {
			setIsTranscribing(true);
			setIsRecording(false);
			stopRecording().then(() => {
				transcribeAndPaste().then(transcription => {
					setIsTranscribing(false);
					setPreviousTranscription(transcription);
				});
			});
		} else {
			void startRecording();
			setIsRecording(true);
		}
	};

	useEffect(() => {
		const destroyer = startListening({
			onCancelRecording,
			onStartOrStop,
		});
		setIsInitiated(true);
		return destroyer;
	}, [isRecording]);

	if (!isInitiated) {
		return <Text>Initiating...</Text>;
	}

	let content = null;

	if (isRecording) {
		content = (
			<>
				<Box marginBottom={1}>
					<Text color={'red'}>● Recording...</Text>
				</Box>
				<Text>
					Press <Text color="green">cmd+alt+ctrl+shift+h</Text> to stop
					recording and transcribe...
				</Text>
				<Text>
					Press <Text color="green">cmd+escape</Text> to cancel recording.
				</Text>
			</>
		);
	} else if (isTranscribing) {
		content = <Text>Transcribing...</Text>;
	} else {
		content = (
			<Text>
				Listening for global shortcut{' '}
				<Text color="green">cmd+alt+ctrl+shift+h</Text>...
			</Text>
		);
	}

	return (
		<Box paddingLeft={0} paddingTop={1} gap={1}>
			<Box
				width={'50%'}
				borderStyle={'single'}
				padding={1}
				flexDirection="column"
			>
				{content}
			</Box>

			{previousTranscription ? (
				<Box
					width="50%"
					borderStyle={'single'}
					borderColor={'gray'}
					padding={1}
					flexDirection="column"
				>
					<>
						<Box marginBottom={1}>
							<Text color={'gray'}>Last transcription:</Text>
						</Box>
						<Text>{previousTranscription}</Text>
					</>
				</Box>
			) : null}
		</Box>
	);
}
