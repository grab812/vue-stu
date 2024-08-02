<script setup>
const day = useNuxtApp().$day;

// data
const userData = ref({
	userId: '', // 사용자ID
	pwdNo: '', // 패스워드
	comGrCd: '', // 사용자회사 업종구분 (사용자구분 COG01:임직원, COG02:대행사, COG03:광고주, COG04:기타, COG05:미등록업종)
	comCd: '', // 소속 회사 코드 (comGrCd : COG05 인 경우 제외, 그외(COG02:대행사, COG03:광고주, COG04:기타) 필수)
	comNm: '', // 소속 회사명 (comGrCd : COG05 인 경우 필수, 그외(COG02:대행사, COG03:광고주, COG04:기타) 필요 없음)
	cmrclCustNm: '', // 사용자 직무 (가입시 입력 받음, 필수 아님)
	mailAddr: '', // 이메일 주소 (email@cj.net)
	adAgreeYn: '', // 마케팅 및 광고성 정보 제공 동의 (Y,N)

	deptCd: '', // 임직원 전용 부서코드
	deptNm: '', // 임직원 전용 부서명
});

const isVerified = ref(false);
const checkedEmail = ref(false);
const isEmployee = ref(false);

// data - ref
const refInputUserId = ref(null);
const refInputPwdNo = ref(null);
const refInputPwdNoVerify = ref(null);
const refInputEmail = ref(null);
const refJoinAgree = ref(null);

const checkPwdNo = ref('');
const agrees = ref([]);

const companiesData = ref([]);
const companyData = computed(() => {
	return companiesData.value.map(datum => {
		const { comNm } = datum;
		return comNm;
	});
});

const checkData = computed(() => {
	return {
		userId: userData.value.userId === validatedData.value.userId,
		mailAddr: userData.value.mailAddr === validatedData.value.mailAddr,
	};
});

const validatedData = ref({
	userId: '',
	mailAddr: '',
});

// data - verification
const verifiedData = ref({});
const broadcastVerification = new BroadcastChannel('verification');
broadcastVerification.onmessage = event => {
	setTimeout(() => {
		if (!event.data) {
			alert('통신이 원활하지 않습니다.\n잠시 후 다시 시도해 주세요.');
			return;
		}
		const { user_name, phone_no, birth_day } = event.data;
		verifiedData.value.userNm = user_name;
		verifiedData.value.telNo = phone_no;
		verifiedData.value.birthDay = birth_day;
	}, 500);
};

// watch
watch(verifiedData.value, async newValue => {
	const res = await authLoginFindId(newValue);
	if (res.status === 200) {
		if (res.data.userStatCd !== 'M0001') {
			alert(messages.CONFLICT_WITHDRAWAL);
			navigateTo('/');
			return;
		}
		alert(`${res.data.userId} ${messages.ALREADY_JOIN}`);
		navigateTo('/member/login');
		return;
	}
	const birthday = day(verifiedData.value.birthDay);
	if (isChild(birthday['year'](), birthday['month'](), birthday['day']())) {
		alert(messages.REFUSAL_MINORS_JOIN);
		navigateTo('/');
	}
	if (verifiedData.value.userNm) {
		isVerified.value = true;
	}
});

const debounceJoinCompanies = debounce(
	async newValue => {
		if (newValue) {
			const res = await joinCompanies(newValue);
			if (res.status === 200) {
				companiesData.value = res.data.list;
			}
		} else {
			companiesData.value = [];
		}
	},
	300,
	false,
);
watch(() => userData.value.comNm, debounceJoinCompanies);

// lifecycle
onBeforeMount(async () => {
	try {
		const res = await joinCompanies();
		if (res.status === 200) {
			companiesData.value = res.data.list;
		}
	} catch (err) {
		console.error(err);
	}
});

onBeforeUnmount(() => {
	broadcastVerification.close();
});

// methods
async function checkId() {
	const { userId } = userData.value;
	if (userId.length < 4) {
		alert(messages.ID_LEAST_CHAR);
		refInputUserId.value.input.focus();
		return;
	}
	const res = await joinCheckId({
		userId,
	});
	if (res.status === 200) {
		alert(messages.ID_ALREADY_USE);
		refInputUserId.value.input.focus();
	}
	if (res.status === 204) {
		alert(messages.ID_AVAILABLE);
		validatedData.value.userId = userId;
		refInputPwdNo.value.input.focus();
	}
}

