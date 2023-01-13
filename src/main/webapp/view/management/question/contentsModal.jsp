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
	<div></div>
	<div class="input-box category">
		<div class="title"><%=mh.code("form.question.solution")%></div>

		<div class="inner-input">
			<div class="selected-solution"></div>
		</div>
	</div>

	<div class="input-box text input_flex">
		<div class="input_group">
			<label for="belong" class="title"><%=mh.code("form.belong")%></label>
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
			<label for="name" class="title"><%=mh.code("form.name")%></label>
			<input
					class="form_control"
					id="name"
					type="text"
					name="name"
					disabled
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label for="position" class="title"><%=mh.code("form.position")%></label>
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
			<label for="tel" class="title"><%=mh.code("form.tel")%></label>
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
			<label for="email" class="title"><%=mh.code("form.belong")%></label>
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

		<div class="input_group" style="width: 100%;">
			<label for="title" class="title"><%=mh.code("form.title")%></label>
			<input
					class="form_control"
					id="title"
					type="text"
					name="title"
					disabled=true
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group" style="width: 100%;height: auto">
			<label for="contents" class="title"><%=mh.code("form.contents")%></label>
			<textarea
					class="form_control"
					id="contents"
					type="text"
					name="contents"
					disabled
			></textarea>
			<div class="error-box"></div>
		</div>
	</div>
</form>