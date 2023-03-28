package handler.management;

import common.*;
import control.CommonHandler;
import model.management.license.License;
import model.management.license.LicenseDao;
import model.management.question.Question;
import model.mylicense.MylicenseDao;
import model.system.user.auth.Auth;
import model.system.user.user.User;
import model.system.user.user.UserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class UserHandler extends CommonHandler{

	public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable{
		UserDao DAO = UserDao.getInstance();
		LicenseDao licenseDao = LicenseDao.getInstance();

		Logger logger = LoggerFactory.getLogger(UserHandler.class);

		if (task.equals(Config.sTask)) {
			if(mode.equals("list")){
				if (!MyUtil.authorization(request, Auth.ADMIN)) {
					resultMap.put("resultCode", Message.ERROR_AUTH.getCode());
					resultMap.put("resultMessage", Message.ERROR_AUTH.getMsg());
					return retResult(request, resultMap);
				}

				Paging paging = new Paging();

				List<User> userList = DAO.selectList(paging);

				paging.setNumberOfRecords(DAO.getNoOfRecords());
				paging.makePaging();

				if(userList == null) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("last_page", (paging.getFinalPageNo() == 0) ? "1" : paging.getFinalPageNo());
				resultMap.put("data", userList);
				resultMap.put("page", paging);
				resultMap.put("resultCode", Message.INFO_SELECTLIST.getCode());
				resultMap.put("resultMessage", Message.INFO_SELECTLIST.getMsg());
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";

			}

		} else if (task.equals(Config.pTask)) {

		}

		resultMap.put("resultCode","taskError");
		resultMap.put("retMsg", "잘못된 접근입니다.");
		request.setAttribute("resultMap", resultMap);
		return "/common/util/retAjax.jsp";
	}
}
