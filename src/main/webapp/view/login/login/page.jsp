<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />

<div class="login-contents">
	<div class="login_wrap">
		<form class="">
			<div class="logo" style="text-align: center;">
				<img src="/common/images/logo.png"/>
			</div>
			<div class="login-input">
				<div class="input_group">
					<label for="idInput">아이디</label>
					<input
						class="form_control"
						id="idInput"
						type="text"
						name="user_id"
					/>
				</div>
				<div class="input_group">
					<label for="PassInput">비밀번호</label>
					<input
						class="form_control"
						id="PassInput"
						type="password"
						name="user_pass"
					/>
				</div>
				<div class="btn-submit">
					<button class="btn" type="button">로그인</button>
				</div>
			</div>
		</form>

		<div class="snsLoginArea">
			<p><span>SNS 로그인</span></p>
			<ul>
				<li><button class="btn" style="background:#00c73c; border: 1px solid #00c73c; color: #fff;">
					<img class="ico" src="/common/images/ico_naver.png"/>
					네이버로 로그인
					</button></li>
				<li><button class="btn" style="background: #fff; border: 1px solid #dadce0;">
					<img class="ico" src="/common/images/ico_google.png"/>
					구글로 로그인
					</button></li>
				<li><button class="btn" style="background:#fef124; border: 1px solid #fef124; color: #3e2723;">
					<img class="ico" src="/common/images/ico_kakao.png"/>
					카카오로 로그인
					</button></li>
			</ul>

		</div>
	</div>
</div>

<link href="/common/css/login.css" rel="stylesheet">
<script src="/view/login/login/js/login.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp" />
