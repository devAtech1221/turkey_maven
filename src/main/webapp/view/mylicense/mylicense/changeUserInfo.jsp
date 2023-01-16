<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.

%>

<form class="form-box user-info-form">
	<div class="input-box text">
		<div class="input_group">
			<label data-msg_src="form.belong" class="title required"></label>
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
			<label data-msg_src="form.name" class="title required"></label>
			<input
				class="form_control"
				id="name"
				type="text"
				name="name"
			/>
			<div class="error-box" data-key="name">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label data-msg_src="form.position" class="title required"></label>
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
			<label data-msg_src="form.tel" class="title required"></label>
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
	</div>
</form>