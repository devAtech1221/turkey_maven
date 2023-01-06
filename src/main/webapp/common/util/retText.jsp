<%@ page  contentType="text/text; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.*" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<%
    String resultText = (String)request.getAttribute("resultText");
    MyUtil myutil = new MyUtil();
    out.println(myutil.null2Blank(resultText));
%>