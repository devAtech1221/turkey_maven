<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.

%>

<form class="form-box pass user-pass-form" style="display: none">
	<div class="input-box text">
		<div class="input_group">
			<label data-msg_src="form.pass" for="userPass" class="title required"></label>
			<input
				class="form_control"
				id="userPass"
				type="password"
				name="user_pass"
			/>
			<div class="error-box" data-key="user_pass">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label data-msg_src="form.pass2" for="userPass2" class="title required"></label>
			<input
				class="form_control"
				id="userPass2"
				type="password"
				name="user_pass2"
			/>
			<div class="error-box" data-key="user_pass2">
				<div class="error-msg"></div>
			</div>
		</div>
	</div>
</form>