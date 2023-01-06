<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
<button type="button" class="btn btn-tmp-save bg-light-grey">임시저장</button>
<button type="button" class="btn btn-save bg-blue">등록</button>