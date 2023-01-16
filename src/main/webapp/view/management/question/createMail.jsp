<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.

%>

<form class="create-form">
	<div class="form-header">
		<div data-msg_src="management.question.createMail.title" class="form-title"></div>
	</div>
	<div class="form-main">
		<div class="input">
			<label data-msg_src="form.title"></label>
			<input
				class="form_control"
				type="text"
				name="mail_title"
				autoComplete="off"
				data-placeholder="mail.default.title"
			/>
		</div>
		<div class="input">
			<label data-msg_src="form.contents" class="required"></label>
			<textarea
				class="form_control"
				type="text"
				name="message"
			/>
		</div>
		<div class="input file">
			<label data-msg_src="orm.file"></label>
			<input
				class="form_control"
				type="file"
				multiple
				name="attach_file_list"
			/>
		</div>
	</div>
</form>