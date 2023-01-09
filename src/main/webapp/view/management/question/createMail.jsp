<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<form class="create-form">
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
				placeholder="기본 : 안녕하세요 에이테크입니다."
			/>
		</div>
		<div class="input">
			<label class="required">내용</label>
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