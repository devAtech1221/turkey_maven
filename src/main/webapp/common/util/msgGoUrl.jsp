<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="" %>
<%@ page import="common.*" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta charset="utf-8" />
    <title>오류 안내 : <%=Config.strSiteName%></title>
    <script type="text/javascript">
        alert('<%=request.getAttribute("message")%>');
        location.href='<%=request.getAttribute("url")%>';
    </script>
</head>
<body>
페이지 이동중 .
<body>
</html>