package model.system.customer.outsourcing;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class Outsourcing extends BeanCommon /* implements BeanInterface */{
//	private String SEQ;
	private String CUST_CD;
	private String CUST_NM;
	private String CUST_TYPE;
	private String REGI_NO;
	private String CEO;
	private String MANAGER;
	private String CELL_NO;
	private String EMAIL;
	private String FAX_NO;
	private String ADDRESS;
	private String SORT_SEQ;
	private String USE_YN;
	private String COMMENT;
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;
	
	public Outsourcing() {}
	public Outsourcing(HttpServletRequest request, String setName){super(request, setName);}
}
