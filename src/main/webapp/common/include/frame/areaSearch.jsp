<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<form class="" id="searchForm" name="searchForm" method="get" onsubmit="return false;">
	<input type="hidden" name="task" value="select" />
	<input type="hidden" name="mode" value="list" />
	<div class="cont_search">
		<div class="search_wrap">
			<ul data-content>

			</ul>
			<button class="btn btn_search atech_theme1" id="">검색</button>
		</div>
	</div>
	<button class="btn_search_detail">상세검색 +</button>
</form>

