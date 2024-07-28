<template>
	<div></div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// ref -> Object
const count = ref(0);
const state = reactive({
	count,
});
console.log(count.value);
console.log('state count:', state.count);

// ref -> Array
const message = ref('Hello');
const arr = reactive([message]);
console.log('arr[0]:', arr[0].value);
</script>

<style lang="scss" scoped></style>
