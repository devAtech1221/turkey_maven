package model.system.master.standardProcess;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class StandardProcess extends BeanCommon{
	private String PROCESS_CD;
	private String PROCESS_NM;
	private String COMMENT;
	private String USE_YN;
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String CREATE_DT;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;
	private String UPDATE_DT;
	
	public StandardProcess() {}
	public StandardProcess(HttpServletRequest request, String setName){super(request, setName);}
}
