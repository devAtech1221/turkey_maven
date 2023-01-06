package model.system.user.department;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class Department extends BeanCommon{
	private String MST1_CD;
	private String MST2_CD;
	private String MST3_CD;
	private String MST_SEQ;
	private String MST_NM;
	private String SORT_SEQ;
	private String USE_YN;
	private String COMMENT;
	
	private String CREATE_ID;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_DTM;
	
	public Department() {}
	public Department(HttpServletRequest request, String setName){super(request, setName);}
}
