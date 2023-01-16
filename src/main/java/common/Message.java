package common;
/**
 * 
 * @author Kiyeon
 *
 */
public enum Message {
	// COMMON
	SUCCESS("00","응답이 정상적으로 이루어졌습니다."),
	FAIL("-1", "응답에 문제가 생겼습니다."),
	VALIDATION_ERROR("01","검증에 문제가 생겼습니다."),
	EMAIL_DUPL("02","이메일이 중복됩니다."),
	LOGIN_SUCCESS("03","로그인 성공"),
	LOGIN_FAIL("04","로그인 실패"),
	USER_DUPL("05","이미 계정이 존재합니다."),
	USER_MISS("05-2","라이선스를 지급하려면 사이트 계정이 필요합니다."),
	ID_DUPL("06","ID가 중복됩니다."),
	LOGOUT_SUCCESS("07","로그아웃에 성공했습니다."),
	MAIL_TO_NOTFOUND("08", "메일주소를 찾을 수 없습니다."),
	SERVER_ERROR("99","서버에 문제가 생겼습니다."),
	CHANGED_LANG("09", "이미 변경되었습니다."),

	// URL
	INFO_URL_CHECK("I0001","성공"),
	ERROR_URL_CHECK("E0001","INVALID URL"),
		
	// auth
	INFO_AUTH("I0101","성공"),
	ERROR_AUTH("E0101","권한이 없습니다."),
	
	// SELECT
	INFO_SELECT("I0201","성공"),
	ERROR_SELECT("E0201","실패"),
	
	// SELECT
	INFO_SELECTLIST("I0301","성공"),
	ERROR_SELECTLIST("E0301","리스트를 불러오지 못했습니다."),
	
	INFO_SELECTDOC("I0401","성공"),
	WARN_SELECTDOC("W0401","성공"),
	ERROR_SELECTDOC("E0401","문서를 불러오지 못했습니다. 문서번호: %1"),
	
	// 문서처리
	INFO_SAVEDOC("I0501","저장되었습니다. 문서번호: %1"),
	WARN_SAVEDOC("W0501","저장되었습니다. 문서번호: %1"),
	ERROR_SAVEDOC("E0501","저장하지 못했습니다. 문서번호: %1"),
	ERROR_SAVEDOC_ONLYMSG("E0501","저장하지 못했습니다"),
	
	INFO_UPDATEDOC_ONLYMSG("I0502","수정되었습니다."),
	INFO_UPDATEDOC("I0502","수정되었습니다. 문서번호: %1"),
	WARN_UPDATEDOC("W0502","수정되었습니다. 문서번호: %1"),
	ERROR_UPDATEDOC("E0502","수정하지 못했습니다. 문서번호: %1"),
	
	INFO_DELETEDOC("I0503","삭제되었습니다. 문서번호: %1"),
	INFO_DELETEDOC_ONLYMSG("I0503","삭제되었습니다."),
	WARN_DELETEDOC("W0503","수정되었습니다. 문서번호: %1"),
	ERROR_DELETEDOC("E0503","삭제하지 못했습니다. 문서번호: %1"),
	ERROR_DELETEDOC_ONLYMSG("E0503","삭제하지 못했습니다."),

//	사업센터 사업명 
	ERROR_BIZ_NM("E0504","제목은 100자 이하입니다."),
//	WARN_BIZ_NM("W0504","제목은 100자 이하입니다."),

	// MST
	
	
	// 재고관련
	ERROR_NOTPOSITIVENUM("E0601","양수만 입력가능합니다. 문서번호: %1, 행번호: %2"),
	ERROR_NOMAPPEDSTOCK("E0601","연계되어있는 재고가 없습니다. 문서번호: %1, 행번호: %2"),
	
	// 업로드
	INFO_UPLOAD("I0701","업로드되었습니다."),
	ERROR_UPLOAD("E0701","업로드에 실패했습니다."),
	
	// 다운로드
	INFO_DOWNLOAD("I0801","다운로드되었습니다."),
	ERROR_DOWNLOAD("E0801","다운로드에 실패했습니다."),
	ERROR_FILE_NOT_EXIST("E0801","파일이 존재하지 않습니다."),
	
	// 파일 삭제
	INFO_REMOVE("I0802", "제거되었습니다."),
	ERROR_REMOVE("E0802", "파일이 이미 제거되었거나, 파일 번호가 맞지 않습니다."),
	
	// INFO
	INFO_SAVE("I0901","저장되었습니다."),	
	INFO_UPDATE("I0902","수정되었습니다."),
	INFO_EXECUTE("I0903","처리되었습니다."),
	
