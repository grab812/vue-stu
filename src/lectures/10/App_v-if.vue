<template>
	<div>
		<h2 v-if="visible">Hello Vue3✌🏻</h2>
		<h2 v-else>Hello ByeBye👋🏻</h2>
		<button @click="visible = !visible">toggle</button>
		<hr />
		<button @click="type = 'A'">A 버튼</button>
		<button @click="type = 'B'">B 버튼</button>
		<button @click="type = 'C'">C 버튼</button>
		<button @click="type = 'D'">NO 버튼</button>
		<h2 v-if="type === 'A'">A 입니다</h2>
		<h2 v-else-if="type === 'B'">B 입니다</h2>
		<h2 v-else-if="type === 'C'">C 입니다</h2>
		<h2 v-else>A,B,C가 아닙니다</h2>
		<hr />
		<button @click="visible = !visible">listToggle</button>
		<template v-if="visible">
			<h1>Title</h1>
			<p>Paragraph 1</p>
			<p>Paragraph 2</p>
		</template>
		<hr />

		<button @click="ok = !ok">showToggle</button>
		<h1 v-show="ok">Title</h1>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(true);
const type = ref('A');
const ok = ref(false);
</script>

<style lang="scss" scoped></style>
