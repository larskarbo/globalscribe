import FormData from 'form-data';
import {request} from 'undici';
import {apiKey} from '../app/app.js';

const openaiEndpoint = 'https://api.openai.com/v1/audio/transcriptions';
const model = 'whisper-1';

export async function speechToText(file: Buffer, prompt: string) {
	const formData = new FormData();

	formData.append('model', model);
	formData.append('file', file, 'file.wav');
	formData.append('prompt', prompt);

	const response = await request(openaiEndpoint, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			...formData.getHeaders(),
		},
		body: formData,
	});

	if (response.statusCode !== 200) {
		const responseBody = await response.body.json();
		console.log(responseBody);
		throw new Error(
			`Failed to transcribe audio. Status code: ${response.statusCode}`,
		);
	}

	const transcription = (await response.body.json()) as {
		text: string;
	};

	return transcription.text;
}
