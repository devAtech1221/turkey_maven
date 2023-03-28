<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.

%>

<div class="button-wrap btn-modal-submit" style="display: flex; justify-content: space-between; margin: 0 35px; margin-top: 2em;">
	<button
			data-msg_src="btn.close"
			class="btn close"
			style="background-color: #555;"
	></button>
</div>