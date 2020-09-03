<template>
	<div id="app">
		<Sequencer />
		<TransportControls />
	</div>
</template>

<script>
import Sequencer from './components/Sequencer.vue';
import TransportControls from './components/TransportControls.vue';

export default {
	name: 'app',
	components: {
		Sequencer,
		TransportControls,
	},
};
</script>

<style lang="scss">
html,
body {
	padding: 0;
	margin: 0;
}

* {
	box-sizing: border-box;
}

#app {
	min-height: 100vh;
	width: 100vw;
	font-family: monospace;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #222;
}
</style>
