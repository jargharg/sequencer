export default class Sound {
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
