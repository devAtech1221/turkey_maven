<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="common.message.MessageHandler" %>
<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    response.setHeader("Expires", "0"); // Proxies.
    MessageHandler mh = MessageHandler.getInstance();
    Locale locale = request.getLocale();
    mh.setLocale(locale);
%>

<div class="input-box category">
    <div class="title required"><%=mh.code("question.form.title")%></div>
    <div class="inner-input"></div>
</div>

<div class="input-box text">
    <div class="input_group">
        <label for="belong" class="title required"><%=mh.code("form.belong")%></label>
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
        <label for="name" class="title required"><%=mh.code("form.name")%></label>
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
        <label for="position" class="title required"><%=mh.code("form.position")%></label>
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
        <label for="tel" class="title required"><%=mh.code("form.tel")%></label>
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
        <label for="email" class="title required"><%=mh.code("form.email")%></label>
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
        <label for="title" class="title required"><%=mh.code("form.tel")%></label>
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
        <label for="contents" class="title required"><%=mh.code("form.contents")%></label>
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
    <label for="agree"><%=mh.code("form.agree")%><sapn class="required-agree"><%=mh.code("form.agree.required")%></sapn></label>
</div>
<div class="error-box" data-key="agree">
    <div class="error-msg"></div>
</div>

<div class="btn-group" style="margin-top: 2em; display: flex; justify-content: center;">
    <button class="common-btn" type="button" style="background-color: var(--main-bg-color); color: white;"><%=mh.code("btn.question")%></button>
</div>
