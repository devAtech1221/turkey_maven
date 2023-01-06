<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<div class="button-wrap btn-modal-submit" style="display: flex; justify-content: space-between; margin: 0 35px; margin-top: 2em;">
	<button
			class="btn mail-submit"
			style="background-color: var(--main-bg-color);"
	>메일전송</button>
	<button
			class="btn close"
			style="background-color: #555;"
	>닫기</button>
</div>