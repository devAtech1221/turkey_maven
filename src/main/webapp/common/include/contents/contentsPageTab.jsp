<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<li class="active" name="DOMESTIC" data-value="0"><a href="#">국내</a></li>
<li name="OVERSEAS" data-value="1"><a href="#">해외</a></li>