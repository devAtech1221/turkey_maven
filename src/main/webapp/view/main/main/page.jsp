<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />

<!-- Content Row -->
<div id="route-contents">
    <div class="container">
        <h2>솔루션 소개</h2>

        <ul class="top-nav">
        </ul>
        <div class="section-header">솔루션 주요기능</div>
        <div class="solution-contents">

            <div class="custom-slider">
                <div>your content</div>
                <div>your content</div>
                <div>your content</div>
            </div>

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

<link href="/common/css/solution.css" rel="stylesheet">
<script src="/view/main/main/js/main.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp"/>
