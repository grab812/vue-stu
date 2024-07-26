<template>
	<div>
		<button @click="increment">Click {{ state.count }}</button>
		<button @click="increment">Deep Click {{ state.deep.count }}</button>
	</div>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
	count: 0,
	deep: {
		count: 0,
	},
});
const increment = () => {
	state.count++;
	state.deep.count++;
};
</script>

<style lang="scss" scoped></style>
