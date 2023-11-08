import {formatGpt} from '../utils/formatGpt.js';

const res = await formatGpt(
	`We ended up not using this because it was not supported on ClickAss Cloud and there might be some side effects and consequences that I'm not aware of.`,
	`Make this be, include two bullet points for the two things and it should be click house, not click ass. Also make the not on the first line be italics in a markdown style.`,
);
console.log(res);
