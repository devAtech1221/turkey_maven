package control;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import common.*;
import common.mail.CustomFile;
import common.mail.MailDto;
import model.log.AuthCheck;
import model.main.MainDao;
import model.mylicense.Mylicense;
import model.system.master.menu.Menu;
import model.system.master.menu.MenuDao;
import model.system.user.user.User;
import model.system.user.user.UserDao;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CommonHandler implements CommandHandler {
    public MyUtil myUtil = new MyUtil();
    public BeansUtil beansUtil = new BeansUtil();
    public HashMap<String, Object> resultMap = new HashMap<String, Object>();
    public String task, mode, uid;
    public MailDto mailDto = new MailDto();

    /*
     * init
     */
    protected String init(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();

        try {
            task = myUtil.null2Blank(request.getParameter("task")).trim();
            mode = myUtil.null2Blank(request.getParameter("mode")).trim();
            uid = (String) session.getAttribute("U_ID");
            request.setAttribute("U_ID", uid);

            // 메일 전송일 경우 MailDto 설정
            if(request.getContentType() != null) {
                if(request.getContentType().substring(0, request.getContentType().indexOf(";")).equals("multipart/form-data")) {
                    settingMailDto(request);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("resultCode", "initError");
            resultMap.put("resultMessage", "Request or Response Error On Init");
            return retResult(request, resultMap);
        }
        return null;
    }

    /*
     * checkAuthPage
     */
    protected String checkAuthPage(HttpServletRequest request, HttpServletResponse response) {
        if (!checkAuthSelect(request, response)) {
            HttpSession session = request.getSession();
            session.invalidate();
            return Config.viewLogin;
        }
        return null;
    }

    /*
     * checkAuthSelect
     */
    protected boolean checkAuthSelect(HttpServletRequest request, HttpServletResponse response) {
        return checkAuth(request, response, Config.sTask);
    }

    /*
     * checkAuthProc
     */
    protected boolean checkAuthProc(HttpServletRequest request, HttpServletResponse response) {
        return checkAuth(request, response, Config.pTask);
    }

    /*
     * checkAuth
     */
    protected boolean checkAuth(HttpServletRequest request, HttpServletResponse response, String type) {
        try {
            HttpSession session = request.getSession();

            /* session check */
            uid = (String) session.getAttribute("U_ID");
            User user = UserDao.getInstance().selectDoc(uid);
            if (user != null) {
                request.setAttribute("USER", user);
                request.setAttribute("U_ID", uid);
                request.setAttribute("U_NM", user.getName());
            }

        } catch (Throwable e) {
            e.printStackTrace();
        }
        return true;
    }

    /*
     * process
     */
    @Override
    public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable {
        return null;
    }

    /*
     * processPage
     */
    @Override
    public String processPage(HttpServletRequest request, HttpServletResponse response) throws Throwable {
        /*  route */
        boolean isAjax = (boolean) request.getAttribute("isAjax");
        if (!isAjax) {
            if (checkAuthPage(request, response) != null) {
                return Config.viewLogin;
            }
        } else {
            if (task.equals(Config.sTask)) {
                if (!checkAuthSelect(request, response)) {
                    return retResult(request, resultMap);
                }
            } else {
                if (!checkAuthProc(request, response)) {
                    return retResult(request, resultMap);
                }
            }
        }

        /* menu */
        String handlerURI = (String) request.getAttribute("handlerURI");
        String requestURI = (String) request.getAttribute("requestURI");
        String hdlrURI = handlerURI;
        MenuDao DAO = Controller.menuDao;
        User user = (User) request.getAttribute("USER");
        List<Menu> menuList = null;
        MessageHandler mh = MessageHandler.getInstance();

        if(user == null) {
            // 익명
            menuList = DAO.selectAuthMenuList("3");
        } else {
            menuList = DAO.selectAuthMenuList(user.getRole_id());
        }

        menuList = menuList.stream().map(menu -> {
            if (mh.equals("ko")) {
                menu.setMENU_NM(menu.getMENU_NM_KO());
            }

            return menu;
        }).collect(Collectors.toList());

        Menu level1Menu = DAO.getMenu1ByURL(hdlrURI);
        Menu level2Menu = DAO.getMenu2ByURL(hdlrURI);
        Menu level3Menu = DAO.getMenu3ByURL(hdlrURI);
        if (level1Menu == null && level2Menu != null) {
            level1Menu = DAO.getMenu1ByInfo(level2Menu);
        } else if (level3Menu != null) {
            level2Menu = DAO.getMenu2ByInfo(level3Menu);
            level1Menu = DAO.getMenu1ByInfo(level2Menu);
        }
        request.setAttribute("MENU", menuList);
        request.setAttribute("MENU1", level1Menu);
        request.setAttribute("MENU2", level2Menu);
        request.setAttribute("MENU3", level3Menu);

        // 접근하는 url에 권한 체크
        Optional<Menu> AuthMenu = menuList.stream()
                .filter(menu -> {
                  if(menu.getMENU_URL().equals(requestURI)) {
                      return true;
                  } else if (user == null && requestURI.equals("/login/Login.do")) {
                      return true;
                  } else if (user == null && requestURI.equals("/join/Join.do")) {
                      return true;
                  }
                    return false;
                })
                .findFirst();

        if (!AuthMenu.isPresent()) {
            return "/common/util/nullCommand.jsp";
        }

        /* view match(view ↔ handler) */
        String reqURI = Config.viewPath;
        try {
            String[] arrURI = requestURI.split("/");
            int leng = arrURI.length - 1;
            String lowerChar = arrURI[leng].substring(0, 1).toLowerCase();
            arrURI[leng] = lowerChar + arrURI[leng].substring(1, arrURI[leng].length());
            for (String str : arrURI) {
                if (str == null || str.equals("")) {
                    continue;
                }
                reqURI += "/" + str;
            }
        } catch (Exception e) {
            resultMap.put("resultCode", Message.ERROR_SELECTLIST.getCode());
            resultMap.put("resultMessage", Message.ERROR_SELECTLIST.getMsg());
            return retResult(request, resultMap);
        }

        // no cache
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setHeader("Expires", "0"); // Proxies.

        request.setAttribute("reqURI", reqURI);
        request.setAttribute("requestURI", requestURI);
        return reqURI.replace(".do", "/") + "page.jsp";
    }

    /*
     * retPage
     */
    public String retPage(HttpServletRequest request, HashMap<String, Object> rltMap, String page) {
        request.setAttribute("resultMap", resultMap);
        return page;
    }

    /*
     * retResult
     */
    public String retResult(HttpServletRequest request, HashMap<String, Object> rltMap) {
        request.setAttribute("resultMap", resultMap);
        return "/common/util/retAjax.jsp";
    }

    /*
     * retResultList
     */
    public String retResultList(HttpServletRequest request, Object rltMapList) {
        request.setAttribute("resultMap", rltMapList);
        return "/common/util/retArrayJson.jsp";
    }

    private void settingMailDto(HttpServletRequest request) throws FileUploadException, IOException, ServletException {
        ServletFileUpload servletFileUpload = new ServletFileUpload(new DiskFileItemFactory());
        servletFileUpload.setHeaderEncoding("utf-8");
        List<FileItem> items = servletFileUpload.parseRequest(request);
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.READ_UNKNOWN_ENUM_VALUES_AS_NULL, true);

        for (FileItem item : items) {
            String encString = new String(item.getString().getBytes("8859_1"), "utf-8");
            if (item.isFormField()) {
                if(item.getFieldName().equals("task")) task = myUtil.null2Blank(encString);
                else if(item.getFieldName().equals("mode")) mode = myUtil.null2Blank(encString);
                else if(item.getFieldName().equals("mail_title")) mailDto.setMail_title(encString);
                else if (item.getFieldName().equals("message")) mailDto.setMessage(encString);
                else if (item.getFieldName().equals("to")) mailDto.setTo(encString);
                else if (item.getFieldName().equals("question_id")) mailDto.setQuestion_id(encString);
                else if (item.getFieldName().equals("license_question_id")) mailDto.setLicense_question_id(encString);
                else if (item.getFieldName().equals("mylicense_json")) {
                    Mylicense mylicense = mapper.readValue(encString, Mylicense.class);
                    mailDto.setMylicense(mylicense);
                }

            } else {
                CustomFile customFile = new CustomFile();
                customFile.setFileName(FilenameUtils.getName(item.getName()));
                customFile.setInputStream(item.getInputStream());
                mailDto.setFiles(customFile);
            }
        }
    }
}
