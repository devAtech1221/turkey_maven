package handler.management;

import common.*;
import common.mail.SendMail;
import control.CommonHandler;
import model.main.MainDao;
import model.main.Solution;
import model.management.license.License;
import model.management.license.LicenseDao;
import model.management.question.Question;
import model.mylicense.Mylicense;
import model.mylicense.MylicenseDao;
import model.system.user.auth.Auth;
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
		Logger logger = LoggerFactory.getLogger(LicenseHandler.class);

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

				List<License> licenseList = DAO.selectLicenseList(paging)
						.stream()
						.map(license -> {
							if (mh.equals("ko")) {
								license.setSolution_name(license.getSolution_name_ko());
							}

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

			}if(mode.equals("mylist")) {

				if (!MyUtil.authorization(request, Auth.NORMAL, Auth.ADMIN)) {
					resultMap.put("resultCode", Message.ERROR_AUTH.getCode());
					resultMap.put("resultMessage", Message.ERROR_AUTH.getMsg());
					return retResult(request, resultMap);
				}

				User user = new User(request,"data");
				MessageHandler mh = MessageHandler.getInstance();

				List<License> licenseList = DAO.selectLicenseListById(user)
						.stream()
						.map(license -> {
							if (mh.equals("ko")) {
								license.setSolution_name(license.getSolution_name_ko());
							}

							//TODO 임시로 모든 라이선스는 체험을 기준으로 state 설정
//							try {
//								Date e_date = MyUtil.stringToDateYHD(mylicense.getEnd_date());
//								Date now = MyUtil.stringToDateYHD(MyUtil.getTodayYMD());
//								if(now.after(e_date)) {
//									mylicense.setStatus(false);
//								} else {
//									mylicense.setStatus(true);
//								}
//							} catch (ParseException e) {
//								System.out.println("Error[MylicenseHandler] : select : list : " + e.toString());
//								mylicense.setStatus(true);
//							}

							return license;
						}).collect(Collectors.toList());

				resultMap.put("data", licenseList);
				resultMap.put("resultCode", Message.INFO_SELECTLIST.getCode());
				resultMap.put("resultMessage", Message.INFO_SELECTLIST.getMsg());
				request.setAttribute("resultMap", resultMap);
				return retResult(request, resultMap);
			}

		} else if (task.equals(Config.pTask)) {
			if(mode.equals("insert")){
				if (!MyUtil.authorization(request, Auth.NORMAL,Auth.ADMIN)) {
					resultMap.put("resultCode", Message.ERROR_AUTH.getCode());
					resultMap.put("resultMessage", Message.ERROR_AUTH.getMsg());
					return retResult(request, resultMap);
				}

				License license = new License(request, "data");
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
				if (!MyUtil.authorization(request, Auth.ADMIN)) {
					resultMap.put("resultCode", Message.ERROR_AUTH.getCode());
					resultMap.put("resultMessage", Message.ERROR_AUTH.getMsg());
					return retResult(request, resultMap);
				}

				// 메일 전송
//				SendMail sendMail = SendMail.getInstance();
//				mailDto.setMessage(sendMail.createLicenseHTML(mailDto.getMylicense(),mailDto));
//				boolean success = sendMail.send(mailDto);
//
//				if(!success) {
//					resultMap.put("resultCode", Message.MAIL_TO_NOTFOUND.getCode());
//					resultMap.put("resultMessage", Message.MAIL_TO_NOTFOUND.getMsg());
//					return retResult(request, resultMap);
//				}

				// 문의글 상태 변경
				boolean success2 = DAO.changeResYn(Question.STATUS_APPROVAL, mailDto.getLicense_question_id());

				if(!success2) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				// 마이 라이선스 추가
				// 1) 시작날짜 ~ 종료날짜 계산 (체험상품 기준)
				// TODO 라이선스 종류별로 날짜 계산
				License license = mailDto.getLicense();
				LocalDateTime startDate = LocalDateTime.now();
				LocalDateTime endDate = startDate.plusDays(30L);
				license.setStart_date(startDate.toString());
				license.setEnd_date(endDate.toString());
				license.setLicense_question_id(mailDto.getLicense_question_id());

				boolean success3 = DAO.update(license);

				if(!success3) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode",Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg());
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";

			} else if(mode.equals("changeResYn")) {
				if (!MyUtil.authorization(request,Auth.ADMIN)) {
					resultMap.put("resultCode", Message.ERROR_AUTH.getCode());
					resultMap.put("resultMessage", Message.ERROR_AUTH.getMsg());
					return retResult(request, resultMap);
				}

				License license = new License(request, "data");
				boolean success = DAO.changeResYn(license.getRes_yn(),license.getLicense_question_id());
				if (!success) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode", Message.SUCCESS.getCode());
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
