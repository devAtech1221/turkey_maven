<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="/common/include/top.jsp" />

<!-- Content Row -->
<div id="route-contents">
    <div class="container">
        <h2>마이페이지</h2>

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
                    <th>번호</th>
                    <th>제품정보</th>
                    <th>계정정보</th>
                    <th>신청일</th>
                    <th>만료일</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

<div class="area_modal"></div>

<link href="/common/css/my-license.css" rel="stylesheet">
<script src="/view/mylicense/mylicense/js/mylicense.js?version=${environment.release_version}"></script>
<jsp:include page="/common/include/bottom.jsp"/>