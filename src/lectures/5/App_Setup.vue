<template>
	<div>
		<p>{{ counter }}</p>
		<p>{{ message }}</p>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const counter = ref(0);
const message = ref('Hello Vue3');
const imcrement = () => {
	counter.value++;
};
</script>

<style lang="scss" scoped></style>
