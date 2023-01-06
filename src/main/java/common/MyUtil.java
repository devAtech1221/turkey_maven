package common;

import org.apache.commons.validator.GenericValidator;
import org.apache.commons.validator.routines.UrlValidator;

import java.lang.reflect.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

;

public class MyUtil {
	
	/* null이니? */
	public boolean isNull(String str) {
		if(str == null) return true;
		return false;
	}
	
	/* null이나 blank니? */
	public boolean isNullOrBlank(String str) {
		if(str == null) return true;
		if(str == "") return true;
		return false;
	}
	
	/* null을 ""로 변환 */
	public String null2Blank(String str){
		String strTmp;
		if(str == null) strTmp = "";
		else strTmp = str;
		
		return strTmp;
	}

	/* null을 0로 변환 */
	public String null2Zero(String str){
		String strTmp;
		if(str == null) strTmp = "0";
		else strTmp = str;
		
		return strTmp;
	}

	/* 공백을 &nbsp;로 변환 */
	public String null2Nbsp(String str){
		String strTmp;
		if(str == null || str.equals("")) strTmp = "&nbsp;";
		else strTmp = str;
		
		return strTmp;
	}

	/* TextArea에서 입력받은 캐리지 리턴값을 <BR>태그로 변환 */
	public String nl2br(String comment){
		int length = comment.length();
		StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < length; ++i){
			String comp = comment.substring(i, i+1);
			if ("\r".compareTo(comp) == 0){
				comp = comment.substring(++i, i+1);
				if ("\n".compareTo(comp) == 0) buffer.append("<BR />\r");
				else buffer.append("\r");
			}
			buffer.append(comp);
		}
		return buffer.toString();
	}

	/* TextArea에서 입력받은 따옴표 앞에 \' 추가 */
	public String addslash(String comment){
		if(comment == null) return "";

		int length = comment.length();
		StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < length; ++i){
			String comp = comment.substring(i, i+1);
			if("'".compareTo(comp) == 0) buffer.append("\'");
			buffer.append(comp);
		}
		return buffer.toString();
	}

	/* TextArea에서 입력받은 < or > 를 특수문자로 변환 */
	public String html2spec(String comment){
		if(comment == null) return "";

		int length = comment.length();
		StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < length; ++i){
			String comp = comment.substring(i, i+1);
			if("<".compareTo(comp) == 0) buffer.append("&lt;");
			else if(">".compareTo(comp) == 0) buffer.append("&gt;");
			else buffer.append(comp);
		}
		return buffer.toString();
	}

	/* 공백 추가 */
	public String spaceadd(String addstr){
		if(addstr == null) return "";
		int length = addstr.length();
		StringBuffer buffer = new StringBuffer();

		for(int k=0; k<length; ++k){
			String comp = addstr.substring(k, k+1);
			if(" ".compareTo(comp) == 0) buffer.append("&nbsp;");

			buffer.append(comp);
		}
		return buffer.toString();
	}

	/* Html문자로 변환처리 */
	public String spec2html(String comment){
		String strHtml = new String();
		if(comment == null) return "";

		StringBuffer buffer = new StringBuffer();
		strHtml = comment.replaceAll("&lt;","<");
		strHtml = strHtml.replaceAll("&gt;",">");

		buffer.append(strHtml);
		return buffer.toString();
	}

	/**
	 * 해당 String 값이 숫자인지 확인합니다.
	 * @param str 문자열
	 * @return (boolean) numeric일 경우 true, 아닐 경우 false
	 */
	public static boolean isNumeric(String str){
		try{
			double d = Double.parseDouble(str);
		}
		catch(Exception e){
			return false;
		}
		return true;
	}

	/* Comment : 정상적인 이메일 인지 검증 */
	public static boolean isValidEmail(String email) {
		boolean err = false;
		String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";   
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(email);

		if(m.matches()) err = true; 

		return err;
	}	 

	/* Comment : 정상적인 URL 인지 검증 */
	public static boolean isValidURL(String URL) {
		boolean err = false;
		String[] schemes = {"http","https"}; // DEFAULT schemes = "http", "https", "ftp"
		UrlValidator urlValidator = new UrlValidator(schemes);

		if(urlValidator.isValid(URL)) err = true;

		return err;
	}

	/* target 이 min max 사이에 있는 값인지 확인 */
	public static boolean isExistRange(Double target, Double min, Double max){
		boolean err = false;

		if(GenericValidator.isInRange(target, min, max)) err = true;

		return err;
	}

	/* target 이 Double로 변경 가능한지 확인 */
	public static boolean isDouble(String target){
		boolean err = false;

		if(GenericValidator.isDouble(target)) err = true;

		return err;
	}

	/* 날짜 포맷 */
	public static String getThisYear2Digit(){
		SimpleDateFormat ySD = new SimpleDateFormat("yy");
		return ySD.format(new Date());
	}
	public static String getThisYear4Digit(){
		SimpleDateFormat yySD = new SimpleDateFormat("yyyy");
		return yySD.format(new Date());
	}
	public static String getTodayYMD(){
		SimpleDateFormat yyMDSD = new SimpleDateFormat("yyyy/MM/dd");
		return yyMDSD.format(new Date());
	}
	public static String getThisMonth(){
		SimpleDateFormat MM = new SimpleDateFormat("MM");
		return MM.format(new Date());
	}
	public static Date stringToDateYHD(String str) throws ParseException {
		SimpleDateFormat MM = new SimpleDateFormat("yyyy/MM/dd");
		Date parse = MM.parse(str);
		return parse;
	}
	
	/* 인코딩 확인 */
 	public void checkEncoding(String str){
		String [] types = {"UTF-8","EUC-KR","ISO-8859-1","MS949","KSC5601","X-WINDOWS-949"};
		for(int i=0; i<types.length; i++){
			for(int j=0; j<types.length; j++){
				try {
					System.out.println("["+types[i]+", "+types[j]+"] = " + new String(str.getBytes(types[i]), types[j]));
				} catch (Exception e) {
					e.printStackTrace();
				}					
			}
		}
	}

	/* get keys by value from map */
	public <T, E> Set<T> getKeysByValue(Map<T, E> map, E value) {
		Set<T> keys = new HashSet<T>();
		for (Map.Entry<T, E> entry : map.entrySet()) {
			if (Objects.equals(value, entry.getValue())) {
				keys.add(entry.getKey());
			}
		}
		return keys;
	}
	
 	/**
     * Mybatis용 변수 비어있는지 체크
     * 
     * @param obj 
     * @return Boolean : true / false
     */
    public static Boolean empty(Object obj) {
        if (obj instanceof String) return obj == null || "".equals(obj.toString().trim());
        else if (obj instanceof List) return obj == null || ((List<?>) obj).isEmpty();
        else if (obj instanceof Map) return obj == null || ((Map<?, ?>) obj).isEmpty();
        else if (obj instanceof Object[]) return obj == null || Array.getLength(obj) == 0;
        else return obj == null;
    }
 
    /**
     *  Mybatis용 변수 안비어있는지 체크
     * 
     * @param obj
     * @return Boolean : true / false
     */
    public static Boolean notEmpty(Object obj) {
        return !empty(obj);
    }
}
