package model.system.user.auth;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class Auth extends BeanCommon{

	final static public String ADMIN = "1";
	final static public String NORMAL = "2";
	final static public String ANONYMOUS = "3";

//	private String SEQ;
	private String AUTH_CD;
	private String AUTH_NM;
	private String SORT_SEQ;
	private String USE_YN;
	private String COMMENT;
	private String CREATE_ID;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_DTM;
	
	public Auth() {}
	public Auth(HttpServletRequest request, String setName){super(request, setName);}
}
