<template>
	<div>
		<h2>{{ teacher.name }}</h2>
		<h3>강의가 있습니까?!</h3>
		<p>{{ hasLecture }}</p>
		<p>{{ existLecture() }}</p>
		<h2>이름</h2>
		<p>{{ fullName }}</p>
	</div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const teacher = reactive({
	name: 'rameee',
	lectures: ['HTML/CSS', 'JavaScript', 'Vue3'],
});
// computed()가 성능면에서 비용이 적게 듬, 계산된 값이 캐시되기 때문
const hasLecture = computed(() => {
	console.log('computed');
	return teacher.lectures.length > 0 ? '예' : '아니오';
});

const existLecture = () => {
	console.log('method');
	return teacher.lectures.length > 0 ? '예' : '아니오';
};

const firstName = ref('홍');
const lastName = ref('길동');
const fullName = computed({
	get() {
		return firstName.value + ' ' + lastName.value;
	},
	set(value) {
		[firstName.value, lastName.value] = value.split(' ');
	},
});

fullName.value = '짐 코딩';
</script>

<style lang="scss" scoped></style>
