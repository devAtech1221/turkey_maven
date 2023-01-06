<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="common.Config" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<%
  response.sendRedirect(Config.appName+"/main/Main.do");
  /* response.sendRedirect(Config.appName+"/sales/Specification.do"); */
%>