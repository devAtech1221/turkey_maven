<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.

%>

<form class="form-box form-box2">
	<div class="input-box text input_flex">
		<div class="input_group">
			<label data-msg_src="form.id" for="user_id" class="title"></label>
			<input
					class="form_control"
					id="user_id"
					type="text"
					name="user_id"
					disabled
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label data-msg_src="form.belong" for="belong" class="title"></label>
			<input
					class="form_control"
					id="belong"
					type="text"
					name="belong"
					disabled
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label data-msg_src="form.name" for="name" class="title"></label>
			<input
					class="form_control"
					id="name"
					type="text"
					name="name"
					disabled
			/>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label data-msg_src="form.position" for="position" class="title"></label>
			<input
					class="form_control"
					id="position"
					type="text"
					name="position"
					disabled
			/>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label data-msg_src="form.tel" for="tel" class="title"></label>
			<input
					class="form_control"
					id="tel"
					type="text"
					name="tel"
					disabled
			/>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label data-msg_src="form.email" for="email" class="title"></label>
			<input
					class="form_control"
					id="email"
					type="email"
					name="email"
					disabled
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>
	</div>
</form>

