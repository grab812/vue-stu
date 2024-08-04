<template>
	<div class="chk_group" id="cj_agree">
		<span class="check_box" :class="{ on: allChecked }" @click="toggleAll">
			<a href="#"
				><span class="haze"
					>전체 동의<span>{{ allChecked ? '선택됨' : '미선택됨' }}</span></span
				></a
			>
			<input
				type="checkbox"
				class="chk"
				v-model="allChecked"
				@change="checkAll"
			/>
			<label class="label_check"><span class="ico"></span>전체 동의</label>
		</span>

		<span
			v-for="(checked, label) in checkboxes"
			:key="label"
			class="check_box"
			:class="{ on: checked }"
			@click="toggleCheckbox(label)"
		>
			<a href="#"
				><span class="haze"
					>{{ label }}<span>{{ checked ? '선택됨' : '미선택됨' }}</span></span
				></a
			>
			<input type="checkbox" class="chk" v-model="checkboxes[label]" />
			<label class="label_check"><span class="ico"></span>{{ label }}</label>
		</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			allChecked: true,
			checkboxes: {
				이메일: true,
				SMS: true,
				휴대전화: true,
			},
		};
	},
	watch: {
		checkboxes: {
			handler() {
				this.updateAllChecked();
			},
			deep: true,
		},
	},
	methods: {
		toggleAll() {
			this.allChecked = !this.allChecked;
			this.checkAll();
		},
		toggleCheckbox(label) {
			this.checkboxes[label] = !this.checkboxes[label];
		},
		updateAllChecked() {
			this.allChecked = Object.values(this.checkboxes).every(Boolean);
		},
		checkAll() {
			Object.keys(this.checkboxes).forEach(key => {
				this.checkboxes[key] = this.allChecked;
			});
		},
	},
};
</script>

<style lang="scss">
.check_box {
	display: inline-block;
	position: relative;
	height: 16px;
	padding-left: 0;
	line-height: 16px;
	zoom: 1;
	margin-right: 20px;
	color: #888;
	&.on a {
		background-position: -16px -16px;
	}
	a {
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(https://www.cjone.com/cjmweb/images/common/bg_form.png)
			no-repeat;
		vertical-align: middle;
		background-position: -16px 0;
		.haze {
			position: absolute;
			top: -99999px;
		}
	}
	span.hide {
		display: none;
	}
	.chk {
		display: none;
	}
	label {
		margin: 3px 3px 3px 4px;
		cursor: pointer;
	}
}
</style>
