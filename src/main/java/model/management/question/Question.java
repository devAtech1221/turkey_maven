package model.management.question;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import model.BeanCommon;
import model.main.Solution;
import model.system.user.user.User;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ToString
public @Getter @Setter class Question extends BeanCommon{
	public final static String STATUS_ALL = "ALL";
	public final static String STATUS_NEW = "NEW";
	public final static String STATUS_SUCCESS = "SUCCESS";
	public final static String STATUS_APPROVAL = "APPROVAL";
	public final static String STATUS_EXPIRATION  = "EXPIRATION";
	public final static String STATUS_DELETE = "DELETE";

	private String question_id;
	private String solution_id;
	private String solution_name;
	private String solution_name_ko;
	private String belong;
	private String name;
	private String position;
	private String tel;
	private String email;
	private String title;
	private String contents;
	private String res_yn;

	/* Common */
	private String CREATE_ID;
	private String CREATE_NM;
	private String CREATE_DTM;
	private String UPDATE_ID;
	private String UPDATE_NM;
	private String UPDATE_DTM;

	public Question() {}
	public Question(HttpServletRequest request, String setName){super(request, setName);}
}
