package common;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.io.Resources;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Properties;

/**
 * 해당 클래스는 나중에 .properties, .xml 등 텍스트 파일로 바꿀 예정...?
 * @author Kiyeon
 */
public class Config {
	public static String environment, appName, version, PATH_BASE;
    public static String strSiteName = "Turkey - Solution";
    public static String sTask = "select";
    public static String pTask = "proc";
    public static String viewPath = "/view";
    public static String viewLogin = "/view/login/page.jsp";
    public static String viewJoin = "/view/join/page.jsp";
    public static String viewFile = "/common/util/fileDownLoad.jsp";
    public static String hldrNoti = "/notification/Notification.do";
    @Getter @Setter private static String eKey = "AtechSolutionBasedServlet"; // 16자 이상

    static {
        String resource = "/application.properties";
        Reader reader = null;
        Properties properties = new Properties();

        try {
            reader = Resources.getResourceAsReader(resource);
            properties.load(reader);
            environment = properties.getProperty("environment");
            appName = properties.getProperty("appName");
            version = properties.getProperty("version");
            if(version == null){version = "";}
            PATH_BASE = properties.getProperty("PATH_BASE");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static String getPATH_BASE() throws Exception {
    	if(Config.environment.equals("dev")) {
    		return "C:" + File.separator + "atech_frame" + File.separator;
    		
    	}else if(Config.environment.equals("dev-dwkim")) {
    		return "/Users/dan/DevelopmentRef/bizatech/upload/";
    	
    	}else if(Config.environment.equals("dev-server")) {
    		return "/usr/local/apache-tomcat-8.5.31/webapps/bizatech/file/";

        }else if(Config.environment.equals("test")) {
            return "/data/bizatech/file/";

        }else if(Config.environment.equals("prod")) {
            return "/data/bizatech/file/";
        }
    	
    	throw new Exception();
    }
    
    /**
     * <br> 기본 경로는 BASE_PATH.
     * <br> 이외 핸들러에서 설정하는 모든 경로는 BASE_PATH의 하위 경로만 기입하도록 하면 좋을 것 같습니다.
     * <br> 예: upload.setFilePath("PJ"); 
     * <br> -> Upload 모듈 내부에서 BASE_PATH + File.separator + "PJ" 가 되도록 하고 각 핸들러에서는 하위 경로만 관리될 수 있또록....?
     */
    public static String getFullPath(String childPathOnBasePath) throws Exception {
    	//return PATH_BASE + File.separator + childPathOnBasePath;
    	return Config.getPATH_BASE() + childPathOnBasePath;
    }

    
    /* 기준정보 코드 */
    public static HashMap<String, String> DIM_MST1 = new HashMap<>();
    static {
    	DIM_MST1.put("부서", "DEPT"); 	
    	DIM_MST1.put("직급", "RANK");
    	DIM_MST1.put("우선순위", "PRIORITY");
    	DIM_MST1.put("발주구분", "ORD_TYPE");
    	DIM_MST1.put("수입검사", "INSPECTION");
    	DIM_MST1.put("설비구분", "EQUIP_TYPE");
    	DIM_MST1.put("보전구분", "PRESERVE_TYPE");
    	DIM_MST1.put("입찰결과", "BIDDING_TYPE");
        DIM_MST1.put("통화구분", "CURRENCY_TYPE");
        DIM_MST1.put("업무구분", "BIZ_GUBUN");
        DIM_MST1.put("업무상태", "BIZ_STATUS");
        DIM_MST1.put("업무중요도", "BIZ_IMPORTANCE");
    }
    
    /* 문서코드 ["문서구분(영문)", "문서코드"] */
    public static HashMap<String, String> MAP_DOC_CD = new HashMap<>();
    static {
        MAP_DOC_CD.put("NOTICE","NT");
        MAP_DOC_CD.put("OUTPUT","OP");
//    	MAP_DOC_CD.put("BOM","SA");
    }
    
    /* 문서코드 ["문서구분(한글)", "문서코드"] */
    public static HashMap<String, String> MAP_DOC_CD_KR = new HashMap<>();
    static {
    	MAP_DOC_CD_KR.put("프로젝트관리", Config.MAP_DOC_CD.get("PROJECT"));
    }
    
    /* 문서코드 -> 문서타입 */
    public static String docCD2docType(String DOC_CD) {
    	String CD = DOC_CD.substring(sDocCDIdx, eDocCDIdx+1);
    	
        for (Entry<String, String> entry : MAP_DOC_CD.entrySet()) {
            if (Objects.equals(CD, entry.getValue())) { return entry.getKey(); }
        }
        
        return null;
    }
    
    /* 문서코드 -> 문서타입한글 */
    public static String docCD2docTypeKor(String DOC_CD) {
    	String CD = DOC_CD.substring(sDocCDIdx, eDocCDIdx+1);
    	
        for (Entry<String, String> entry : MAP_DOC_CD_KR.entrySet()) {
            if (Objects.equals(CD, entry.getValue())) { return entry.getKey(); }
        }
        
        return null;
    }
    
    /* 문서코드 인덱스(CD-YY-SEQ) */
    public static int sDocCDIdx = 0;
    public static int eDocCDIdx = 1;
    public static int sYYmmIdx = 3;
    public static int eYYmmIdx = 6;
    public static int sSeqIdx = 8;
    public static int eSeqIdx = 11;
}
