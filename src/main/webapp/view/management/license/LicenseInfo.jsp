<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.

%>

<form class="info-form">
	<div class="form-header">
		<div data-msg_src="management.license.createLicense.title" class="form-title"></div>
	</div>
	<div class="form-main">
		<div class="input">
			<label data-msg_src="form.id" class="essential"></label>
			<input
				class="form_control"
				type="text"
				name="site_id"
				autoComplete="off"
				disabled
			/>
		</div>
		<div class="input">
			<label data-msg_src="form.pass" class="essential"></label>
			<input
				class="form_control"
				type="text"
				name="site_pass"
				autoComplete="off"
				disabled
			/>
		</div>
		<div class="input">
			<label data-msg_src="form.url" class="essential"></label>
			<input
				class="form_control"
				type="text"
				name="site_url"
				autoComplete="off"
				disabled
			/>
		</div>
		<div class="input">
			<label data-msg_src="form.start.date" class="essential"></label>
			<input
					class="form_control"
					type="text"
					name="start_date"
					autoComplete="off"
					disabled
			/>
		</div>
		<div class="input">
			<label data-msg_src="form.end.date" class="essential"></label>
			<input
					class="form_control"
					type="text"
					name="end_date"
					autoComplete="off"
					disabled
			/>
		</div>
	</div>
</form>