<%@ page  contentType="text/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.*" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<%@ page import="java.util.*, com.google.gson.*" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<%
    HashMap<String, Object> resultMap = (HashMap)request.getAttribute("resultMap");
    /* MyUtil myutil = new MyUtil(); */
    Gson objGson = new GsonBuilder().setPrettyPrinting().create();
    out.println(objGson.toJson(resultMap));
%>