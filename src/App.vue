<template>
	<div>
		<h2>반응형 메세지</h2>
		<p>{{ reactiveMessage }}</p>
		<button @click="addreactiveMessage">Add Message</button>
		<h2>일반 메세지</h2>
		<p>{{ normalMessage }}</p>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const reactiveMessage = ref('Hello Reactive Message');
const addreactiveMessage = () => {
	reactiveMessage.value = reactiveMessage.value + '!';
};
const normalMessage = 'Hello Normal Message';
</script>

<style lang="scss" scoped></style>
