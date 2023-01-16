<%@ page import="common.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<%
    MessageHandler mh = MessageHandler.getInstance();
%>

<div id="route-contents" style="background:#fff;">
    <div class="container">
        <h2><%=mh.code("btn.question")%></h2>
        <div class="form-area"></div>
    </div>
</div>


<script src="/view/question/question/js/question.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp"/>
