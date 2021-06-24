<template>
	<ul class="sequencer">
		<li v-for="({ sequence }, index) in sequences.tuned" :key="index">
			<Sequence v-bind="{ sequence, sequenceId: index }" />
		</li>
		<li>
			<Sequence
				sequence-id="snare"
				step-color="yellow"
				:sequence="sequences.drums.snare.sequence"
			/>
		</li>
		<li>
			<Sequence
				sequence-id="kick"
				step-color="red"
				:sequence="sequences.drums.kick.sequence"
			/>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';
import { Transport } from 'tone';
import Sequence from './Sequence';

export default {
	components: { Sequence },
	computed: mapState(['sequences', 'activeStep']),
	mounted() {
		Transport.scheduleRepeat((time) => {
			this.$store.dispatch('step');
			this.$store.getters.allSequences.forEach(({ sequence, sound }) => {
				if (sequence[this.activeStep]) sound.trigger('8n', time);
			});
		}, '8n');
		this.$store.dispatch('randomiseTunedSequences');
		this.$store.dispatch('setMotorikBeat');
	},
};
</script>

<style lang="scss" scoped>
.sequencer {
	align-items: stretch;
	background: #888;
	box-shadow: 0 0 100px 20px #0009;
	display: flex;
	flex-direction: column;
	gap: 1px;
	justify-content: stretch;
	list-style: none;
	margin: 0;
	padding: 0;
	width: 90%;
	max-width: 55rem;
}
</style>
