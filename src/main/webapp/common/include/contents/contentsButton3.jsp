<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
	Cookie[] cookies = request.getCookies();
	String userid = "";
	if(cookies !=null){ // was 측에서 쿠키를 받기 위한 식. 배열이므로 for문을 사용한다.
		for(Cookie cookie : cookies){
			if("USER_ID".equals(cookie.getName()))
				userid = cookie.getValue();
		}
	}
%>
<!-- 등록 -->
<span class="btn_group pb0" id="btnTypeGroup">
    <button type="button" class="monthly-list btn atech_theme2" style="font-size: 11px; padding:.2em .8em !important;">리스트(E)</button>
    <button type="button" class="monthly-cal btn atech_theme2" style="font-size: 11px; padding:.2em .8em !important;">달력(R)</button>
</span>

<span class="btn_group pb0" id="btnCtrlGroup">
	<button type="button" class="monthly-prev btn btn_default" style="font-size: 11px; padding:.2em .8em !important;">지난달(Q)</button>
	<button type="button" class="monthly-reset btn btn_default" style="font-size: 11px; padding:.2em .8em !important;">이번달(F)</button>
    <button type="button" class="monthly-next btn btn_default" style="font-size: 11px; padding:.2em .8em !important;">다음달(W)</button>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnFilterGroup">
	<button type="button" class="btn btn_uid" data-value="<%=userid %>" style="font-size: 11px; padding:.2em .8em !important;">내 일정</button>
	<button type="button" class="btn" data-value="Y" style="font-size: 11px; padding:.2em .8em !important;">미확인</button>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnGroupWrapper">
    <button type="button" class="btn selected" data-value="" style="font-size: 11px; padding:.2em .8em !important;">전체</button>
</span>