async function checkEmail() {
	const { mailAddr } = userData.value;
	if (!mailAddr) {
		alert(`이메일${messages.NOT_ENTERED_REQUIRED}`);
		return;
	}
	if (!emailRegex.test(mailAddr)) {
		alert(messages.EMAIL_INCORRECT_FORMAT);
		refInputEmail.value.input.focus();
		return;
	}
	try {
		// 임직원 check
		const checkEmp = await joinCheckEmp({
			emailAddress: mailAddr,
		});
		if (checkEmp.status === 204) {
			isEmployee.value = false;
			const checkEmail = await joinCheckEmail({
				mailAddr,
			});
			if (checkEmail.status === 200) {
				alert(messages.EMAIL_ALREADY_USE);
				refInputEmail.value.input.focus();
				return;
			}
			if (checkEmail.status === 204) {
				alert(messages.EMAIL_AVAILABLE);
				validatedData.value.mailAddr = mailAddr;
				refJoinAgree.value.allCheck.focus();
				return;
			}
			return;
		}
		if (checkEmp.status === 302) {
			alert(messages.EMAIL_ALREADY_USE);
			return;
		}
		const { emp, hrDeptCd, hrDeptNm } = checkEmp.data;
		if (emp !== verifiedData.value.userNm) {
			alert(messages.EMAIL_MISMATCH_VERIFICATION);
			return;
		}
		userData.value.deptNm = hrDeptNm;
		userData.value.deptCd = hrDeptCd;
		validatedData.value.mailAddr = mailAddr;
		isEmployee.value = true;
		refJoinAgree.value.allCheck.focus();
	} catch (err) {
		console.error(err);
	}
}

const firstFlag = ref(true);
async function join() {
	// id validation
	if (!userData.value.userId) {
		alert(`아이디${messages.NOT_ENTERED_REQUIRED}`);
		return;
	}
	if (userData.value.userId.length < 4) {
		alert(messages.ID_LEAST_CHAR);
		refInputUserId.value.input.focus();
		return;
	}
	if (!checkData.value.userId) {
		alert(messages.CHECK_DUPLICATE_ID);
		return;
	}
	if (regExp['id'].test(userData.value.userId)) {
		alert(messages.VALIDATE_INPUT);
		return;
	}
	// password validation
	if (!userData.value.pwdNo) {
		alert(`비밀번호${messages.NOT_ENTERED_REQUIRED}`);
		return;
	}
	if (!checkPwdNo.value) {
		alert(`비밀번호 확인${messages.NOT_ENTERED_REQUIRED}`);
		return;
	}
	if (!passwordCharactersValidate(userData.value.pwdNo)) {
		alert(messages.PASSWORD_LEAST_CHAR);
		refInputPwdNo.value.input.focus();
		return;
	}
	if (!passwordVerifyValidate(userData.value.pwdNo, checkPwdNo.value)) {
		alert(messages.PASSWORD_MISMATCH);
		refInputPwdNoVerify.value.input.focus();
		return;
	}
	if (
		!passwordSameIdCharValidate(userData.value.pwdNo, userData.value.userId)
	) {
		alert(messages.PASSWORD_SAME_ID);
		refInputPwdNo.value.input.focus();
		return;
	}
	if (!passwordRepeatValidate(userData.value.pwdNo)) {
		alert(messages.PASSWORD_CONTINUOUS_CHAR);
		refInputPwdNo.value.input.focus();
		return;
	}
	// email validation
	if (!userData.value.mailAddr) {
		alert(`이메일${messages.NOT_ENTERED_REQUIRED}`);
		return;
	}
	if (!emailRegex.test(userData.value.mailAddr)) {
		alert(messages.EMAIL_INCORRECT_FORMAT);
		refInputEmail.value.input.focus();
		return;
	}
	if (!checkData.value.mailAddr) {
		alert(messages.CHECK_DUPLICATE_EMAIL);
		return;
	}
	if (regExp['email'].test(userData.value.mailAddr)) {
		alert(messages.VALIDATE_INPUT);
		return;
	}
	// company
	if (!isEmployee.value && !userData.value.comNm) {
		alert(`회사명${messages.NOT_ENTERED_REQUIRED}`);
		return;
	}
	// agree
	if (!agrees.value.includes('1')) {
		alert(messages.DISAGREE_TERMS_OF_USE);
		return;
	}
	if (!agrees.value.includes('2')) {
		alert(messages.DISAGREE_PRIVACY_POLICY);
		return;
	}
	if (firstFlag.value && !agrees.value.includes('3')) {
		if (confirm(messages.DISAGREE_MARKETING)) {
			refJoinAgree.value.agrees.push('3');
			refJoinAgree.value.changeAgrees();
		}
		firstFlag.value = false;
		return;
	}
	// 마케팅동의 확인
	userData.value.adAgreeYn = agrees.value.includes('3') ? 'Y' : 'N';

	const reqParams = {
		...verifiedData.value,
		userId: userData.value.userId,
		pwdNo: userData.value.pwdNo,
		comGrCd: '',
		mailAddr: userData.value.mailAddr,
		adAgreeYn: userData.value.adAgreeYn,
	};
	if (isEmployee.value) {
		reqParams.comGrCd = 'COG01';
		reqParams.deptCd = userData.value.deptCd;
		reqParams.deptNm = userData.value.deptNm;
	} else {
		// 등록업종, 미등록업종
		const [checkRegistCompany] = companiesData.value.filter(
			item => item.comNm === userData.value.comNm,
		);
		reqParams.comGrCd = '';
		reqParams.comCd = '';
		if (checkRegistCompany) {
			reqParams.comGrCd = checkRegistCompany.comGrCd;
			reqParams.comCd = checkRegistCompany.comCd;
		} else if (!checkRegistCompany) {
			reqParams.comGrCd = 'COG05';
		}
		reqParams.comNm = userData.value.comNm;
		reqParams.cmrclCustNm = userData.value.cmrclCustNm;
	}

	try {
		const res = joinRegist(reqParams);
		if (res) {
			const { year, month, day } = getDate();
			const agree = agrees.value.includes('3') ? '동의' : '거부';
			alert(
				`회원가입이 완료되었습니다.\n이제 CJ ENM의 다양한 콘텐츠와\n세일즈 가이드 정보를 확인하실 수 있습니다.\n\n(마케팅 및 광고성 정보 제공 ${agree} : ${year}년 ${month}월 ${day}일)`,
			);
			navigateTo('/');
		}
	} catch (err) {
		console.error(err);
	}
}
</script>

