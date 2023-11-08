import {apiKey} from '../app/app.js';

import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
	apiKey: apiKey,
});
export const openai = new OpenAIApi(configuration);
