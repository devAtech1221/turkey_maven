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

<ul class="edit-form-menu">
	<li data-menu='info'><%=mh.code("mylicense.modal.menu1")%></li>
	<li data-menu='pass'><%=mh.code("mylicense.modal.menu2")%></li>
</ul>