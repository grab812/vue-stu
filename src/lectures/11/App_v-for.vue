<template>
	<div>
		<ul>
			<template v-for="(item, index) in evenItems" :key="item.id">
				<!-- <li v-if="item.id % 2 === 0"> -->
				<li>id: {{ item.id }} 인덱스 : {{ index }}, {{ item.message }}</li>
			</template>
		</ul>
		<hr />
		<ul>
			<li v-for="(value, key, index) in myObject" :key="key">
				{{ index }}-{{ key }}-{{ value }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import { computed, reactive } from 'vue';

const items = reactive([
	{ id: 1, message: 'Java' },
	{ id: 2, message: 'HTML' },
	{ id: 3, message: 'CSS' },
	{ id: 4, message: 'Vue3' },
]);
const evenItems = computed(() => items.filter(item => item.id % 2 === 0));
const myObject = reactive({
	title: '제목',
	author: '홍길동',
	publishedAt: '2016-01-01',
});
</script>

<style lang="scss" scoped></style>
