<template>
	<div>
		<div :style="styleObject">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officia at,
			dolorum excepturi voluptatibus accusamus eveniet tempora praesentium,
			consequatur placeat tenetur. Asperiores sed quae laborum maxime dolore
			cupiditate quam dignissimos?
		</div>
		<button @click="fontSize--">-</button>
		<button @click="fontSize++">+</button>
	</div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

// const styleObject = reactive({
// 	color: 'red',
// 	fonsSize: '13px',
// });
const fontSize = ref(13);

const styleObject = computed(() => {
	return {
		color: 'red',
		fontSize: fontSize.value + 'px',
	};
});
</script>

<style lang="scss" scoped></style>
