package model.log;

import lombok.Getter;
import lombok.Setter;

public @Getter @Setter class LogAccess {
	private String SEQ;
	private String SESSION_KEY;
	private String REF_URL;
	private String USER_IP;
	private String USER_AGENT;
	private String USER_STATUS;
	private String IS_AUTO;
	private String REGI_DATE;
}
