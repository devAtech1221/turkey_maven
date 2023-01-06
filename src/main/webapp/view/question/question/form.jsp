<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    response.setHeader("Expires", "0"); // Proxies.
%>

<div class="input-box category">
    <div class="title">관심 제품 선택</div>
    <div class="inner-input"></div>
</div>

<div class="input-box text">
    <div class="input_group">
        <label for="belong" class="title">회사명</label>
        <input
                class="form_control"
                id="belong"
                type="text"
                name="belong"
        >
        <div class="error-box">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="name" class="title">이름</label>
        <input
                class="form_control"
                id="name"
                type="text"
                name="name"
        >
        <div class="error-box">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="position" class="title">직책</label>
        <input
                class="form_control"
                id="position"
                type="text"
                name="position"
        />
        <div class="error-box">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="tel" class="title">핸드폰</label>
        <input
                class="form_control"
                id="tel"
                type="text"
                name="tel"
        />
        <div class="error-box">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="email" class="title">이메일</label>
        <input
                class="form_control"
                id="email"
                type="email"
                name="email"
        >
        <div class="error-box">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="title" class="title">제목</label>
        <input
                class="form_control"
                id="title"
                type="text"
                name="title"
        >
        <div class="error-box">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label for="contents" class="title">내용</label>
        <textarea
                class="form_control"
                id="contents"
                type="text"
                name="contents"
        ></textarea>
        <div class="error-box"></div>
    </div>
</div>

<div class="agree">
    <input
            id="agree"
            type="checkbox"
            name="agree"
            value="on"
    >
    <label for="agree" class="title">개인정보 수집 및 이용에 동의합니다. (필수)</label>
</div>
<div class="error-box"></div>

<div class="btn-group" style="margin-top: 2em; display: flex; justify-content: center;">
    <button class="common-btn" type="button" style="background-color: var(--main-bg-color);">문의하기</button>
</div>
