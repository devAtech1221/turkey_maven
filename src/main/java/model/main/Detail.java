package model.main;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public @Getter @Setter class Detail extends BeanCommon{
	private String detail_id;
	private String contents;

	/* Common */
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;

	public Detail() {}
	public Detail(HttpServletRequest request, String setName){super(request, setName);}
}
