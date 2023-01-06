<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<!-- 등록 -->
<span class="btn_group btn_proc_group">
    <button type="button" id="btnDownloadData" class="btn btn_download" style="font-size: 11px; padding:.2em .8em !important;">다운로드</button>
</span>