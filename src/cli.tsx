#!/usr/bin/env node
import {render} from 'ink';
import meow from 'meow';
import React from 'react';
import AppCheckKey from './appCheckKey.js';

meow(
	`
	Usage
	  $ globalscribe
`,
	{
		importMeta: import.meta,
	},
);

render(<AppCheckKey />);
