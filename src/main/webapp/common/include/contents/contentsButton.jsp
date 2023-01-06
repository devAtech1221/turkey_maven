<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<!-- 등록 -->
<span class="btn_group btn_proc_group">
    <button type="button" id="btnUpdateDocModal" class="show_update_modal btn atech_theme2 hidden" style="font-size: 11px; padding:.2em .8em !important;">수정</button>
    <button type="button" id="btnShowDocModal" class="show_write_modal btn atech_theme2" style="font-size: 11px; padding:.2em .8em !important;">등록</button>
</span>