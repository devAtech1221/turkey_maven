<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    response.setHeader("Expires", "0"); // Proxies.

%>

<div class="input-box category">
    <div data-msg_src="question.form.title" class="title required"></div>
    <div class="inner-input"></div>
</div>

<div class="input-box text">
    <div class="input_group">
        <label data-msg_src="form.belong" for="belong" class="title required"></label>
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
        <label data-msg_src="form.name" for="name" class="title required"></label>
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
        <label data-msg_src="form.position" for="position" class="title required"></label>
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
        <label data-msg_src="form.tel" for="tel" class="title required"></label>
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
        <label data-msg_src="form.email" for="email" class="title required"></label>
        <input
            class="form_control"
            id="email"
            type="email"
            name="email"
        >
        <div  class="error-box" data-key="email">
            <div class="error-msg"></div>
        </div>
    </div>

    <div class="input_group">
        <label data-msg_src="form.title" for="title" class="title required"></label>
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
        <label data-msg_src="form.contents" for="contents" class="title required"></label>
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
    <label data-msg_src="form.agree" for="agree"><sapn data-msg_src="form.agree.required" class="required-agree"></sapn></label>
</div>
<div class="error-box" data-key="agree">
    <div class="error-msg"></div>
</div>

<div class="btn-group" style="margin-top: 2em; display: flex; justify-content: center;">
    <button data-msg_src="btn.question" class="common-btn" type="button" style="background-color: var(--main-bg-color); color: white;"></button>
</div>
