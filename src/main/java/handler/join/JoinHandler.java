package handler.join;

import common.*;
import common.mail.SendMail;
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

public class JoinHandler extends CommonHandler{

	public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable{

		if(task.equals("proc")) {
			UserDao DAO = UserDao.getInstance();

			if(mode.equals("join")) {
				User user = new User(request,"data");
				boolean success = DAO.join(user);

				if(!success) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg(user.getUser_id()));
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode", Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg(user.getUser_id()));
				return retResult(request, resultMap);

			} else if(mode.equals("idDuplChk")) {
				User user = new User(request,"data");
				boolean success = DAO.idDulpChk(user);

				if(!success) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode", Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg());
				return retResult(request, resultMap);

			}  else if(mode.equals("sendAuthCode")) {
				User user = new User(request,"data");
				boolean success1 = DAO.emailDuplChk(user);

				if(!success1) {
					resultMap.put("resultCode", Message.EMAIL_DUPL.getCode());
					resultMap.put("resultMessage", Message.EMAIL_DUPL.getMsg());
					return retResult(request, resultMap);
				}

				// 인증메일 전송
				SendMail sendMail = SendMail.getInstance();
				sendMail.sendCodeMail(user.getEmail());

				resultMap.put("resultCode", Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg());
				return retResult(request, resultMap);

			} else if(mode.equals("ChkAuthCode")) {
				SendMail sendMail = SendMail.getInstance();
				String code = request.getParameter("code");
				boolean success = sendMail.check(code);

				if(!success) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode", Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg());
				return retResult(request, resultMap);
			}
		}

		resultMap.put("retCode","taskError");
		resultMap.put("retMsg", "잘못된 접근입니다.");
		request.setAttribute("resultMap", resultMap);
		return "/common/util/retAjax.jsp";
	}
}
