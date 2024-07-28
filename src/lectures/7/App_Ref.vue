<template>
	<div>
		<p>{{ message }}</p>
		<button @click="addMessage">Click</button>
	</div>
</template>

<script setup>
// import { reactive, ref } from 'vue';
import { ref } from 'vue';

// let message = reactive({
// 	value: 'Hello Vue',
// });
let message = ref('Hello Vue');
const addMessage = () => {
	message.value = message.value + '!';
};
// console.log('message:', message.value);
// console.log('message typeof:', typeof message.value);
</script>

<style lang="scss" scoped></style>
