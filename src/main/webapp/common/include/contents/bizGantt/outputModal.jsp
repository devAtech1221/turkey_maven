<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<input type="text" class="hidden" name="id">
<div class="table_info">
	<ul class="nav nav-tabs nav-tabs2">
		<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#tabPartList">산출물</a></li>
<%--		<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tabSubMat">추가자재목록</a></li>--%>
	</ul>
	<div class="tab-content tab-content2">
		<div class="tab-pane fade show active" id="taskOutputList">
			<div class="table_info_btn_wrap table_info_btn_wrap2">
<%--				<button type="button" class="btn" name="" id="btnProjModalOpen">BOM 불러오기</button>--%>
			</div>
			<div class="modal_table2_wrapper">
				<div class="table_wrap table_output_area">
					<div class="detail_table list_table table table-bordered"></div>
				</div>
			</div>
		</div>

	</div>
</div>