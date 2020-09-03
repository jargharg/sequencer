import Vue from 'vue';
import Vuex from 'vuex';
import { start, Transport, MembraneSynth, NoiseSynth, PolySynth } from 'tone';

const SEQUENCE_LENGTH = 16;

Vue.use(Vuex);

function createEmptySequence() {
	let sequence = [];
	for (let i = 0; i < SEQUENCE_LENGTH; i++) sequence.push(false);
	return sequence;
}

class Sequence {
	constructor(synth, note, label) {
		this.sequence = createEmptySequence();
		this.label = label;
		this.sound = new Sound(synth, note);
	}
}

class Sound {
	constructor(synth, note = null) {
		this.synth = synth;
		this.note = note;
	}

	trigger(duration, time) {
		if (this.note) {
			this.synth.triggerAttackRelease(this.note, duration, time);
		} else {
			this.synth.triggerAttackRelease(duration, time);
		}
	}
}

let kick = new MembraneSynth().toDestination();
let snare = new NoiseSynth().toDestination();
let synth = new PolySynth().toDestination();

export default new Vuex.Store({
	state: {
		activeStep: -1,
		playing: false,
		sequences: [
			new Sequence(synth, 'e4', 'e'),
			new Sequence(synth, 'd4', 'd'),
			new Sequence(synth, 'c4', 'c'),
			new Sequence(synth, 'b3', 'b'),
			new Sequence(synth, 'a3', 'a'),
			new Sequence(synth, 'g3', 'g'),
			new Sequence(synth, 'f#3', 'f#'),
			new Sequence(synth, 'e3', 'e'),
			new Sequence(snare, null, 'S'),
			new Sequence(kick, 'c1', 'K'),
		],
		toneInitialised: false,
	},
	mutations: {
		initialiseTone(state) {
			state.toneInitialised = true;
			start();
		},
		togglePlaying(state) {
			state.playing = !state.playing;
			Transport.toggle();
		},
		updateActiveStep(state, step) {
			state.activeStep = step;
		},
		updatePlaying(state, playing) {
			state.playing = playing;
			if (playing) {
				Transport.resume();
			} else {
				Transport.pause();
			}
		},
		updateSequence(state, { index, sequence }) {
			state.sequences[index].sequence = sequence;
		},
	},
	actions: {
		resetPlaying({ commit, dispatch }) {
			commit('updatePlaying', false);
			dispatch('resetActiveStep');
		},
		resetSequences({ state, commit, dispatch }) {
			state.sequences.forEach((_, index) => {
				commit('updateSequence', { index, sequence: createEmptySequence() });
			});
			dispatch('resetActiveStep');
		},
		resetActiveStep({ commit }) {
			commit('updateActiveStep', -1);
		},
		step({ state: { activeStep }, commit }) {
			commit(
				'updateActiveStep',
				activeStep < SEQUENCE_LENGTH - 1 ? activeStep + 1 : 0,
			);
		},
	},
});
