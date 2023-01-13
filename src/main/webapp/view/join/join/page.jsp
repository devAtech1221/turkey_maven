<%@ page import="common.message.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<%
	MessageHandler mh = MessageHandler.getInstance();
	Locale locale = request.getLocale();
	mh.setLocale(locale);
%>
<link href="/common/css/join.css" rel="stylesheet">

<div class="join-contents">
	<div class="container">
		<h2><%=mh.code("top.join")%></h2>
		<div class="join_wrap">
			<form class="form-box" onSubmit={handleSubmit(onSubmit,errorHandle)}>
				<div class="input-box text">
					<div class="input_group">
						<label for="userId" class="title required"><%=mh.code("form.id")%></label>
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
							><%=mh.code("btn.join.check.dupl.id")%>
							</button>
						</div>
						<div class="error-box" data-key="user_id">
							<div class="error-msg"></div>
						</div>
					</div>

					<div class="input_group">
						<label for="userPass" class="title required"><%=mh.code("form.pass")%></label>
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
						<label for="userPass2" class="title required"><%=mh.code("form.pass2")%></label>
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
						<label for="belong" class="title required"><%=mh.code("form.belong")%></label>
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
						<label for="name" class="title required"><%=mh.code("form.name")%></label>
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
						<label for="position" class="title required"><%=mh.code("form.position")%></label>
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
						<label for="tel" class="title required"><%=mh.code("form.tel")%></label>
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
						<label for="email" class="title required"><%=mh.code("form.email")%></label>
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
								<%=mh.code("btn.join.send.authcode")%>
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
							placeholder="<%=mh.code("join.placeholder.authCode")%>"
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
							<%=mh.code("btn.join.check.authcode")%>
						</button>
					</div>

					<div class="agree">
						<input type="checkbox" id="agree" name="agree" style="font-size: .875em;"/>
						<label for="agree"><%=mh.code("form.agree")%><sapn class="required-agree"><%=mh.code("form.agree.required")%></sapn></label>
					</div>
					<div class="error-box" data-key="agree">
						<div class="error-msg"></div>
					</div>

					<div class="btn-submit">
						<button class="btn" type="button"><%=mh.code("top.join")%></button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<script src="/view/join/join/js/join.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp" />
