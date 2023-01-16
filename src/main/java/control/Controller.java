package control;

import model.log.LogAccess;
import model.log.LogDao;
import model.system.master.menu.Menu;
import model.system.master.menu.MenuDao;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

public class Controller extends HttpServlet {
    private static final long serialVersionUID = -8259247044212305195L;
    private ServletConfig config;
    private String contextName;
    public static List<Menu> G_menuList = null;
    public static MenuDao menuDao = MenuDao.getInstance();

    public void init(ServletConfig config) throws ServletException {
        this.contextName = config.getInitParameter("ContextName");
        G_menuList = menuDao.selectMenuList();

        super.init(config);
    }

    // GET REQUEST
    public void doGet( HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    // POST REQUEST
    protected void doPost( HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    // Actual controller with GET or POST REQUEST
    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String contextPath = request.getContextPath();
        String xReqWith = request.getHeader("X-Requested-With");
        String handlerPackage = null;
        String viewPage = null;

        String requestURI = request.getRequestURI();
        String handlerURI = requestURI.substring(contextPath.length());
        request.setAttribute("requestURI", requestURI);
        request.setAttribute("handlerURI", requestURI.substring(contextPath.length()));

        boolean isMobile = false;
        String userAgent = request.getHeader("User-Agent").toUpperCase();
        if(userAgent.indexOf("MOBI") > -1){ isMobile = true; }

        boolean isAjax = false;
        if(xReqWith!=null && (xReqWith.toLowerCase().equals("xmlhttprequest") || request.getHeader("ORIGIN")!=null)){ isAjax = true; }

        if(!isAjax) {
            LogDao logDao = new LogDao();
            LogAccess logAccess = new LogAccess();
            logAccess.setSESSION_KEY(session.getId());
            logAccess.setREF_URL(request.getHeader("referer"));
            logAccess.setUSER_IP(request.getRemoteAddr());
            logAccess.setUSER_AGENT(request.getHeader("User-Agent"));
        }
        request.setAttribute("contextName", contextName);
        request.setAttribute("isAjax", isAjax);
        request.setAttribute("isMobile", isMobile);

        int hdlrLastIdx = handlerURI.lastIndexOf("/");
        handlerPackage = (hdlrLastIdx > 1) ? (handlerURI.substring(1, hdlrLastIdx)).replaceAll("/", ".") : "main";

        CommonHandler handler = null;
        @SuppressWarnings("rawtypes")
        Class handlerClass = null;
        StringBuffer handlerClassName = new StringBuffer();

        if(hdlrLastIdx != -1){
            handlerClassName.append("handler."+handlerPackage + ".");

            int startIndex = hdlrLastIdx + 1;
            int endIndex = handlerURI.lastIndexOf(".");
            handlerClassName.append((endIndex > 1) ? (handlerURI.substring(startIndex, endIndex)) + "Handler" : "mainHandler");

            try{
                handlerClass = Class.forName(handlerClassName.toString());
                handler = (CommonHandler)handlerClass.newInstance();

            }catch(ClassNotFoundException e){
                handler = new NullHandler();
                System.out.println("ClassNotFoundException : " + e);
            }catch(InstantiationException e){
                handler = new NullHandler();
                System.out.println("InstantiationException : " + e);
            }catch(IllegalAccessException e){
                handler = new NullHandler();
                System.out.println("IllegalAccessException : " + e);
            }
        }else{
            handler = new NullHandler();
        }

        try{
            handler.init(request, response);
            viewPage = (isAjax) ? handler.process(request, response) : handler.processPage(request, response);
        }catch(Throwable e){
            System.out.println(e);
            throw new ServletException(e);
        }

        RequestDispatcher dispatcher = request.getRequestDispatcher(viewPage);
        dispatcher.forward(request, response);
    }
}
