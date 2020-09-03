<template>
	<ul class="sequencer">
		<li
			v-for="({ label, sequence }, sequenceIndex) in sequences"
			:key="sequenceIndex"
		>
			<ul class="sequence">
				<li
					v-for="(step, stepIndex) in sequence"
					:key="`step-${sequenceIndex}-${stepIndex}`"
				>
					<input
						class="sequence__checkbox"
						type="checkbox"
						:id="`stepInput-${sequenceIndex}-${stepIndex}`"
						v-model="sequence[stepIndex]"
					/>
					<label
						:for="`stepInput-${sequenceIndex}-${stepIndex}`"
						class="sequence__step"
						:class="{
							'sequence__step--selected': step,
							'sequence__step--active': stepIndex === activeStep,
						}"
					>
						<span v-if="stepIndex === 0">{{ label }}</span>
					</label>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';
import { Transport } from 'tone';

export default {
	computed: mapState(['sequences', 'activeStep']),
	mounted() {
		Transport.bpm.value = 180;
		Transport.scheduleRepeat((time) => {
			this.$store.dispatch('step');
			this.$store.state.sequences.forEach(({ sequence, sound }) => {
				if (sequence[this.activeStep]) sound.trigger('8n', time);
			});
		}, '8n');
	},
};
</script>

<style lang="scss" scoped>
.sequencer {
	align-items: stretch;
	background: #333;
	box-shadow: 0 0 50px 10px #000;
	display: flex;
	flex-direction: column;
	gap: 1px;
	justify-content: stretch;
	list-style: none;
	margin: 0;
	padding: 0;
	width: 90%;
}

.sequence {
	display: grid;
	gap: 1px;
	grid-template-columns: repeat(16, 1fr);
	grid-template-rows: auto;
	list-style: none;
	margin: 0;
	padding: 0;
	width: 100%;

	li {
		align-items: center;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	&__checkbox {
		position: absolute;
		width: 0;
	}

	&__step {
		// border-radius: 50%;
		background: #222;
		cursor: pointer;
		display: block;
		outline: none;
		padding-bottom: 100%;
		transition: 1.5s opacity;
		width: 100%;
		position: relative;

		span {
			position: absolute;
			color: white;
			opacity: 0.5;
			pointer-events: none;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&--selected {
			background: #e08dac;
		}

		&--active {
			opacity: 0.5;
			transition: 0.1s opacity;
		}
	}
}
</style>
