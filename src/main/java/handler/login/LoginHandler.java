package handler.login;

import common.*;
import control.CommonHandler;
import model.log.AuthCheck;
import model.log.AutoAccess;
import model.log.LogDao;
import model.system.user.user.User;
import model.system.user.user.UserDao;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginHandler  extends CommonHandler{

	public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable{
		MyUtil myUtil = new MyUtil();
		User user = new User(request,"data");
		String task = myUtil.null2Blank(request.getParameter("task")).trim();
		String u_id = myUtil.null2Blank(user.getUser_id()).trim();
		String u_pass = myUtil.null2Blank(user.getUser_pass()).trim();
		String u_agent = request.getHeader("User-Agent");

		if(task.equals("proc")) {
			UserDao DAO = UserDao.getInstance();

			if(mode.equals("login")){
				AES256Util aesUtil = new AES256Util(Config.getEKey());
				u_pass = aesUtil.aesEncode(u_pass);

				if(u_id.equals("") || u_pass.equals("")){
					resultMap.put("resultCode","RequireData");
					resultMap.put("retMsg", "아이디 또는 비밀번호를 입력하세요.");
					request.setAttribute("resultMap", resultMap);
					return "/common/util/retAjax.jsp";
				}

				User input_user = new User();
				input_user.setUser_id(u_id);
				input_user.setUser_pass(u_pass);

				UserDao userDao = UserDao.getInstance();
				User checkedUser = userDao.selectAllowedUser(input_user);
				AuthCheck authCheck = new AuthCheck();

				if(checkedUser == null ){
					resultMap.put("resultCode","NotFound");
					resultMap.put("retMsg", "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
					request.setAttribute("resultMap", resultMap);
					return "/common/util/retAjax.jsp";
				}

				authCheck.setSessionForLogin(checkedUser, "N", request);

				resultMap.put("resultCode","OK");
				resultMap.put("retMsg", "");
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";

			} else if(mode.equals("logout")){
				HttpSession session = request.getSession();
				session.invalidate();

				resultMap.put("resultCode","OK");
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";
			}
		}

		resultMap.put("resultCode","taskError");
		resultMap.put("retMsg", "잘못된 접근입니다.");
		request.setAttribute("resultMap", resultMap);
		return "/common/util/retAjax.jsp";
	}
}
