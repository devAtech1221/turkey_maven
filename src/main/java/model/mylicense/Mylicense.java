package model.mylicense;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import model.BeanCommon;
import model.main.Solution;
import model.system.user.user.User;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Date;

@ToString
@JsonIgnoreProperties(ignoreUnknown=true)
public @Getter @Setter class Mylicense extends BeanCommon{
	private String my_license_id;
	private String user_id;
	private User user;
	private String solution_id;
	private Solution solution;
	private String site_id;
	private String site_pass;
	private String site_url;
	private String start_date;
	private String end_date;
	private String license_type;
	private boolean status;

	/* Common */
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;

	public Mylicense() {}
	public Mylicense(HttpServletRequest request, String setName){super(request, setName);}
}
