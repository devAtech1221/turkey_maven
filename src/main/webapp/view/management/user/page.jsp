<%@ page import="common.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<%
    MessageHandler mh = MessageHandler.getInstance();
%>

<link href="/common/css/user.css" rel="stylesheet">

<div id="route-contents">
    <div class="container">
        <h2><%=mh.code("management.user.page.title")%></h2>
        <div class="management-contents">

            <div class="table_area"></div>
        </div>
    </div>
</div>

<div class="area_modal"></div>

<script src="/view/management/user/js/user.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp"/>
