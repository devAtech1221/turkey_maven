package handler.question;

import control.CommonHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class QuestionHandler extends CommonHandler{

	public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable{

		resultMap.put("resultCode","taskError");
		resultMap.put("retMsg", "잘못된 접근입니다.");
		request.setAttribute("resultMap", resultMap);
		return "/common/util/retAjax.jsp";
	}
}
