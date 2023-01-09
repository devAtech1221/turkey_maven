package model.log;

import common.AES256Util;
import common.Config;
import model.system.user.user.User;
import model.system.user.user.UserDao;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AuthCheck {
	private String uID;
	private String uNAME;
	private String uAGENT;
	private String _cookie_id;
	private String _cookie_token;
	private String is_mobile;

	public AuthCheck(){}

	/*
	 * Login status check
	 * 0 : require login, 
	 * 1 : login ok, 
	 * 2 : retirement
	 */
	public int LoginCheck(HttpServletRequest request, HttpServletResponse response) throws Throwable{
		HttpSession session = request.getSession();

		uID = (String)session.getAttribute("U_ID");
		uNAME = (String)session.getAttribute("U_NAME");
		uAGENT = request.getHeader("User-Agent");
		is_mobile = "N";
		
		if(uID == null || uNAME == null || uID.equals("") || uNAME.equals("")){
			getCookieOfToken(request);
			
			if(_cookie_token == null || _cookie_id == null){
				return 0;
			}

		}
//		else{
//			UserDao userDao = UserDao.getInstance();
//			User user = userDao.selectDoc(uID);
//			if(user == null){ return 0; }
//		}
		
		return 1;
	}

	/*
     * 쿠키 정보에서 token과 id정보를 가져와서 AuthCheck 변수에 저장
	 */
	private void getCookieOfToken(HttpServletRequest request){
		Cookie[] cookies = request.getCookies();
		if(cookies != null){
			for(Cookie c : cookies){
				String cName = c.getName();
				if(cName.equals("token")){ _cookie_token = c.getValue(); }
				if(cName.equals("userid")){ _cookie_id = c.getValue(); }
			}
		}
	}

	/* 모든 로그인 전단계를 통화 한 후 마지막 로그인 처리.. */
	/* log_type : A = 자동로그인, M = 아이디/비번으로 로그인 */
	public void setSessionForLogin(User user, String isAuto, HttpServletRequest request){
		HttpSession session = request.getSession();
		LogDao logDao = LogDao.getInstance();
		LogAccess logAccess = new LogAccess();
		LogLogin logLogin = new LogLogin();

		session.setAttribute("U_ID", user.getUser_id());
		session.setAttribute("U_NAME", user.getName());

		logAccess.setSESSION_KEY(session.getId());
		logAccess.setREF_URL(request.getHeader("referer"));
		logAccess.setUSER_IP(request.getRemoteAddr());
		logAccess.setUSER_AGENT(request.getHeader("User-Agent"));
		logAccess.setUSER_STATUS("Y");

		logLogin.setUSER_ID(user.getRole_id());
		logLogin.setUSER_NM(user.getName());
		logLogin.setUSER_IP(request.getRemoteAddr());
	}

}

