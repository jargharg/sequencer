<template>
	<ul :class="['sequence', { [`sequence--${stepColor}`]: stepColor }]">
		<li
			v-for="(isStepSelected, stepIndex) in sequence"
			:key="`step-${sequenceId}-${stepIndex}`"
		>
			<input
				class="sequence__checkbox"
				type="checkbox"
				:id="`stepInput-${sequenceId}-${stepIndex}`"
				v-model="sequence[stepIndex]"
			/>
			<label
				:for="`stepInput-${sequenceId}-${stepIndex}`"
				:class="[
					'sequence__step',
					{ 'sequence__step--selected': isStepSelected },
					{ 'sequence__step--active': activeStep === stepIndex },
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
		sequenceId: {
			type: [Number, String],
			default: Math.random(),
		},
	},
	computed: {
		...mapState(['activeStep']),
	},
};
</script>

<style lang="scss" scoped>
.sequence {
	--background-color: #e08dac;

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

	&--yellow {
		--background-color: #ffc100;
	}

	&--red {
		--background-color: #ff3a20;
	}

	&__checkbox {
		opacity: 0;
		position: absolute;
		width: 0;
	}

	&__step {
		$root: &;
		background: #222;
		cursor: pointer;
		display: block;
		outline: none;
		padding-bottom: 100%;
		position: relative;
		width: 100%;

		&--selected {
			background: var(--background-color);
			opacity: 0.8;
			position: relative;
			transition: opacity 0.5s;

			&::after {
				background: var(--background-color);
				box-shadow: 0 0 20px 2px var(--background-color);
				content: '';
				height: 100%;
				opacity: 0;
				position: absolute;
				transition: opacity 0.5s;
				width: 100%;
			}
		}

		&--active {
			opacity: 0.8;

			&#{$root}--selected,
			&#{$root}--selected::after {
				opacity: 1;
				transition: opacity 0.05s;
			}
		}
	}
}
</style>
