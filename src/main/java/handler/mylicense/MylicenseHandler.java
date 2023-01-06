package handler.mylicense;

import common.Config;
import common.Message;
import common.MyUtil;
import control.CommonHandler;
import model.management.license.License;
import model.mylicense.Mylicense;
import model.mylicense.MylicenseDao;
import model.system.user.user.User;
import model.system.user.user.UserDao;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class MylicenseHandler extends CommonHandler{

	public String process(HttpServletRequest request, HttpServletResponse response) throws Throwable{

		if(task.equals("select")) {
			MylicenseDao DAO = MylicenseDao.getInstance();

			if(mode.equals("list")) {
				User user = new User(request,"data");
				List<Mylicense> mylicenseList = DAO.selectMylicenseList(user)
						.stream()
						.map(mylicense -> {
							//TODO 임시로 모든 라이선스는 체험을 기준으로 state 설정
							try {
								Date e_date = MyUtil.stringToDateYHD(mylicense.getEnd_date());
								Date now = MyUtil.stringToDateYHD(MyUtil.getTodayYMD());
								if(now.after(e_date)) {
									mylicense.setStatus(false);
								} else {
									mylicense.setStatus(true);
								}
							} catch (ParseException e) {
								System.out.println(e.getMessage());
								mylicense.setStatus(true);
							}

							return mylicense;
						}).collect(Collectors.toList());

				resultMap.put("data", mylicenseList);
				resultMap.put("resultCode", Message.INFO_SELECTLIST.getCode());
				resultMap.put("resultMessage", Message.INFO_SELECTLIST.getMsg());
				request.setAttribute("resultMap", resultMap);
				return retResult(request, resultMap);
			}

		} else if (task.equals("proc")) {
			MylicenseDao DAO = MylicenseDao.getInstance();

			if(mode.equals("editInfo")){
				User user = new User(request, "data");
				boolean success = DAO.editInfo(user);

				if(!success) {
					resultMap.put("resultCode", Message.FAIL.getCode());
					resultMap.put("resultMessage", Message.FAIL.getMsg());
					return retResult(request, resultMap);
				}

				resultMap.put("resultCode",Message.SUCCESS.getCode());
				resultMap.put("resultMessage", Message.SUCCESS.getMsg());
				request.setAttribute("resultMap", resultMap);
				return "/common/util/retAjax.jsp";

			} else if (mode.equals("editPass")) {
				User user = new User(request, "data");
				boolean success = DAO.editPass(user);

				if(!success) {
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
