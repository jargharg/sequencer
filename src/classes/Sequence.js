import { getEmptySequence } from '../helpers';
import { Sound } from './index';

export default class Sequence {
	constructor(synth, note) {
		this.sequence = getEmptySequence();
		this.sound = new Sound(synth, note);
	}
}
