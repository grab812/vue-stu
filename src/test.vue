<template>
	<div class="agree_wrap">
		<h4>약관 동의</h4>
		<div class="line"></div>
		<div class="check_box">
			<label class="checkbox_wrap">
				전체 동의
				<input
					ref="allCheck"
					v-model="allAgree"
					type="checkbox"
					@change="changeAllAgree"
				/>
				<span class="checkmark"></span>
			</label>
		</div>
		<div class="agree_wrapper" :class="{ show: showJoinAgreeWrap[0] }">
			<div class="tlt">
				<label class="checkbox_wrap">
					이용약관 동의<span class="require">(필수)</span>
					<input
						v-model="agrees"
						value="1"
						type="checkbox"
						@change="changeAgrees"
					/>
					<span class="checkmark"></span>
				</label>
				<i class="toggle" @click="debounceToggleJoinAgreeWrap(0)"></i>
			</div>
			<div
				ref="refUseContent"
				class="agree_content"
				:class="{ show: showJoinAgreeWrap[0] }"
			>
				<div class="terms_contents">
					<h2>제1장 총칙</h2>
					<h3>제1조 (목적)</h3>
					<ol>
						<li>
							본 약관은 주식회사 씨제이이엔엠(이하 "회사"라 한다)이 IMFFECT C의
							광고주 서비스 (이하”IMFFECT C”라 한다)을 통해 제공하는 모든 인터넷
							정보 서비스(이하 "서비스"라 한다)를 이용함에 있어서 회사와
							정보이용자 간의 권리, 의무 및 책임사항을 규정함으로써 이용자의
							권익 보호를 목적으로 합니다.
						</li>
					</ol>
					<p></p>
				</div>
			</div>
		</div>
		<div class="agree_wrapper" :class="{ show: showJoinAgreeWrap[1] }">
			<div class="tlt">
				<label class="checkbox_wrap">
					개인정보처리방침
					<span class="require">(필수)</span>
					<input
						v-model="agrees"
						value="2"
						type="checkbox"
						@change="changeAgrees"
					/>
					<span class="checkmark"></span>
				</label>
				<i class="toggle" @click="debounceToggleJoinAgreeWrap(1)"></i>
			</div>
			<div
				ref="refPrivacyContent"
				class="agree_content"
				:class="{ show: showJoinAgreeWrap[1] }"
			>
				<div class="terms_contents">
					<ol>
						<li>
							IMFFECT C 서비스 (이하 “서비스”) 운영사인 주식회사 씨제이이엔엠
							엔터테인먼트부문(이하 “회사”)은 이용자(회원 및 비회원 포함)의
							개인정보를 적극적으로 보호하며 개인정보 보호법 등 관계 법령을
							준수하기 위하여 개인정보처리방침(이하 “개인정보처리방침")을
							제정하고 이를 준수하고 있습니다. 또한 아래에 게시된 개인정보 보호
							정책을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로
							이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가 취해지고
							있는지 알려드립니다.<br />본 개인정보처리방침은 회사가 운영하는
							서비스에 공개되며, 이용자가 언제나 쉽게 찾아볼 수 있도록 하고
							있습니다. 회사의 개인정보처리방침은 다음의 내용을 포함합니다.
						</li>
					</ol>
					<h2 id="terms1">1. 개인정보의 수집/이용 등에 대한 동의 방법</h2>
					<ol>
						<li>
							이용자의 개인정보 수집, 이용, 제3자 제공 및 처리 업무의 위탁 등에
							대한 동의의 방법은 서비스 회원가입 시 게시된 ‘서비스 이용약관’ 및
							'개인정보처리방침'을 숙지하신 후 서비스에서 제공하는 ‘동의 버튼’을
							클릭함으로써 완료됩니다.
						</li>
					</ol>
				</div>
			</div>
		</div>
		<div class="agree_wrapper" :class="{ show: showJoinAgreeWrap[2] }">
			<div class="tlt">
				<label class="checkbox_wrap"
					>마케팅 및 광고성 정보 제공 동의
					<input
						v-model="agrees"
						value="3"
						type="checkbox"
						@change="changeAgrees"
					/>
					<span class="checkmark"></span>
				</label>
				<i class="toggle" @click="debounceToggleJoinAgreeWrap(2)"></i>
			</div>
			<div
				ref="refAdagreeContent"
				class="agree_content"
				:class="{ show: showJoinAgreeWrap[2] }"
			>
				<div class="terms_contents">
					<h3>수집/이용 목적</h3>
					<ol>
						<li>
							이메일을 통한 광고 상품 소개, 행사/각종 이벤트 정보 안내 및 제반
							마케팅 활동, 당사 상품/서비스 안내 및 권유
						</li>
					</ol>
					<h3>수집항목</h3>
					<ol>
						<li>이름, 생년월일, 이동전화번호, 이메일, 법인명</li>
					</ol>
					<h3>보유기간</h3>
					<ol>
						<li>
							회원 탈퇴 후 7일까지 또는 정보주체의 개인정보수집/이용 동의 철회
							요청 즉시 삭제
						</li>
					</ol>
					<p class="notice">
						※ 정보주체는 동의를 거부할 권리가 있습니다. 동의 거부 시 서비스 이용
						제한은 발생하지 않습니다.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
