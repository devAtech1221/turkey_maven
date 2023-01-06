<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<!-- 등록 -->
<span class="btn_group pb0">
    <button type="button" class="monthly-list btn atech_theme2" style="font-size: 11px; padding:.2em .8em !important;">리스트(E)</button>
    <button type="button" class="monthly-cal btn atech_theme2" style="font-size: 11px; padding:.2em .8em !important;">달력(R)</button>
</span>

<span class="btn_group pb0">
	<button type="button" class="monthly-prev2 btn btn_default" style="font-size: 11px; padding:.2em .8em !important;">지난달(Q)</button>
	<button type="button" class="monthly-reset2 btn btn_default" style="font-size: 11px; padding:.2em .8em !important;">이번달(F)</button>
    <button type="button" class="monthly-next2 btn btn_default" style="font-size: 11px; padding:.2em .8em !important;">다음달(W)</button>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnGroup2Wrapper">
    <button type="button" class="btn selected" data-value="" style="font-size: 11px; padding:.2em .8em !important;">전체</button>
</span>