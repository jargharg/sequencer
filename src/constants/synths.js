import { MembraneSynth, NoiseSynth, PolySynth, Chorus, MonoSynth } from 'tone';

const CHORUS = new Chorus(0.8).toDestination();

export const KICK = new MembraneSynth().toDestination();
export const SNARE = new NoiseSynth().toDestination();
export const SYNTH = new PolySynth(MonoSynth).toDestination();

SYNTH.connect(CHORUS);
