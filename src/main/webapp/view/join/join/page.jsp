<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<link href="/common/css/join.css" rel="stylesheet">

<div class="join-contents">
	<div class="container">
		<h2>회원가입</h2>
		<div class="join_wrap">
			<form class="form-box" onSubmit={handleSubmit(onSubmit,errorHandle)}>
				<div class="input-box text">
					<div class="input_group">
						<label for="userId" class="title required">아이디</label>
						<div style="display: flex;">
							<input
								style="flex: 5;margin-right: 8px;border-radius: 4px;"
								class="form_control"
								id="userId"
								type="text"
								name="user_id"
								autoComplete="new-password"
							/>
							<button
								class="dupl_chk"
								style="
								cursor: pointer;flex: 1;background-color: rgba(131, 142, 128, 0.54);border: none;
								border-radius: 4px;padding: 8px;font-size: .875em; font-weight: 700; color: white;margin-left: .5em;"
								type="button"
							>중복 확인
							</button>
						</div>
						<div class="error-box" data-key="user_id">
							<div class="error-msg"></div>
						</div>
					</div>

					<div class="input_group">
						<label for="userPass" class="title required">비밀번호</label>
						<input
							id="userPass"
							class="form_control"
							type="password"
							name="user_pass"
							autoComplete="new-password"
						/>
						<div class="error-box" data-key="user_pass">
							<div class="error-msg"></div>
						</div>
					</div>

					<div class="input_group">
						<label for="userPass2" class="title required">비밀번호 확인</label>
						<input
							class="form_control"
							id="userPass2"
							type="password"
							name="user_pass2"
							autoComplete="new-password"
						/>
						<div class="error-box" data-key="user_pass2">
							<div class="error-msg"></div>
						</div>
					</div>

					<div class="input_group">
						<label for="belong" class="title required">회사명</label>
						<input
							class="form_control"
							id="belong"
							type="text"
							name="belong"
						/>
						<div class="error-box" data-key="belong">
							<div class="error-msg"></div>
						</div>
					</div>

					<div class="input_group">
						<label for="name" class="title required">이름</label>
						<input
							class="form_control"
							id="name"
							type="text"
							name="name"
						>
						<div class="error-box" data-key="name">
							<div class="error-msg"></div>
						</div>
					</div>

					<div class="input_group">
						<label for="position" class="title required">직책</label>
						<input
							class="form_control"
							id="position"
							type="text"
							name="position"
						/>
						<div class="error-box" data-key="position">
							<div class="error-msg"></div>
						</div>
					</div>

					<div class="input_group">
						<label for="tel" class="title required">휴대폰</label>
						<input
							class="form_control"
							id="tel"
							type="text"
							name="tel"
						/>
						<div class="error-box" data-key="tel">
							<div class="error-msg"></div>
						</div>
					</div>

					<div class="input_group">
						<label for="email" class="title required">이메일</label>
						<div style="display: flex;">
							<input
								style="flex: 5;padding: 6px 22px;margin-right: 8px;border-radius: 4px;"
								class="form_control"
								id="email"
								type="email"
								name="email"
							/>
							<button
								class="mail_chk"
								style="
									cursor: pointer;flex: 1;background-color: rgb(240 125 125);border: none;
									border-radius: 4px;padding: 8px;font-size: .875em; font-weight: 700; color: white;margin-left: .5em;"
								type="button"
							>
							메일 전송
							</button>
						</div>
						<div class="error-box" data-key="email">
							<div class="error-msg"></div>
						</div>
					</div>
					<div style="display: flex;margin: 16px 0px;">
						<input
							style="flex: 5;padding: 6px 22px;margin-right: 8px;border-radius: 4px;"
							class="form_control"
							type="text"
							placeholder="인증코드를 입력해주세요."
							maxlength="8"
							name="code"
						/>
						<button
							class="code_chk"
							style="
								cursor: pointer;flex: 1;background-color: rgba(131, 142, 128, 0.54);border: none;
								border-radius: 4px;padding: 8px;font-size: .875em; font-weight: 700; color: white;margin-left: .5em;"
							type="button"
						>
						인증 확인
						</button>
					</div>

					<div class="agree">
						<input type="checkbox" id="agree" name="agree" style="font-size: .875em;"/>
						<label for="agree" class="required-agree">개인정보 수집 및 이용에 동의합니다.</label>
					</div>
					<div class="error-box" data-key="agree">
						<div class="error-msg"></div>
					</div>

					<div class="btn-submit">
						<button class="btn" type="button">회원가입</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<script src="/view/join/join/js/join.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp" />
