<template>
	<div></div>
</template>

<script setup>
import { reactive, readonly } from 'vue';

const original = reactive({
	count: 0,
});
original.count++;
const copy = readonly(original);
copy.count++;

console.log(original.count);
console.log(copy.count);
</script>

<style lang="scss" scoped></style>
