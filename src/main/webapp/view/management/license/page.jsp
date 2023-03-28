<%@ page import="common.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<%
    MessageHandler mh = MessageHandler.getInstance();
%>
<link href="/common/css/management.css" rel="stylesheet">

<div id="route-contents">
    <div class="container">
        <h2><%=mh.code("management.license.page.title")%></h2>
        <div class="management-contents">
            <ul class="status-option">
                <li data-value='ALL'><%=mh.code("grid.ALL")%></li>
                <li data-value='NEW'><%=mh.code("grid.NEW")%></li>
                <li data-value='APPROVAL'><%=mh.code("grid.APPROVAL")%></li>
                <li data-value='EXPIRATION'><%=mh.code("grid.EXPIRATION")%></li>
            </ul>

            <div class="table_area"></div>
        </div>
    </div>
</div>

<div class="area_modal"></div>

<script src="/view/management/license/js/license.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp"/>
