<template>
	<div>
		<!-- <div class="text" :class="{ active: isActive, 'text-danger': hasError }"> -->
		<div
			class="text"
			:class="[classObject ? 'active-class' : 'class', activeClass, errorClass]"
		>
			텍스트입니다
		</div>
		<button @click="toggle">toggle</button>
		<button @click="toggle">toggleError</button>
	</div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const isActive = ref(true);
const hasError = ref(false);

// const classObject = reactive({
// 	active: true,
// 	'text-danger': true,
// });

const classObject = computed(() => {
	return {
		active: true,
		'text-danger': true,
	};
});

const activeClass = ref('active');
const errorClass = ref('error');

const toggle = () => {
	isActive.value = !isActive.value;
	hasError.value = !hasError.value;
};
</script>

<style lang="scss" scoped>
.text-danger {
	color: red;
}
</style>
