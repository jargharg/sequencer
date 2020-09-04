import Vue from 'vue';
import Vuex from 'vuex';
import { start, Transport } from 'tone';
import { getRandomScale, getEmptySequence } from './helpers';
import { kick, snare, synth } from './constants/synths';
import { Sequence } from './classes';
import { SEQUENCE_LENGTH, CHANCE_OF_STEP } from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		activeStep: -1,
		playing: false,
		sequences: {
			tuned: getRandomScale().map((note) => new Sequence(synth, note)),
			drums: {
				kick: new Sequence(kick, 'e1'),
				snare: new Sequence(snare, null),
			},
		},
		toneInitialised: false,
	},
	getters: {
		allSequences(state) {
			let {
				drums: { kick, snare },
				tuned,
			} = state.sequences;
			return [kick, snare, ...tuned];
		},
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
		updateSequence(state, { key, sequence, type }) {
			state.sequences[type][key].sequence = sequence;
		},
		updateSequenceStep(state, { sequenceType, sequenceIndex, stepIndex, stepValue }) {
			Vue.set(
				state.sequences[sequenceType][sequenceIndex].sequence,
				stepIndex,
				stepValue,
			);
		},
	},
	actions: {
		randomiseTunedSequences({ state, commit, dispatch }) {
			let { tuned: tunedSequences } = state.sequences;
			dispatch('resetSequences', 'tuned');

			let randomSequenceIndex = () =>
				Math.floor(Math.random() * tunedSequences.length);
			let shouldAddStep = () => Math.random() < CHANCE_OF_STEP;

			for (let step = 0; step < SEQUENCE_LENGTH; step++) {
				if (shouldAddStep()) {
					commit('updateSequenceStep', {
						sequenceType: 'tuned',
						sequenceIndex: randomSequenceIndex(),
						stepIndex: step,
						stepValue: true,
					});
				}
			}
		},
		resetActiveStep({ commit }) {
			commit('updateActiveStep', -1);
		},
		resetSequences({ state: { sequences }, commit }, type) {
			sequences[type].forEach((_, key) => {
				commit('updateSequence', {
					key,
					type: 'tuned',
					sequence: getEmptySequence(),
				});
			});
		},
		setMotorikBeat({ commit }) {
			let kick = [true, true, false, true];
			let snare = [false, false, true, false];

			commit('updateSequence', {
				key: 'kick',
				type: 'drums',
				sequence: [...kick, ...kick, ...kick, ...kick],
			});
			commit('updateSequence', {
				key: 'snare',
				type: 'drums',
				sequence: [...snare, ...snare, ...snare, ...snare],
			});
		},
		step({ state: { activeStep, playing }, commit }) {
			if (!playing) return;
			commit(
				'updateActiveStep',
				activeStep < SEQUENCE_LENGTH - 1 ? activeStep + 1 : 0,
			);
		},
		stopPlaying({ commit, dispatch }) {
			commit('updatePlaying', false);
			dispatch('resetActiveStep');
		},
	},
});