<template>
	<div class="join_wrapper">
		<h3>회원가입</h3>
		<div class="identity">
			<h4>본인인증</h4>
			<div class="sub">
				IMFFECT C 회원가입은 본인인증 후 가입하실 수 있습니다.<br />
				본인 명의의 휴대전화번호로 인증하실 수 있습니다. (본인 주민등록번호로
				가입된 휴대전화번호)
			</div>
			<button
				class="button_blue"
				:disabled="isVerified"
				@click="debounceOpenPopupVerification"
			>
				{{
					isVerified ? '휴대폰 본인인증이 완료되었습니다.' : '휴대폰 본인인증'
				}}
			</button>
		</div>
		<template v-if="isVerified">
			<div class="form_wrap join_wrap">
				<div class="input_box">
					<p>이름</p>
					<CommonInput :modelValue="verifiedData.userNm" isDisabled>
					</CommonInput>
				</div>
				<div class="input_box">
					<p>휴대전화번호</p>
					<CommonInput :modelValue="verifiedData.telNo" isDisabled>
					</CommonInput>
				</div>
				<div class="input_box">
					<p>생년월일</p>
					<CommonInput :modelValue="verifiedData.birthDay" isDisabled>
					</CommonInput>
				</div>
				<div class="input_box">
					<p>아이디<span class="require">*</span></p>
					<CommonInput
						ref="refInputUserId"
						v-model="userData.userId"
						:maxlength="20"
						hasBtn
						useMessage
						placeholder="영문 기준 20자 이내로 입력해 주세요."
						buttonText="중복확인"
						inputValidateType="id"
						@onClickBtn="checkId"
						@keyupEnter="checkId"
					>
					</CommonInput>
				</div>
				<div class="input_box">
					<p>비밀번호<span class="require">*</span></p>
					<CommonInput
						ref="refInputPwdNo"
						v-model="userData.pwdNo"
						useMessage
						type="password"
						inputValidateType="password"
						:placeholder="'영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요.'"
					>
						<template #message>
							<li>
								* 영문, 숫자, 특수문자가 포함된 8자리 이상의 비밀번호를 입력해
								주세요.
							</li>
							<li>* 4자리 이상 연속 또는 반복 문자/숫자는 사용 불가합니다.</li>
							<li>* 아이디와 4자리 이상 동일한 비밀번호는 사용 불가합니다.</li>
						</template>
					</CommonInput>
				</div>

				<div class="input_box">
					<p>비밀번호 확인<span class="require">*</span></p>
					<CommonInput
						ref="refInputPwdNoVerify"
						v-model="checkPwdNo"
						type="password"
						inputValidateType="password"
						:placeholder="'비밀번호를 다시 한번 입력해 주세요.'"
					>
					</CommonInput>
				</div>
				<div class="input_box">
					<p>이메일주소<span class="require">*</span></p>
					<CommonInput
						ref="refInputEmail"
						v-model="userData.mailAddr"
						hasBtn
						useMessage
						placeholder="이메일주소를 입력해 주세요."
						inputValidateType="email"
						buttonText="중복확인"
						@onClickBtn="checkEmail(userData, refInputEmail, refJoinAgree)"
						@keyupEnter="checkEmail(userData, refInputEmail, refJoinAgree)"
					>
						<template #message>
							<li>
								CJ ENM 엔터테인먼트 부문 임직원일 경우 cj.net 이메일 계정을
								입력해 주세요.
							</li>
						</template>
					</CommonInput>
				</div>
				<template v-if="validatedData.mailAddr">
					<CommonInputCompanies
						v-if="!isEmployee"
						v-model="userData.comNm"
						:options="companyData"
					/>
					<div v-if="!isEmployee" class="input_box">
						<p>직무</p>
						<CommonInput
							v-model="userData.cmrclCustNm"
							:maxlength="20"
							placeholder="직무를 입력해 주세요."
						>
						</CommonInput>
					</div>
					<div v-if="isEmployee" class="input_box">
						<p>소속</p>
						<CommonInput v-model="userData.deptNm" isDisabled> </CommonInput>
					</div>
				</template>
				<JoinAgree
					ref="refJoinAgree"
					@changeAgrees="newValue => (agrees = newValue)"
				/>
				<div class="btn_wrap">
					<button class="button_line" @click="$router.back()">취소</button>
					<button class="button_default_color" @click="join">
						회원가입 하기
					</button>
				</div>
			</div>
		</template>
	</div>
</template>
