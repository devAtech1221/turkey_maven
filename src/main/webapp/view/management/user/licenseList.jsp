<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.

%>

<div class="license_list" style="">
	<div class="header" data-msg_src="user.licenseList.title"></div>

	<table class="my-license-table" style="">
		<thead>
		<tr>
			<th data-msg_src="mylicense.page.tr1"></th>
			<th data-msg_src="mylicense.page.tr2"></th>
			<th data-msg_src="mylicense.page.tr3"></th>
			<th data-msg_src="mylicense.page.tr4"></th>
			<th data-msg_src="mylicense.page.tr5"></th>
			<th data-msg_src="mylicense.page.tr6"></th>
		</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>