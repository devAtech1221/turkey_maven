<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.

%>

<ul class="edit-form-menu">
	<li data-msg_src="mylicense.modal.menu1" data-menu='info'></li>
	<li data-msg_src="mylicense.modal.menu2" data-menu='pass'></li>
</ul>