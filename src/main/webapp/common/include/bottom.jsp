<%@ page import="common.message.MessageHandler" %>
<%@ page import="java.util.Locale" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
	MessageHandler mh = MessageHandler.getInstance();
	Locale locale = request.getLocale();
	mh.setLocale(locale);
%>
        </div>
    </section>

	<footer class="footer">
		<div class="container">
			<div class="footer_logo">
				<img src="/common/images/footer_logo_black.png" />
				<span><%=mh.code("business-name")%></span>
			</div>
			<div class="footer_info">
				<div class="footer_addr">
					<span><%=mh.code("bottom.address")%></span>
					<span>Tel : 052-281-4780</span>
				</div>
				<div><b class="highlight_font"><%=mh.code("bottom.b1")%></b> : <b class="highlight_font"><%=mh.code("bottom.b2")%></b> <%=mh.code("bottom.b3")%>
					<a href="/question/Question.do" class="btn_link"><%=mh.code("btn.question")%></a></div>

				<div class="footer_copyright" style="margin-top:1em;"><b><%=mh.code("bottom.ps")%></b></div>
		</div>
		</div>
	</footer>
</body>

<script type="text/javascript">
	// 로그아웃 이벤트
	$('.logout').on('click',(e) => {
		e.preventDefault();

		$.ajax({
			type : "POST",
			url  : '/login/Login.do',
			dataType: "json",
			data : {
				task: "proc",
				mode: "logout",
			}
		}).done(data => {
			if(data.resultCode === 'OK') {
				window.location = '/main/Main.do';
			}
		})
	})
</script>
</html>
