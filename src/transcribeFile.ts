import meow from 'meow';
import {transcribeAndPaste} from './utils/speech.js';

const cli = meow(
	`
	Usage
	  $ npx vite-node src/transcribeFile.ts [filePath]
`,
	{
		importMeta: import.meta,
		flags: {
			filePath: {
				type: 'string',
				isRequired: false,
			},
		},
	},
);

const transcribeFile = async (filePath?: string) => {
	transcribeAndPaste(filePath);
};

// Call the function with the filePath provided as an argument.
transcribeFile(cli.flags.filePath);
