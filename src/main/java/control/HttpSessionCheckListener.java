package control;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class HttpSessionCheckListener implements HttpSessionListener {

    public void sessionCreated(HttpSessionEvent event) {
    	// System.out.println("Session ID".concat(event.getSession().getId()).concat(" created at ").concat(new Date().toString()));
    	
    	// 1. session이 생성될 경우 필요한 작업
    }

    public void sessionDestroyed(HttpSessionEvent event) {
        // System.out.println("Session ID".concat(event.getSession().getId()).concat(" destroyed at ").concat(new Date().toString()));
    	
    	// 1. session이 제거될 경우 필요한 작업
    }
}