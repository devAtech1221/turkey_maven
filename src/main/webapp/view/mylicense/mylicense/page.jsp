<%@ page import="common.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<%
    MessageHandler mh = MessageHandler.getInstance();
%>
<link href="/common/css/my-license.css" rel="stylesheet">

<!-- Content Row -->
<div id="route-contents">
    <div class="container">
        <h2><%=mh.code("mylicense.page.header")%></h2>

        <div class="my-license-contents">
            <div class="user">
                <div class="user-info">
                    <div class="name"></div>
                    <div class="belong"></div>
                </div>
                <div class="edit-info"><i class="fa-solid fa-user-gear"></i></div>
            </div>
            <table class="my-license-table">
                <thead>
                <tr>
                    <th><%=mh.code("mylicense.page.tr1")%></th>
                    <th><%=mh.code("mylicense.page.tr2")%></th>
                    <th><%=mh.code("mylicense.page.tr3")%></th>
                    <th><%=mh.code("mylicense.page.tr4")%></th>
                    <th><%=mh.code("mylicense.page.tr5")%></th>
                    <th><%=mh.code("mylicense.page.tr6")%></th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

<div class="area_modal"></div>

<script src="/view/mylicense/mylicense/js/mylicense.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp"/>
