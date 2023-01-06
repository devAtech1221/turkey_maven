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

//		if(task.equals("logout")){
//			HttpSession session = request.getSession();
//
//			/* auto login session delete after logout */
//			LogDao logDao = LogDao.getInstance();
//			AutoAccess autoAccess = new AutoAccess();
//			autoAccess.setACCESS_IP(request.getRemoteAddr());
//			autoAccess.setACCESS_USER((String)session.getAttribute("U_ID"));
//			autoAccess.setUSER_AGENT(u_agent);
//			if(u_agent.toUpperCase().indexOf("MOBI") > -1){ autoAccess.setIS_MOBILE("Y"); }
//			logDao.deleteAutoAccess(autoAccess);
//
//			session.invalidate();
//
//			resultMap.put("retCode","OK");
//			resultMap.put("url", "/main/Main.do");
//			request.setAttribute("resultMap", resultMap);
//			return "/common/util/retAjax.jsp";
//		}
		
//		if(task.equals("findPassword")){
//			User user = new User(request, "data");
//			String USER_ID = myUtil.null2Blank(user.getUSER_ID()).trim();
//			String EMAIL = myUtil.null2Blank(user.getEMAIL()).trim();
//
//			// 1. 필요값이 없을 경우
//			if(myUtil.isNullOrBlank(USER_ID) || myUtil.isNullOrBlank(EMAIL)) {
//				resultMap.put("resultCode", Message.ERROR_FINDPW_BLANK.getCode());
//				resultMap.put("resultMessage", Message.ERROR_FINDPW_BLANK.getMsg());
//				return retResult(request, resultMap);
//			}
//
//			// 2. USER_ID에 대한 EMAIL 값이 일치하지 않는 경우
//			UserDao userDao = UserDao.getInstance();
//			User selectedUser = userDao.selectDoc(USER_ID);
//			if(!EMAIL.equals(myUtil.null2Blank(selectedUser.getEMAIL()))) {
//				resultMap.put("resultCode", Message.ERROR_FINDPW_WORNG.getCode());
//				resultMap.put("resultMessage", Message.ERROR_FINDPW_WORNG.getMsg());
//				return retResult(request, resultMap);
//			}
//
//			// 3. 임시비밀번호 설정 & 메일 전송
//			boolean success = userDao.startFindPWProcess(selectedUser);
//			if(!success) {
//				resultMap.put("resultCode", Message.ERROR_FINDPW_MAKEPW.getCode());
//				resultMap.put("resultMessage", Message.ERROR_FINDPW_MAKEPW.getMsg());
//				return retResult(request, resultMap);
//			}
//
//			resultMap.put("resultCode", Message.INFO_FINDPW.getCode());
//			resultMap.put("resultMessage", Message.INFO_FINDPW.getMsg());
//			return retResult(request, resultMap);
//		}

		resultMap.put("resultCode","taskError");
		resultMap.put("retMsg", "잘못된 접근입니다.");
		request.setAttribute("resultMap", resultMap);
		return "/common/util/retAjax.jsp";
	}
}
