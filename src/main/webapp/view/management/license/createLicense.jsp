<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<form class="create-form">
	<div class="form-header">
		<div class="form-title">솔루션</div>
	</div>
	<div class="form-main">
		<div class="input">
			<label class="essential">아이디</label>
			<input
				class="form_control"
				type="text"
				name="site_id"
				autoComplete="off"
			/>
		</div>
		<div class="input">
			<label class="essential">비밀번호</label>
			<input
				class="form_control"
				type="text"
				name="site_pass"
				autoComplete="off"
			/>
		</div>
		<div class="input">
			<label class="essential">주소</label>
			<input
				class="form_control"
				type="text"
				name="site_url"
				autoComplete="off"
			/>
		</div>
	</div>

	<div class="form-header">
		<div class="form-title">메일</div>
	</div>
	<div class="form-main">
		<div class="input">
			<label>제목</label>
			<input
				class="form_control"
				type="text"
				name="mail_title"
				autoComplete="off"
			/>
		</div>
		<div class="input">
			<label>내용</label>
			<textarea
				class="form_control"
				type="text"
				name="message"
			/>
		</div>
		<div class="input file">
			<label>첨부파일</label>
			<input
				class="form_control"
				type="file"
				multiple
				name="attach_file_list"
			/>
		</div>
	</div>
</form>