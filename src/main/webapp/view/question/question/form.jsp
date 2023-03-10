<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    response.setHeader("Expires", "0"); // Proxies.
%>

<div class="input-box category">
    <div class="title required">관심 제품 선택</div>
    <div class="inner-input"></div>
</div>

<div class="input-box text">
    <div class="input_group">
        <label for="belong" class="title required">회사명</label>
        <input
            class="form_control"
            id="belong"
            type="text"
            name="belong"
        >
        <div class="error-box" data-key="belong">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="name" class="title required">이름</label>
        <input
            class="form_control"
            id="name"
            type="text"
            name="name"
        >
        <div class="error-box" data-key="name">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="position" class="title required">직책</label>
        <input
            class="form_control"
            id="position"
            type="text"
            name="position"
        />
        <div class="error-box" data-key="position">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="tel" class="title required">핸드폰</label>
        <input
            class="form_control"
            id="tel"
            type="text"
            name="tel"
        />
        <div class="error-box" data-key="tel">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="email" class="title required">이메일</label>
        <input
            class="form_control"
            id="email"
            type="email"
            name="email"
        >
        <div class="error-box" data-key="email">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="title" class="title required">제목</label>
        <input
            class="form_control"
            id="title"
            type="text"
            name="title"
        >
        <div class="error-box" data-key="title">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="contents" class="title required">내용</label>
        <textarea
            class="form_control"
            id="contents"
            type="text"
            name="contents"
        ></textarea>
        <div class="error-box" data-key="contents">
            <div class="error-msg"></div>
        </div>
    </div>
</div>

<div class="agree">
    <input
        id="agree"
        type="checkbox"
        name="agree"
        value="on"
    >
    <label for="agree" class="title required-agree">개인정보 수집 및 이용에 동의합니다.</label>
</div>
<div class="error-box" data-key="agree">
    <div class="error-msg"></div>
</div>

<div class="btn-group" style="margin-top: 2em; display: flex; justify-content: center;">
    <button class="common-btn" type="button" style="background-color: var(--main-bg-color); color: white;">문의하기</button>
</div>
