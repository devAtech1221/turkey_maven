<%@ page import="common.message.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<%
	MessageHandler mh = MessageHandler.getInstance();
	Locale locale = request.getLocale();
	mh.setLocale(locale);
%>
<link href="/common/css/login.css" rel="stylesheet">

<div class="login-contents">
	<div class="login_wrap">
		<form class="">
			<div class="logo" style="text-align: center;">
				<img src="/common/images/logo.png"/>
			</div>
			<div class="login-input">
				<div class="input_group">
					<label for="idInput"><%=mh.code("form.id")%></label>
					<input
						class="form_control"
						id="idInput"
						type="text"
						name="user_id"
					/>
				</div>
				<div class="input_group">
					<label for="PassInput"><%=mh.code("form.pass")%></label>
					<input
						class="form_control"
						id="PassInput"
						type="password"
						name="user_pass"
					/>
				</div>
				<div class="btn-submit">
					<button class="btn" type="button"><%=mh.code("top.login")%></button>
				</div>
			</div>
		</form>

		<div class="snsLoginArea">
			<p><span><%=mh.code("login.sns.title")%></span></p>
			<ul>
				<li><button class="btn" style="background:#00c73c; border: 1px solid #00c73c; color: #fff;">
					<img class="ico" src="/common/images/ico_naver.png"/>
					<%=mh.code("login.sns.naver")%>
					</button></li>
				<li><button class="btn" style="background: #fff; border: 1px solid #dadce0;">
					<img class="ico" src="/common/images/ico_google.png"/>
					<%=mh.code("login.sns.google")%>
					</button></li>
				<li><button class="btn" style="background:#fef124; border: 1px solid #fef124; color: #3e2723;">
					<img class="ico" src="/common/images/ico_kakao.png"/>
					<%=mh.code("login.sns.kakao")%>
					</button></li>
			</ul>

		</div>
	</div>
</div>

<script src="/view/login/login/js/login.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp" />
