package model.main;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class LicenseInfo extends BeanCommon{
	private String license_id;
	private String basic;
	private String premium;
	private String custom;
	private String type;

	/* Common */
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;

	public LicenseInfo() {}
	public LicenseInfo(HttpServletRequest request, String setName){super(request, setName);}
}
