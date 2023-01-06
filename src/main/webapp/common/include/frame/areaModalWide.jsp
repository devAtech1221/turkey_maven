<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<div class="modal in" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title f_left">타이틀</h3>
				<button type="button" class="close fc_white" aria-label="Close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			
			<div class="modal-body">
				<form class="modalform" name="modalform" onsubmit="return false;">
					<input type="hidden" name="task" value="" />
					<input type="hidden" name="mode" value="" />

					<div class="regi_area" data-content-body>
					</div>
				</form>
			</div>
			
			<div class="modal-footer" data-content-footer>
			</div>
		</div>
	</div>
</div>