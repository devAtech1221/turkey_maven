package handler.management;

import common.*;
import common.mail.CustomFile;
import common.mail.MailDto;
import common.mail.SendMail;
import control.CommonHandler;
import model.management.question.Question;
import model.management.question.QuestionDao;
import model.system.user.auth.Auth;
import model.system.user.user.UserDao;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.stream.Collectors;

public class QuestionHandler extends CommonHandler{

	public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable{
		QuestionDao DAO = QuestionDao.getInstance();
		UserDao UserDAO = UserDao.getInstance();
		Logger logger = LoggerFactory.getLogger(QuestionHandler.class);

		if (task.equals(Config.sTask)) {
			if(mode.equals("list")){
				if (!MyUtil.authorization(request, Auth.ADMIN)) {
					resultMap.put("resultCode", Message.ERROR_AUTH.getCode());
					resultMap.put("resultMessage", Message.ERROR_AUTH.getMsg());
					return retResult(request, resultMap);
				}

				Paging paging = new Paging(request);
				paging.setSear(myUtil.null2Blank(request.getParameter("res_yn")).trim());
				MessageHandler mh = MessageHandler.getInstance();

				List<Question> questionList = DAO.selectQuestionList(paging).stream()
						.map(question -> {
							if (mh.equals("ko")) {
								question.setSolution_name(question.getSolution_name_ko());
							}
							return question;
						}).collect(Collectors.toList());

				paging.setNumberOfRecords(DAO.getNoOfRecords());
				paging.makePaging();

				if(questionList == null) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("last_page", (paging.getFinalPageNo() == 0) ? "1" : paging.getFinalPageNo());
				resultMap.put("data", questionList);
				resultMap.put("page", paging);
				resultMap.put("resultCode", Message.INFO_SELECTLIST.getCode());
				resultMap.put("resultMessage", Message.INFO_SELECTLIST.getMsg());
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";
			}

		} else if (task.equals(Config.pTask)) {
			if(mode.equals("insert")){
				Question question = new Question(request, "data");
				boolean success = DAO.insert(question);
				if(!success) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode",Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg());
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";

			} else if(mode.equals("sendMail")){
				if (!MyUtil.authorization(request, Auth.ADMIN)) {
					resultMap.put("resultCode", Message.ERROR_AUTH.getCode());
					resultMap.put("resultMessage", Message.ERROR_AUTH.getMsg());
					return retResult(request, resultMap);
				}

				// 메일 전송
				SendMail sendMail = SendMail.getInstance();
				mailDto.setMessage(sendMail.createMailHTML(mailDto));
				boolean success = sendMail.send(mailDto);

				if(!success) {
					resultMap.put("resultCode", Message.MAIL_TO_NOTFOUND.getCode());
					resultMap.put("resultMessage", Message.MAIL_TO_NOTFOUND.getMsg());
					return retResult(request, resultMap);
				}

				// 문의글 상태 변경
				boolean success2 = DAO.changeResYn(Question.STATUS_SUCCESS, mailDto.getQuestion_id());

				if(!success2) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode",Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg());
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";
			}
		}

		resultMap.put("resultCode","taskError");
		resultMap.put("retMsg", "잘못된 접근입니다.");
		request.setAttribute("resultMap", resultMap);
		return "/common/util/retAjax.jsp";
	}
}
