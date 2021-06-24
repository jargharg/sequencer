<template>
	<ul class="transport-controls">
		<li>
			<button class="start-tone" @click="togglePlaying">
				<span v-if="playing" class="material-icons">
					pause
				</span>
				<span v-if="!playing" class="material-icons">
					play_arrow
				</span>
			</button>
		</li>
		<li>
			<button class="start-tone" @click="stopPlaying">
				<span class="material-icons">
					stop
				</span>
			</button>
		</li>
		<li>
			<button class="start-tone" @click="resetSequences">
				<span class="material-icons">
					refresh
				</span>
			</button>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: mapState(['playing', 'audioInitialised']),
	methods: {
		togglePlaying() {
			if (!this.audioInitialised) {
				this.$store.commit('initialiseAudio');
			}
			this.$store.commit('togglePlaying');
		},
		stopPlaying() {
			this.$store.dispatch('stopPlaying');
		},
		resetSequences() {
			this.$store.dispatch('randomiseTunedSequences');
		},
	},
};
</script>

<style lang="scss" scoped>
.transport-controls {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;

	li button {
		padding: 10px;
		background: transparent;
		border: none;
		color: darkgray;
		outline: none;
		cursor: pointer;

		&:hover {
			color: white;
		}
	}
}

.material-icons {
	font-size: 30px;
}
</style>
