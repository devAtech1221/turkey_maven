package model.system.master.pipeline;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class Pipeline extends BeanCommon{
	private String PIPELINE_CD;
	private String PIPELINE_NM;
	private String PIPELINE_DTL_CD;
	private String PROCESS_CD;
	private String PROCESS_NM;
	private String USE_YN;
	private String COMMENT;
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;
	
	public Pipeline() {}
	public Pipeline(HttpServletRequest request, String setName){super(request, setName);}
}
