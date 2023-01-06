package control;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class NullHandler extends CommonHandler implements CommandHandler {

	@Override
	public String processPage(HttpServletRequest request, HttpServletResponse response) throws Throwable {
		return "/common/util/nullCommand.jsp";
	}
	
    public String process(HttpServletRequest request,HttpServletResponse response) throws ServletException {
        return "/common/util/nullCommand.jsp";
    }

	
}
