<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<!-- <input type="hidden" name="task" value="" />
<input type="hidden" name="mode" value="" />
 -->
<div class="doc_info doc_info2">
    <div class="ul-normal">
        <ul class="regi_form">
<%--			<input type="text" class="hidden" name="on_modifying">--%>
			<input type="text" class="hidden" name="temp_id">
			<li class="_col4"><label class="">번호(*)</label>
				<div class="input_group"><input type="text" class="form-control form_theme" placeholder="자동생성" name="id" autocomplete="off" readonly></div>
			</li>
			<li class="_col8"><label class="">업무명(*)</label>
				<div class="input_group"><input type="text" class="form-control form_theme required" name="text" autocomplete="off" data-valid-types="notnull"></div>
			</li>
<%--			<li class="_col4"><label class="">REV</label>--%>
<%--				<div class="input_group"><input type="text" class="form-control form_theme" name="rev" autocomplete="off" readonly></div>--%>
<%--			</li>--%>
			<li class="_col4"><label class="">사업명</label>
				<input type="text" class="hidden" name="biz_itm_cd">
				<input type="text" class="hidden" name="parent_itm_cd">
				<div class="input_group"><input type="text" class="form-control form_theme" name="biz_itm_text" autocomplete="off" readonly></div>
			</li>
			<li class="_col8"><label class="">담당자(*)</label>
				<%-- typeahead 로 변경--%>
				<input type="text" class="hidden" name="mngr_nm">
				<input type="text" class="hidden" name="manager_id">
				<div class="input_group"><input type="text" class="form-control form_theme" name="manager_tag" autocomplete="off"></div>
			</li>
			<li class="_col4 hidden"><label class="">타입(*)</label>
				<input type="text" class="hidden" name="gubun">
				<div class="input_group">
					<select class="form-control form_theme required" name="type" data-valid-types="notnull">
						<option value="task" selected="selected">업무</option>
						<option value="milestone">단발성</option>
					</select>
				</div>
			</li>

			<li class="_col4"><label class="">상위업무</label>
				<input type="text" class="hidden" name="parent">
				<div class="input_group"><input type="text" class="form-control form_theme" name="parent_text" autocomplete="off" readonly></div>
			</li>
			<li class="_col4"><label class="">시작일(*)</label>
				<div class="input_group"><input type="text" class="form-control form_theme form_date required" name="start_date" autocomplete="off" data-type="date" data-valid-types="notnull"></div>
			</li>
			<li class="_col4"><label class="">종료일</label>
				<div class="input_group"><input type="text" class="form-control form_theme form_date required" name="end_date" autocomplete="off" data-type="date" data-valid-types="notnull"></div>
			</li>
			<li class="_col4"><label class="">기간</label>
				<div class="input_group"><input type="text" class="form-control form_theme " name="duration" autocomplete="off" readonly></div>
			</li>
			<li class="_col4"><label class="">진행률(%)</label>
				<input type="text" class="hidden" name="progress">
				<div class="input_group"><input type="text" class="form-control form_theme required" name="progress_per" autocomplete="off" data-type="number" data-valid-types="min max" data-valid-min="0" data-valid-max="100"></div>
			</li>
			<li class="_col4"><label class="">상태</label>
				<%-- select 로 변경--%>
				<div class="input_group">
					<select class="form-control form_theme" name="status">
						<option value="01">대기</option>
						<option value="02">진행</option>
						<option value="03">완료</option>
						<option value="04">중지</option>
						<option value="05">취소</option>
					</select>
				</div>
			</li>
			<li class="_col4"><label class="">승인대상</label>
				<div class="input_group">
					<select class="form-control form_theme" name="approval">
						<option value="Y">Y</option>
						<option value="N">N</option> 
						
					</select>
				</div>
			</li>
			<li class="_col4"><label class="">승인상태</label>
				<div class="input_group">
					<select class="form-control form_theme" name="importance">
						<option value="00">대기</option>
						<option value="01">승인</option>
						<option value="02">미승인</option> 
						<option value="03">승인중</option>
					</select>
				</div>
			</li>
<%--			<li class="_col4"><label class="">산출물리스트</label>--%>
<%--				&lt;%&ndash; string -> list 로 변경&ndash;%&gt;--%>
<%--				&lt;%&ndash;<input type="text" class="hidden" name="output_list">&ndash;%&gt;--%>
<%--				<div class="input_group"><input type="text" class="form-control form_theme" name="output_list" autocomplete="off"></div>--%>
<%--			</li>--%>
            <li class="_col12"><label class="">비고</label>
                <div class="input_group"><textarea class="form-control form_theme" name="comment" autocomplete="off"></textarea></div>
            </li>
		</ul>
    </div>
</div>