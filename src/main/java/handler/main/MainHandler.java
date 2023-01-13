package handler.main;

import common.Message;
import control.CommonHandler;
import model.main.Solution;
import model.main.MainDao;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public class MainHandler extends CommonHandler{
    public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable{
    	MainDao DAO = MainDao.getInstance();
    	
    	if (task.equals(common.Config.sTask)) {
    		if (mode.equals("list")) {

				List<Solution> list = DAO.selectSolutionList(request);
				if(list == null) {
					resultMap.put("resultCode", Message.ERROR_SELECTDOC.getCode());
					resultMap.put("resultMessage", Message.ERROR_SELECTDOC.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("monthly", list);
	        	resultMap.put("resultCode", Message.INFO_SELECTLIST.getCode());
	        	resultMap.put("resultMessage", Message.INFO_SELECTLIST.getMsg());

				return retResult(request, resultMap);
			}
    	}

		resultMap.put("resultCode","taskError");
		resultMap.put("retMsg", "잘못된 접근입니다.");
		request.setAttribute("resultMap", resultMap);
		return "/common/util/retAjax.jsp";
	}
}
