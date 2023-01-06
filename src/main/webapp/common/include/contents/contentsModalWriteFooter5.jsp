<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    response.setHeader("Expires", "0"); // Proxies.
%>
<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
<button type="button" class="btn btn-remove atech_theme1">삭제</button>
<button type="button" class="btn btn-save atech_theme2">저장</button>
<button type="button" class="btn atech_theme2 hidden" id="btnAutoSave">자동 저장</button>
<button type="button" class="btn btn-print atech_theme3">인쇄</button>