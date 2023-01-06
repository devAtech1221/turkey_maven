<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />

<!-- Content Row -->
<div id="route-contents">
    <div class="container">
        <h2>라이선스 관리</h2>
        <div class="management-contents">
            <ul class="status-option">
                <li data-value='ALL'>전체</li>
                <li data-value='NEW'>신규</li>
                <li data-value='SUCCESS'>완료</li>
            </ul>

            <div class="table_area"></div>
        </div>
    </div>
</div>

<div class="area_modal"></div>

<link href="/common/css/management.css" rel="stylesheet">
<script src="/view/management/license/js/license.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp"/>
