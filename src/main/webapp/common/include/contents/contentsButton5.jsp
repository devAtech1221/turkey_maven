<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<!-- 등록 -->
<span class="btn_group btn_proc_group pb0">
    <button type="button" class="show_update_modal btn btn_write atech_theme2 hidden" style="font-size: 11px; padding:.2em .8em !important;">수정</button>
    <button type="button" class="show_write_modal btn btn_write atech_theme2" style="font-size: 11px; padding:.2em .8em !important;">등록</button>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnGroupWrapper">
	<button type="button" class="btn selected" data-value="" style="font-size: 11px; padding:.2em .8em !important;">전체</button>
	<!-- 부서 button 동적 추가 -->
</span>