import { MembraneSynth, NoiseSynth, PolySynth, Chorus, MonoSynth } from 'tone';

let chorus = new Chorus(0.8).toDestination();

export let kick = new MembraneSynth().toDestination();
export let snare = new NoiseSynth().toDestination();
export let synth = new PolySynth().toDestination();

synth.connect(chorus);
