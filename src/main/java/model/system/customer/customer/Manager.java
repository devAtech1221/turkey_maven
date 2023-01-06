package model.system.customer.customer;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class Manager extends BeanCommon{
//	private String SEQ;
	private String CUST_CD;
	private String MANAGER_SEQ;
	private String MANAGER_NM;
	private String DEPT_NM;
	private String RANK_NM;
	private String CELL_NO;
	private String EMAIL;
	private String DEFAULT_YN;
	private String USE_YN;
	private String COMMENT;
	private String CREATE_ID;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_DTM;
	
	public Manager() {}
	public Manager(HttpServletRequest request, String setName){super(request, setName);}
}
