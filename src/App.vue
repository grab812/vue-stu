<template>
	<div>
		<h2>V-html</h2>
		<div v-html="rawHtml"></div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const rawHtml = ref('<strong>안녕</strong>');
</script>

<style lang="scss" scoped></style>
