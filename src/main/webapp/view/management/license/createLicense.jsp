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

<form class="create-form">
	<div class="form-header">
		<div class="form-title"><%=mh.code("management.license.createLicense.title")%></div>
	</div>
	<div class="form-main">
		<div class="input">
			<label class="essential required"><%=mh.code("form.id")%></label>
			<input
				class="form_control"
				type="text"
				name="site_id"
				autoComplete="off"
			/>
		</div>
		<div class="input">
			<label class="essential required"><%=mh.code("form.pass")%></label>
			<input
				class="form_control"
				type="text"
				name="site_pass"
				autoComplete="off"
			/>
		</div>
		<div class="input">
			<label class="essential required"><%=mh.code("form.url")%></label>
			<input
				class="form_control"
				type="text"
				name="site_url"
				autoComplete="off"
			/>
		</div>
	</div>

	<div class="form-header">
		<div class="form-title"><%=mh.code("form.email")%></div>
	</div>
	<div class="form-main">
		<div class="input">
			<label><%=mh.code("form.title")%></label>
			<input
				class="form_control"
				type="text"
				name="mail_title"
				autoComplete="off"
				placeholder="<%=mh.code("mail.default.title")%>"
			/>
		</div>
		<div class="input">
			<label><%=mh.code("form.contents")%></label>
			<textarea
				class="form_control"
				type="text"
				name="message"
				placeholder="<%=mh.code("mail.default.message")%>"
			/>
		</div>
		<div class="input file">
			<label><%=mh.code("form.file")%></label>
			<input
				class="form_control"
				type="file"
				multiple
				name="attach_file_list"
			/>
		</div>
	</div>
</form>