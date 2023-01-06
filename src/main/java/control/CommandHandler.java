package control;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public interface CommandHandler {
	String processPage(HttpServletRequest request, HttpServletResponse response) throws Throwable;
	String process(HttpServletRequest request, HttpServletResponse response) throws Throwable;
}
