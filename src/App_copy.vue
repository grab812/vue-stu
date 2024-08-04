<template>
	<div class="chk_group" id="cj_agree">
		<!-- 전체동의 -->
		<span class="check_box" :class="{ on: allChecked }" @click="toggleAll">
			<a href="#">
				<span class="haze"
					>전체 동의<span>{{ allChecked ? '선택됨' : '미선택됨' }}</span></span
				>
			</a>
			<input type="checkbox" v-model="allChecked" @change="checkAll" />
			<label class="label_check"><span class="ico"></span>전체 동의</label>
		</span>

		<!-- Email -->
		<span class="check_box" :class="{ on: emailChecked }" @click="toggleEmail">
			<a href="#">
				<span class="haze"
					>이메일<span>{{ emailChecked ? '선택됨' : '미선택됨' }}</span></span
				>
			</a>
			<input type="checkbox" v-model="emailChecked" />
			<label class="label_check"><span class="ico"></span>이메일</label>
		</span>

		<!-- SMS -->
		<span class="check_box" :class="{ on: smsChecked }" @click="toggleSms">
			<a href="#">
				<span class="haze"
					>SMS<span>{{ smsChecked ? '선택됨' : '미선택됨' }}</span></span
				>
			</a>
			<input type="checkbox" v-model="smsChecked" />
			<label class="label_check"><span class="ico"></span>SMS</label>
		</span>

		<!-- Phone -->
		<span class="check_box" :class="{ on: phoneChecked }" @click="togglePhone">
			<a href="#">
				<span class="haze"
					>휴대전화<span>{{ phoneChecked ? '선택됨' : '미선택됨' }}</span></span
				>
			</a>
			<input type="checkbox" v-model="phoneChecked" />
			<label class="label_check"><span class="ico"></span>휴대전화</label>
		</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			allChecked: false,
			emailChecked: false,
			smsChecked: false,
			phoneChecked: true, // initially checked
		};
	},
	watch: {
		emailChecked() {
			this.updateAllChecked();
		},
		smsChecked() {
			this.updateAllChecked();
		},
		phoneChecked() {
			this.updateAllChecked();
		},
	},
	methods: {
		toggleAll() {
			this.allChecked = !this.allChecked;
			this.checkAll();
		},
		toggleEmail() {
			this.emailChecked = !this.emailChecked;
		},
		toggleSms() {
			this.smsChecked = !this.smsChecked;
		},
		togglePhone() {
			this.phoneChecked = !this.phoneChecked;
		},
		updateAllChecked() {
			this.allChecked =
				this.emailChecked && this.smsChecked && this.phoneChecked;
		},
		checkAll() {
			this.emailChecked = this.allChecked;
			this.smsChecked = this.allChecked;
			this.phoneChecked = this.allChecked;
		},
	},
};
</script>

<style>
/* Add your styles here */
</style>
