<template>
	<div>
		<h2>V-html</h2>
		<div v-html="rawHtml"></div>

		<div :title="dynamicTitle">hello</div>
		<input type="text" value="홍길동" :disabled="isInputDisabled" />
		<input v-bind="attrs" />
		<h2>javaScript</h2>
		<div>
			{{ dynamicTitle.split('').reverse().join('') }}
			{{ isInputDisabled ? '예' : '아니오' }}
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const rawHtml = ref('<strong>안녕</strong>');
const dynamicTitle = ref('뱌뱌이 해보십시오');
const isInputDisabled = ref(false);
const attrs = ref({
	type: 'password',
	value: '123456',
	disabled: true,
});
</script>

<style lang="scss" scoped></style>
