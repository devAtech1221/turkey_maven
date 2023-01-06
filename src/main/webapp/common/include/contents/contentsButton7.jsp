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
<style>
.selected {
    background: #9b9b9b;
    color: #fff;
}
</style>

<!-- 등록 -->
<span class="btn_group btn_proc_group">
    <button type="button" id="btnUpdateDocModal" class="show_update_modal btn atech_theme2 hidden" style="font-size: 11px; padding:.2em .8em !important;">수정</button>
    <button type="button" id="btnShowDocModal" class="show_write_modal btn atech_theme2" style="font-size: 11px; padding:.2em .8em !important;">등록</button>
</span>
<span class="btn_group pb0" id="btnGroupWrapper">
	<button type="button" class="btn U_ID" data-value="<%=userid %>" style="font-size: 11px; padding:.2em .8em !important;">내 업무</button>
	<button type="button" class="btn" data-value="Y" style="font-size: 11px; padding:.2em .8em !important;">미확인</button>
</span>
