<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<form class="form-box form-box2">
	<div class="input-box">
		<ol class="type_info">
			<li style="padding-right: 1em;">
				<h5 style="font-size: 1.5em;margin-bottom: 1em;">{name}</h5>

				<div>
					<h6 style="font-size: 1.125em;">제품 유형</h6>

					<dl class="type_list">
						<dd>
							<input
								type="radio"
								name="license_type"
								data-name="체험 상품"
								value='trial'
							/>체험상품</dd>
						<dd>
							<input
								type="radio"
								name="license_type"
								data-name="Basic"
								value="basic"
							/> Basic</dd>
						<dd>
							<input
								type="radio"
								name="license_type"
								data-name="Premium"
								value="premium"
							/> Premium</dd>
						<dd>
							<input
								type="radio"
								name="license_type"
								data-name="맞춤형 상품"
								value="custom"
							/> 맞춤형 상품</dd>
					</dl>
				</div>
			</li>

			<li style="padding-right: 1em;">
				<div class="cost_info" style="background: #f5f7f9; padding: 1em; border: 0; border-radius: .5em;">
					<div style="display:flex; justify-content: space-between;">
						<span style="margin-top: .25em;">비용</span>
						<dl>
<%--							<dd>--%>
<%--								<span class="cost">{licenseInfo.license['연간 구독형'] == undefined ? '　' :licenseInfo.license['연간 구독형']}</span>--%>
<%--								{licenseInfo.license['연간 구독형'] == undefined ? '' : ' / 연간 구독형'}--%>
<%--							</dd>--%>
<%--							<dd>--%>
<%--								<span class="cost">{licenseInfo.license['영구 라이선스'] == undefined ? '0$' : licenseInfo.license['영구 라이선스']}</span>--%>
<%--								{licenseInfo.license['연간 구독형'] == undefined ? ' / 15일' : ' / 영구 라이선스'}--%>
<%--							</dd>--%>
						</dl>
					</div>
				</div>
				<span style="margin-top: .25em; font-size: .875em; color: #888; font-weightt: 400; text-align: right; display: block;">※설치비 및 부가세 별도</span>
			</li>
		</ol>
	</div>

	<div class="input_group">
		<label for="title" class="title">제목</label>
		<input
			class="form_control"
			id="title"
			type="text"
			name="title"
		/>
		<div class="error-box" data-key="title">
			<div class="error-msg"></div>
		</div>
	</div>

	<div class="input_group">
		<label for="contents" class="title">내용</label>
		<textarea
			class="form_control"
			id="contents"
			type="text"
			name="contents"
		/>
		<div class="error-box" data-key="contents">
			<div class="error-msg"></div>
		</div>
	</div>

	<div class="agree">
		<input
			id="agree"
			type="checkbox"
			name="agree"
			value="on"
		/>
		<label for="agree" class="title">개인정보 수집 및 이용에 동의합니다. (필수)</label>
	</div>
	<div class="error-box" data-key="agree">
		<div class="error-msg"></div>
	</div>
</form>