	// LOGIN
	INFO_FINDPW("I1001","임시비밀번호가 발급되었습니다. 메일을 확인해주세요."),
	ERROR_PWBLANK("E1001","비밀번호를 입력해주세요."),
	ERROR_PWCONFIRM("E1002","'비밀번호'와 '비밀번호확인'란이 일치하지 않습니다."),
	ERROR_PW_RULE("E1003","비밀번호는 특수문자, 숫자, 영문 조합으로 이루어진 8~20 자리 값이어야 합니다."),
	ERROR_FINDPW_BLANK("E1004","ID와 이메일은 필수 값입니다."),
	ERROR_FINDPW_WORNG("E1005","사용자정보와 일치하지 않습니다."),
	ERROR_FINDPW_MAKEPW("E1006","임시비밀번호를 생성하는데 문제가 있습니다."),
	
	// FILE(EXCLE...)
	INFO_MAKEFILE("I1101", "파일생성완료"),
	ERROR_MAKEFILE("E1101", "파일생성에 문제가 있습니다."),
	
	// WARNNING
	WARN_SAVE_FAILED("W0001",""),
	WARN_BLANK_DETAIL("W0002","%1행의 [%2] 값을 입력해주세요."),
		
	// ERROR
	ERROR_TEST("E0001","테스트 에러메시지입니다."),
	ERROR_DB("E0002","DB오류입니다."),
	ERROR_NOT_EIXST_DATA("E0003","데이터가 존재하지 않습니다."),
	ERROR_WRONG_REQUEST("E0004","잘못된 접근입니다."),
//	ERROR_DB_TRIGGER("E0004","해당 BOM으로 등록된 정보가 없거나, 이미 취소되었습니다."),
	
	// CHECK STATUS
//	INFO_WORK_STAUTS("W0601","작업 완료된 항목은 취소할 수 없습니다."),
//	INFO_WORK_CANCEL_STAUTS("W0602","이미 취소 상태입니다.\n작업계획에서 상태를 확인하세요."),
//	INFO_PURCHASE_CANCEL_STAUTS("W0603","이미 취소 상태입니다.\n발주관리에서 상태를 확인하세요."),
//	INFO_PURCHASE_DONE_STAUTS("W0604","이미 입고 완료 상태입니다.\n입고관리에서 상태를 확인하세요."),
//	INFO_PURCHASE_EXIST("W0605","해당 BOM으로 등록된 발주 정보가 없습니다."),
//	INFO_WORK_EXIST("W0605","해당 BOM으로 등록된 생산 정보가 없습니다."),
	
	
	// NOTIFICATION
	MSG_DOC_INSERT("I9901", "<b>%1이(가) 등록되었습니다.</b><br>문서번호: %2"),
	MSG_DOC_UPDATE("I9902", "<b>%1이(가) 수정되었습니다.</b><br>문서번호: %2"),
	MSG_CALD_INSERT("I9903", "<b>%1이(가) 등록되었습니다.</b><br>%2"),
	MSG_CALD_UPDATE("I9904", "<b>%1이(가) 수정되었습니다.</b><br>%2"),
	MSG_CALD_COMPLETE("I9905", "<b>%1이 종료되었습니다.</b><br>%2"),
	MSG_CALD_COMPLETE_N("I9906", "<b>%1 종료가 취소되었습니다.</b><br>%2"),
	MSG_SR_INSERT("I9907", "<b><%1가 할당되었습니다.></b><br>*SR번호: %2<br>*업무: %3"),

	// BIZATECH - 사업관리
	STATUS_ON_MODIFYING("S0001", "수정 중인 상태입니다."),
	STATUS_OFF_MODIFYING("S0002","수정 상태가 아닙니다."),

	;
	
	private String code;
	private String msg;
	
	Message(String code, String msg){
		this.code = code;
		this.msg = msg;
	}
	
	public String getCode(){
		return code;
	}
	
	/**
	 * <br> msg만 출력할 땐 message.msg
	 * <br> msg 내 parameter 넣을 땐 message.getMsg(param1, param2 ... );
	 * @param params 메시지내 String parameter
	 * @return 메시지
	 **/
	public String getMsg(String ...params){
		if (msg == null || msg.trim().length() <= 0) return msg;
		if (params == null || params.length <= 0) return msg;
	
		String[] splitMsgs = msg.split("%");
		if (splitMsgs == null || splitMsgs.length <= 1) return msg;
		
		String returnMsg = msg;
		for (int i = 0; i < params.length; i++) {
			String replaceChar = "%" + (i + 1);
			returnMsg = returnMsg.replaceFirst(replaceChar, params[i]);
		}
		
		return returnMsg;
	}
}
