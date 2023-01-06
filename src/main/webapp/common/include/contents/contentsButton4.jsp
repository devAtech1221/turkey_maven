<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>
<!-- 등록 -->
<span class="btn_group pb0 gantt_searchbtn_wrapper float-left" id="" style="margin-left: 4px; padding-left: 11px; padding-top: 0; margin-top: 11px;">
    <input class="form-check-input" type="checkbox" autocomplete="off" id="cbxKeyboardNavi">
    <label class="form-check-label" for="cbxKeyboardNavi">keyboard 사용</label>
    <button type="button" class="btn" id="btnShowShortcut" style="font-size: 11px; padding:.2em .8em !important; background-color: #49809a; color:#ffffff;">단축키</button>
    <select class="btn" id="btnColSelect" multiple="multiple" style="font-size: 11px; padding:.2em .8em !important;">컬럼</select>
    <input type="text" id="delayInput" style="width: 10em; height: 24px; padding: .125em .5em; position: relative; top: 2px; border: 1px solid #ddd; font-size: 1em; box-shadow: none;" placeholder="지연기준일자" readonly>
    <button type="button" class="btn" id="btnExcelDownload" style="font-size: 11px; padding:.2em .8em !important; background-color: #1D6F42; color:#ffffff;">Excel↓</button>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnTaskStatusWrapper" style="margin-left: 4px; padding-left: 11px; padding-top: 0; margin-top: 11px;">
    <button type="button" class="btn" data-value="all" style="font-size: 11px; padding:.2em .8em !important;">전체업무</button>
    <button type="button" class="btn" data-value="ongoing" style="font-size: 11px; padding:.2em .8em !important;">진행업무</button>
    <button type="button" class="btn" data-value="done" style="font-size: 11px; padding:.2em .8em !important;">완료업무</button>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnBizStatusWrapper" style="margin-left: 4px; padding-left: 11px; padding-top: 0; margin-top: 11px;">
    <%--<button type="button" class="btn" data-value="all" style="font-size: 11px; padding:.2em .8em !important;">전체사업</button>--%>
    <button type="button" class="btn" data-value="ongoing" style="font-size: 11px; padding:.2em .8em !important;">진행사업</button>
    <button type="button" class="btn" data-value="done" style="font-size: 11px; padding:.2em .8em !important;">완료사업</button>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnTaskUnitWrapper" style="margin-left: 4px; padding-left: 11px; padding-top: 0; margin-top: 11px;">
	<button type="button" class="btn" data-value="biz" style="font-size: 11px; padding:.2em .8em !important;">사업단위</button>
	<button type="button" class="btn" data-value="process" style="font-size: 11px; padding:.2em .8em !important;">프로세스단위</button>
    <button type="button" class="btn" data-value="all" style="font-size: 11px; padding:.2em .8em !important;">업무단위</button>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnDeptWrapper" style="margin-left: 4px; padding-left: 11px; padding-top: 0; margin-top: 11px;">
    <button type="button" class="btn" data-value="all" style="font-size: 11px; padding:.2em .8em !important;">전체부서</button>
    <%--<button type="button" class="btn" data-value="user" style="font-size: 11px; padding:.2em .8em !important;">내업무</button>--%>
</span>

<span class="btn_group pb0 gantt_searchbtn_wrapper" id="btnTimeUnitWrapper" style="margin-left: 4px; padding-left: 11px; padding-top: 0; margin-top: 11px;">
    <button type="button" class="btn btn_default" data-value="day" style="font-size: 11px; padding:.2em .8em !important;">DAY</button>
    <button type="button" class="btn btn_default" data-value="week" style="font-size: 11px; padding:.2em .8em !important;">WEEK</button>
    <button type="button" class="btn btn_default" data-value="month" style="font-size: 11px; padding:.2em .8em !important;">MONTH</button>
    <button type="button" class="btn btn_default" data-value="quarter" style="font-size: 11px; padding:.2em .8em !important;">QUARTER</button>
    <button type="button" class="btn" id="ganttMoveToday" style="font-size: 11px; padding:.2em .8em !important; background-color: rgba(255,0,0,.4); color:#ffffff;">Today</button>
</span>

