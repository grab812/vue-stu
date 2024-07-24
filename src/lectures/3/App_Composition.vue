<template>
	<div>
		<button v-on:click="increment">counter: {{ counter }}</button>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
	setup() {
		const counter = ref(0);
		const increment = () => counter.value++;
		onMounted(() => {
			console.log('컨포넌트가 마운트 되었습니다.');
		});
		return {
			counter,
			increment,
		};
	},
};
</script>

<style lang="scss" scoped></style>
