package model.log;

import lombok.Getter;
import lombok.Setter;

public @Getter @Setter class AutoAccess {
	private String SEQ;
	private String ACCESS_TOKEN;
	private String ACCESS_IP;
	private String ACCESS_USER;
	private String LAST_ACCESS_DATE;
	private String USER_AGENT;
	private String IS_MOBILE;
}
