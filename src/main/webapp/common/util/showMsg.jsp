<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="" %>
<%@ page import="common.*" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<%
    String msg = (String)request.getAttribute("resultMessage");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta charset="utf-8" />
        <title>페이지 오류 : <%=Config.strSiteName%></title>
    </head>
    <body>
        오류가 발생 되었습니다.<br/>
        <%=msg%>
    </body>
</html>