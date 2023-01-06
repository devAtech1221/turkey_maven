<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<form class="form-box form-box2">
	<%--	<ul class="mgm-license-info">--%>
	<%--		<li class="info-title"></li>--%>
	<%--			{data?.license?.map(ele => {--%>
	<%--		--%>
	<%--			return (--%>
	<%--			<li>--%>
	<%--				<span>{`${data.licenseType === 'trial' ? '0$' : ele.type}`} / </span>--%>
	<%--				<span>{`${data.licenseType === 'trial' ? '무료 체험' : ele[data.licenseType]}`}</span>--%>
	<%--			</li>--%>
	<%--			)--%>
	<%--		})}--%>
	<%--	</ul>--%>
	<div></div>
	<div class="input-box category">
		<div class="title">선택 제품</div>

		<div class="inner-input">
			<div class="selected-solution"></div>
		</div>
	</div>

	<div class="input-box text input_flex">
		<div class="input_group">
			<label for="belong" class="title">회사명</label>
			<input
					class="form_control"
					id="belong"
					type="text"
					name="belong"
					disabled
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label for="name" class="title">이름</label>
			<input
					class="form_control"
					id="name"
					type="text"
					name="name"
					disabled
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label for="position" class="title">직책</label>
			<input
					class="form_control"
					id="position"
					type="text"
					name="position"
					disabled
			/>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label for="tel" class="title">핸드폰</label>
			<input
					class="form_control"
					id="tel"
					type="text"
					name="tel"
					disabled
			/>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group">
			<label for="email" class="title">이메일</label>
			<input
					class="form_control"
					id="email"
					type="email"
					name="email"
					disabled
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group" style="width: 100%;">
			<label for="title" class="title">제목</label>
			<input
					class="form_control"
					id="title"
					type="text"
					name="title"
					disabled
			>
			<div class="error-box">
				<div class="error-msg"></div>
			</div>
		</div>

		<div class="input_group" style="width: 100%;height: auto">
			<label for="contents" class="title">내용</label>
			<textarea
					class="form_control"
					id="contents"
					type="text"
					name="contents"
					disabled
			></textarea>
			<div class="error-box"></div>
		</div>
	</div>
</form>