<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />
<link href="/common/css/solution.css" rel="stylesheet">

<div id="route-contents">
    <div class="container">
        <h2>솔루션 소개</h2>

        <ul class="top-nav">
        </ul>
        <div class="section-header">솔루션 주요기능</div>
        <div class="solution-contents">

<%--            <div class="custom-slider"></div>--%>

            <div class="section2">
                <h4 class="sec_title"></h4>
                <ul class="solution-detail"></ul>
            </div>
        </div>

        <div class="section-header">구축 비용</div>
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
