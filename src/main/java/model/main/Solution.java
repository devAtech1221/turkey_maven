package model.main;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@ToString
public @Getter @Setter class Solution extends BeanCommon{
	private String solution_id;
	private String solution_name;
	private String solution_name_ko;
	private List<Detail> detail;
	private List<LicenseInfo> license;

	/* Common */
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;
	
	public Solution() {}
	public Solution(HttpServletRequest request, String setName){super(request, setName);}
}
