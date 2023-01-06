package handler.management;

import common.Config;
import common.Message;
import common.Paging;
import common.mail.SendMail;
import control.CommonHandler;
import model.main.MainDao;
import model.main.Solution;
import model.management.license.License;
import model.management.license.LicenseDao;
import model.management.question.Question;
import model.mylicense.Mylicense;
import model.mylicense.MylicenseDao;
import model.system.user.user.User;
import model.system.user.user.UserDao;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class LicenseHandler extends CommonHandler{

	public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable{
		LicenseDao DAO = LicenseDao.getInstance();
		UserDao userDao = UserDao.getInstance();
		MylicenseDao mylicenseDao = MylicenseDao.getInstance();
		Logger logger = LoggerFactory.getLogger(LicenseHandler.class);

		if (task.equals(Config.sTask)) {
			if(mode.equals("list")){
				Paging paging = new Paging(request);
				paging.setSear(myUtil.null2Blank(request.getParameter("res_yn")).trim());

				List<License> licenseList = DAO.selectLicenseList(paging)
						.stream()
						.map(license -> {
							User user = userDao.selectDoc(license.getUser_id());
							user.setUser_pass(null);
							license.setUser(user);

							return license;
						}).collect(Collectors.toList());

				paging.setNumberOfRecords(DAO.getNoOfRecords());
				paging.makePaging();

				if(licenseList == null) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("last_page", (paging.getFinalPageNo() == 0) ? "1" : paging.getFinalPageNo());
				resultMap.put("data", licenseList);
				resultMap.put("page", paging);
				resultMap.put("resultCode", Message.INFO_SELECTLIST.getCode());
				resultMap.put("resultMessage", Message.INFO_SELECTLIST.getMsg());
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";
			}

		} else if (task.equals(Config.pTask)) {
			if(mode.equals("insert")){
				License license = new License(request, "data");
				logger.info("license {} :",license);
				boolean success = DAO.insert(license);
				if(!success) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode",Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg());
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";

			} else if(mode.equals("createLicense")){

				// 메일 전송
				SendMail sendMail = SendMail.getInstance();
				mailDto.setMessage(sendMail.createLicenseHTML(mailDto.getMylicense(),mailDto));
				boolean success = sendMail.send(mailDto);

				if(!success) {
					resultMap.put("resultCode", Message.MAIL_TO_NOTFOUND.getCode());
					resultMap.put("resultMessage", Message.MAIL_TO_NOTFOUND.getMsg());
					return retResult(request, resultMap);
				}

				// 문의글 상태 변경
				boolean success2 = DAO.changeResYn(Question.STATUS_SUCCESS, mailDto.getLicense_question_id());

				if(!success2) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				// 마이 라이선스 추가
				// 1) 시작날짜 ~ 종료날짜 계산 (체험상품 기준)
				// TODO 라이선스 종류별로 날짜 계산
				Mylicense mylicense = mailDto.getMylicense();
				LocalDateTime startDate = LocalDateTime.now();
				LocalDateTime endDate = startDate.plusDays(15L);
				mylicense.setStart_date(startDate.toString());
				mylicense.setEnd_date(endDate.toString());

				// 2) 라이선스 추가
				boolean success3 = mylicenseDao.insert(mylicense);

				if(!success3) {
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
