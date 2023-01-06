package model.system.user.auth;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class AuthDetail extends BeanCommon{
	private String AUTH_CD;
	private String MENU1_CD;
	private String MENU2_CD;
	private String MENU3_CD;
	private String SELECT_YN;
	private String UPDATE_YN;
	private String NOTI_YN;
	
	private String CREATE_ID;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_DTM;
	
	public AuthDetail() {}
	public AuthDetail(HttpServletRequest request, String setName){super(request, setName);}
}
