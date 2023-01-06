<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<div class="modal">
	<section class="modal-lg">
		<header>
			<button class="close" onclick="closeModalHtml(event)">
				&times;
			</button>
		</header>
		<main style="padding-top: 2.5em; padding-bottom: 3em;" data-content-body>

			<div data-content-inner1></div>
			<div data-content-inner2></div>
			<div data-content-footer></div>
		</main>
	</section>
</div>


