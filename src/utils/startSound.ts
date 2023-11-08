import {AudioContext} from 'node-web-audio-api';

const audioContext = new AudioContext({
	latencyHint: 'interactive',
}) as AudioContext;

// The playSound function
export async function playSound() {
	// Create and configure oscillator for each call
	let osc = audioContext.createOscillator();
	osc.frequency.value = 200;
	osc.connect(audioContext.destination);

	// Play a sine at 200Hz
	console.log('> Play sine at 200Hz from an OscillatorNode');

	const DURATION = 0.2;
	const EXTRA_WAIT = 0.1;

	osc.start(audioContext.currentTime);
	osc.stop(audioContext.currentTime + DURATION);

	// Wait for 0.5 seconds after stopping oscillator before next play
	await new Promise(resolve =>
		setTimeout(resolve, (DURATION + EXTRA_WAIT) * 1000),
	);
}
