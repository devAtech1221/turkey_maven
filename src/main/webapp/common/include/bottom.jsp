<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
        </div>
    </section>

	<footer class="footer">
		<div class="container">
			<div class="footer_logo">
				<img src="/common/images/logo.png" />
				<span>에이테크</span>
			</div>
			<div class="footer_info">
				<div class="footer_addr">
					<span>주소 : (44547) 울산광역시 중구 종가로 655, 2F-307호(서동, 혁신센트럴시티)</span>
					<span>Tel : 052-281-4780</span>
				</div>
				<div><b class="highlight_font">고객지원</b> : <b class="highlight_font">전화 상담</b> 평일 9:00-18:00 또는 <a href="/question/Question.do" class="btn_link">문의하기</a></div>

				<div class="footer_copyright" style="margin-top:1em;"><b>©A-TECH COMPANY. ALL RIGHTS RESERVED.</b></div>
		</div>
		</div>
	</footer>
</body>

<script type="text/javascript">
	// 로그아웃 이벤트
	$('.logout').on('click',() => {
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
