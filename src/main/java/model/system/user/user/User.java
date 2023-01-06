package model.system.user.user;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;

import javax.servlet.http.HttpServletRequest;

public @Getter @Setter class User extends BeanCommon{
	private String user_id;
	private String user_pass;
	private String name;
	private String position;
	private String tel;
	private String email;
	private String belong;
	private String role_id;

	public User() {}
	public User(HttpServletRequest request, String setName){super(request, setName);}
}
