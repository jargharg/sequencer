<template>
	<ul class="sequence">
		<li
			v-for="(stepValue, stepIndex) in sequence"
			:key="`step-${sequenceKey}-${stepIndex}`"
		>
			<input
				class="sequence__checkbox"
				type="checkbox"
				:id="`stepInput-${sequenceKey}-${stepIndex}`"
				v-model="sequence[stepIndex]"
			/>
			<label
				:for="`stepInput-${sequenceKey}-${stepIndex}`"
				:class="[
					'sequence__step',
					{ [`sequence__step--${stepColor}`]: stepColor },
					{ 'sequence__step--selected': stepValue },
					{ 'sequence__step--active': stepIndex === activeStep },
				]"
			>
			</label>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
	props: {
		sequence: {
			type: Array,
			default: () => [],
		},
		stepColor: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			sequenceKey: Math.floor(Math.random() * 99999999),
		};
	},
	computed: {
		...mapState(['activeStep']),
	},
};
</script>

<style lang="scss" scoped>
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

		&:checked + .sequence__step {
			background: #e08dac;

			&--yellow {
				background: yellow;
			}

			&--red {
				background: red;
			}
		}
	}

	&__step {
		// border-radius: 50%;
		background: #222;
		cursor: pointer;
		display: block;
		outline: none;
		padding-bottom: 100%;
		// transition: 1.5s opacity;
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

		&--active {
			opacity: 0.5;
			// transition: 0.1s opacity;
		}
	}
}
</style>
