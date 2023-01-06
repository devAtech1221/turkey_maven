package model.system.customer.customer;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class Bank extends BeanCommon{
	private String CUST_CD;
	private String BANK_SEQ;
	private String BANK_NM;
	private String ACC_NO;
	private String ACC_NM;
	private String USE_YN;
	
	private String COMMENT;
	private String CREATE_ID;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_DTM;
	
	public Bank() {}
	public Bank(HttpServletRequest request, String setName){super(request, setName);}
}
