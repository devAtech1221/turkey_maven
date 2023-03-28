<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<div class="button-wrap btn-modal-submit" style="display: flex; justify-content: space-between; margin: 0 35px; margin-top: 2em;">
	<button
			data-msg_src="btn.give.license"
			class="btn license-submit"
			style="background-color: var(--main-bg-color);"
	></button>
	<button
			data-msg_src="btn.delete"
			class="btn delete"
			style="background-color: #cb2d2d;"
	></button>
	<button
			data-msg_src="btn.close"
			class="btn close"
			style="background-color: #555;"
	></button>
	<button
			data-msg_src="btn.expiration"
			class="btn expiration"
			style="background-color: #949d29;"
	></button>
</div>