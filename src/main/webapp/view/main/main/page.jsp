<%@ page import="common.message.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<%
    MessageHandler mh = MessageHandler.getInstance();
    Locale locale = request.getLocale();
    mh.setLocale(locale);
%>

<link href="/common/css/solution.css" rel="stylesheet">

<div id="route-contents">
    <div class="container">
        <h2><%=mh.code("main.page.title")%></h2>

        <ul class="top-nav">
        </ul>
        <div class="section-header"><%=mh.code("main.page.header1")%></div>
        <div class="solution-contents">

            <div class="section2">
                <h4 class="sec_title"></h4>
                <ul class="solution-detail"></ul>
            </div>
        </div>

        <div class="section-header"><%=mh.code("main.page.header2")%></div>
        <div class="section3">
            <ul class="license-info"></ul>
        </div>
    </div>
</div>

<div class="area_modal"></div>
<div class="image_modal">
    <div class="modal">
        <section class="modal-xxl image-modal">
            <header>
                <button class="close" onclick="closeModalHtml(event)">
                    &times;
                </button>
            </header>
            <main style="padding-bottom: 1.5em;" data-content-body>
                <img style="width:100%;height:100%;"/>
            </main>
        </section>
    </div>
</div>

<script src="/view/main/main/js/main.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp"/>
