import {openai} from './openai.js';

export const formatGpt = async (
	sourceText: string,
	modificationPrompt: string,
) => {
	const chatCompletion = await openai.createChatCompletion({
		model: 'gpt-4',
		messages: [
			{
				role: 'system',
				content:
					'You are an assistant that formats messages. You never add your own content. You never change wording. You only format content, for example, by adding bullet points or small, small changes. You work with the source message and transform it as described in the transformation prompt.',
			},
			{
				role: 'user',
				content: [
					'Source message: ' + sourceText,
					'Transformation prompt: ' + modificationPrompt,
				].join('\n'),
			},
		],
	});

	return chatCompletion.data.choices[0]?.message?.content;
};
