<%@ page import="common.message.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
	MessageHandler mh = MessageHandler.getInstance();
	Locale locale = request.getLocale();
	mh.setLocale(locale);
%>

<form class="form-box form-box2">
	<div class="input-box">
		<ol class="type_info">
			<li style="padding-right: 1em;">
				<h5 style="font-size: 1.5em;margin-bottom: 1em;"></h5>

				<div>
					<h6 style="font-size: 1.125em;"><%=mh.code("main.contentsModal.type.title")%></h6>

					<dl class="type_list">
						<dd>
							<input
								type="radio"
								name="license_type"
								data-name="<%=mh.code("main.trial.name")%>"
								value='trial'
							/> <%=mh.code("main.trial.name")%></dd>
						<dd>
							<input
								type="radio"
								name="license_type"
								data-name="<%=mh.code("main.basic.name")%>"
								value="basic"
							/> <%=mh.code("main.basic.name")%></dd>
						<dd>
							<input
								type="radio"
								name="license_type"
								data-name="<%=mh.code("main.premium.name")%>"
								value="premium"
							/> <%=mh.code("main.premium.name")%></dd>
						<dd>
							<input
								type="radio"
								name="license_type"
								data-name="<%=mh.code("main.custom.name")%>"
								value="custom"
							/> <%=mh.code("main.custom.name")%></dd>
					</dl>
				</div>
			</li>

			<li style="padding-right: 1em;">
				<div class="cost_info" style="background: #f5f7f9; padding: 1em; border: 0; border-radius: .5em;">
					<div style="display:flex; justify-content: space-between;">
						<span style="margin-top: .25em;"><%=mh.code("main.contentsModal.cost.title")%></span>
						<dl></dl>
					</div>
				</div>
				<span style="margin-top: .25em; font-size: .875em; color: #888; font-weightt: 400; text-align: right; display: block;"><%=mh.code("main.contentsModal.cost.warning")%></span>
			</li>
		</ol>
	</div>

	<div class="input_group">
		<label for="title" class="title required"><%=mh.code("form.title")%></label>
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
		<label for="contents" class="title required"><%=mh.code("form.contents")%></label>
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
		<label for="agree"><%=mh.code("form.agree")%><sapn class="required-agree"><%=mh.code("form.agree.required")%></sapn></label>
	</div>
	<div class="error-box" data-key="agree">
		<div class="error-msg"></div>
	</div>
</form>