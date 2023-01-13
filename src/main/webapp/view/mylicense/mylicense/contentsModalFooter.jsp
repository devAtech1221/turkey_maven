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

<div class="button-wrap btn-modal-submit" style="display: flex; justify-content: space-between; margin: 0 25px; margin-top: 2em;">
	<button
			class="btn info-submit"
			style="background-color: var(--main-bg-color);"
	><%=mh.code("btn.change")%></button>
	<button
			class="btn close"
			style="background-color: #555;"
	><%=mh.code("btn.cancel")%></button>
</div>