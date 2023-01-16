<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<form class="form-box form-box2">
	<div class="input-box">
		<ol class="type_info">
			<li style="padding-right: 1em;">
				<h5 style="font-size: 1.25em;margin-bottom: 1em;"></h5>

				<div>
					<h6 data-msg_src="main.contentsModal.type.title" style="font-size: 1em;"></h6>

					<dl class="type_list">
						<dd data-msg_src="main.trial.name">
							<input
								type="radio"
								name="license_type"
								data-name="main.trial.name"
								value='trial'
							/></dd>
						<dd data-msg_src="main.basic.name">
							<input
								type="radio"
								name="license_type"
								data-name="main.basic.name"
								value="basic"
							/></dd>
						<dd data-msg_src="main.premium.name">
							<input
								type="radio"
								name="license_type"
								data-name="main.premium.name"
								value="premium"
							/></dd>
						<dd data-msg_src="main.custom.name">
							<input
								type="radio"
								name="license_type"
								data-name="main.custom.name"
								value="custom"
							/></dd>
					</dl>
				</div>
			</li>

			<li style="padding-left: 1em;">
				<div class="cost_info" style="background: #f5f7f9; padding: 1em; border: 0; border-radius: .5em;">
					<div style="display:flex; justify-content: space-between;">
						<span data-msg_src="main.contentsModal.cost.title" style="margin-top: .25em;"></span>
						<dl></dl>
					</div>
				</div>
				<span data-msg_src="main.contentsModal.cost.warning" style="margin-top: .25em; font-size: .875em; color: #888; font-weightt: 400; text-align: right; display: block;"></span>
			</li>
		</ol>
	</div>

	<div class="input_group">
		<label data-msg_src="form.title" for="title" class="title required"></label>
		<input
			class="form_control"
			id="title"
			type="text"
			name="title"
		/>
		<div class="error-box" data-key="title">
			<div class="error-msg"></div>
		</div>
	</div>

	<div class="input_group">
		<label data-msg_src="form.contents" for="contents" class="title required"></label>
		<textarea
			class="form_control"
			id="contents"
			type="text"
			name="contents"
		/>
		<div class="error-box" data-key="contents">
			<div class="error-msg"></div>
		</div>
	</div>

	<div class="agree">
		<input
			id="agree"
			type="checkbox"
			name="agree"
			value="on"
		/>
		<label data-msg_src="form.agree" for="agree"><sapn data-msg_src="form.agree.required" class="required-agree"></sapn></label>
	</div>
	<div class="error-box" data-key="agree">
		<div class="error-msg"></div>
	</div>
</form>