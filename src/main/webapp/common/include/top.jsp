<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="common.*, model.system.user.user.*, model.system.master.menu.*"%>
<%@ page import="com.google.gson.GsonBuilder" %>
<%@ page import="com.google.gson.Gson" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<%
	//1. system
	String reqURI = (String)request.getAttribute("requestURI");
	Boolean isMobile = (Boolean)request.getAttribute("isMobile");

	//2. user
	User user = (User)request.getAttribute("USER");
	String userJson = "";
	if (user != null) {
		Gson objGson = new GsonBuilder().setPrettyPrinting().create();
		userJson = objGson.toJson(user);
	}

	//3. menu
	List<Menu> menuList = (List<Menu>) request.getAttribute("MENU");
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta http-equiv="content-type" content="text/html;charset=UTF-8" />

	<title><%=Config.strSiteName%></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta content="" name="description" />
	<meta content="" name="atech" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<!-- CSS -->
	<link href="/common/css/additional/tabulator_bootstrap.css" rel="stylesheet" type="text/css">
	<link href="/common/common.css" rel="stylesheet">
	<link href="/common/font.css" rel="stylesheet">
	<link href="/common/modal.css" rel="stylesheet">

	<!-- JS -->
	<script src="https://kit.fontawesome.com/7ee6b8223a.js" crossorigin="anonymous"></script>
	<script src="/common/js/jquery.min.js"></script>
	<script src="/common/js/jquery-ui.min.js"></script>
	<script src="/common/js/jquery.serialize-object.min.js"></script>
	<script src="/common/js/jquery.slimscroll.js"></script>
	<script src="/common/js/bootstrap.bundle.min.js"></script>
	<script src="/common/js/popper.js"></script>
	<script src="/common/js/bootstrap-datepicker.js"></script>
	<script src="/common/js/bootstrap-datepicker.kr.js"></script>
	<script src="/common/js/bootstrap-datetimepicker.js"></script>
	<script src="/common/js/moment.js"></script>
	<script src="/common/js/additional/monthly.js"></script>
	<script src="/common/js/additional/monthly2.js"></script>
	<script src="/common/js/additional/printThis.js"></script>
	<script src="/common/js/additional/dropzone.min.js"></script>
	<script src="/common/js/additional/toastify.js"></script>
	<script src="/common/js/additional/jquery.loading.min.js"></script>
	<script src="/common/js/additional/tabulator.js"></script>
	<script src="/common/js/additional/typeahead.bundle.js"></script>
	<script src="/common/js/additional/xlsx.full.min.js"></script> <!-- tabulator 다운로드 관련 -->
	<script src="/common/js/additional/frappe-gantt.js"></script> <!-- js 내부 일부 수정함 --> <!-- gantt1 sample1 -->
	<script src="/common/js/additional/squire.js"></script>
	<script src="/common/js/additional/raphael.min.js"></script>
	<script src="/common/js/additional/progressStep.js"></script> <!-- js 내부 일부 수정함 -->
	<script src="/common/js/additional/tagify.min.js"></script>
	<script src="/common/js/additional/Chart.min.js"></script> <!-- chart.js -->
	<script src="/common/js/additional/dhtmlxgantt.js"></script>
	<script src="/common/js/additional/ckeditor.js"></script> <!-- ckeditor.js -->
	<script src="/common/js/additional/tui-time-picker.js"></script> <!-- toast time picker.js -->
	<script src="/common/js/atech/commonUtil.js?version=${environment.release_version}"></script>
	<script src="/common/js/atech/commonGlobal.js?version=${environment.release_version}"></script>
	<script src="/common/js/atech/commonValidation.js?version=${environment.release_version}"></script>
	<script src="/common/js/atech/commonFrame.js?version=${environment.release_version}"></script>

	<%-- slick --%>
	<link rel="stylesheet" type="text/css" href="/common/slick/slick.css"/>
	<link rel="stylesheet" type="text/css" href="/common/slick/slick-theme.css"/>
	<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script type="text/javascript" src="/common/slick/slick.min.js"></script>


</head>

<script type="text/javascript">
	let LOGIN_USER = null;
	if(`<%=userJson%>`){
		LOGIN_USER = JSON.parse(`<%=userJson%>`);
		LOGIN_USER.user_pass = null;
	}
</script>

	<!-- Top Bar -->
<div class="navbar-wrap">
	<div class="container">
		<nav class="navbar flxCnt" id="gnb">
			<h1 class="navbar-header" id="logo">
				<a href="/">
					<img src="/common/images/logo.png"/>
				</a>
			</h1>

			<div class="gnb">
				<ul class="menu">
					<!-- Menu 1 -->
					<%for(Menu m1 : menuList){
						// 사용 N 메뉴
						if(m1.getUSE_YN().equals("N")){ continue; }
					%>
						<li>
							<a
									href="<%=m1.getMENU_URL()%>"
									class="<%=reqURI.equals(m1.getMENU_URL())  ? "selected-menu" : ""%>"
							>
								<%=m1.getMENU_NM()%>
							</a>
						</li>
					<%}%>
				</ul>
			</div>

			<div class="navbar_quick">
				<ul>
					<%
						if(user == null) {
					%>
						<li>
							<a href="/login/Login.do">로그인</a>
						</li>
						<li>
							<a href="/join/Join.do">회원가입</a>
						</li>
					<%}
						else {
					%>
						<li>
							<span class="logout" style="cursor: pointer;">로그아웃</span>
						</li>
					<%}%>
				</ul>
			</div>
		</nav>
	</div>
</div>

  	<div class="page_content">
