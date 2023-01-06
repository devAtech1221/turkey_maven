package model.management.license;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import model.BeanCommon;
import model.main.Detail;
import model.main.LicenseInfo;
import model.system.user.user.User;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@ToString
public @Getter @Setter class License extends BeanCommon{
	private String license_question_id;
	private String solution_id;
	private String solution_name;
	private String user_id;
	private User user;
	private String title;
	private String contents;
	private String res_yn;
	private String license_type;

	/* Common */
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;

	public License() {}
	public License(HttpServletRequest request, String setName){super(request, setName);}
}
