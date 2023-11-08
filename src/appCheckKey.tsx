import {Box, Newline, Text} from 'ink';
import React from 'react';
import App, {apiKey} from './app/app.js';

export default function AppCheckKey() {
	if (apiKey) {
		return <App />;
	}

	return (
		<Box paddingLeft={0} paddingTop={1} gap={1}>
			<Box
				borderStyle={'single'}
				padding={1}
				flexDirection="column"
				borderColor={'red'}
			>
				<Text>OPENAPI_API_KEY is not set :(</Text>
				<Newline />
				<Text>
					Please go to OpenAI{' '}
					<Text color="cyan">
						(https://platform.openai.com/account/api-keys)
					</Text>{' '}
					and create an API key.
				</Text>
				<Newline />
				<Text>
					Once you have your key, put it in the environment:
					<Newline />
				</Text>

				<Text>
					1. Set it in your environment as OPENAPI_API_KEY (in your .bashrc for
					example)
				</Text>
				<Text>2. Or run globalscribe like this: </Text>
				<Box borderColor={'gray'} borderStyle={'single'}>
					<Text>
						OPENAPI_API_KEY=<Text color={'gray'}>yourkeyhere</Text> npx
						globalscribe
					</Text>
				</Box>
			</Box>
		</Box>
	);
}
