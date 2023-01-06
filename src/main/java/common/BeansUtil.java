package common;

import model.BeanCommon;
import model.BeanInterface;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class BeansUtil {
	/* List<beans> -> ArrayList<HashMap<String,String>> */
	public <T> ArrayList<HashMap<String, String>> obj2Array(List<T> beanList) {
		ArrayList<HashMap<String, String>> resultList = new ArrayList<HashMap<String, String>>();
        if(beanList != null){
        	for (T m : beanList) {
        		BeanInterface obj = (BeanInterface)m;
        		HashMap<String, String> tmpMap = obj.assignBeans();
        		resultList.add(tmpMap);
        	}
        }
        return resultList;
	}
	
	/* List<beans> -> ArrayList<HashMap<String,String>> With 'NO' DESC */
	public <T> ArrayList<HashMap<String, String>> obj2Array(List<T> beanList, Paging paging) {
		ArrayList<HashMap<String, String>> resultList = new ArrayList<HashMap<String, String>>();
        if(beanList != null){
        	int nowNo = paging.getStartNumPerPage();
        	for (T m : beanList) {
        		BeanCommon obj = (BeanCommon)m;
        		HashMap<String, String> tmpMap = obj.assignBeans();
        		tmpMap.put("NO", Integer.toString(nowNo));
        		resultList.add(tmpMap);
        		nowNo--;
        	}
        }
        return resultList;
	}
	
	/* List<beans> -> ArrayList<HashMap<String,String>> With 'NO' ASC */
	public <T> ArrayList<HashMap<String, String>> obj2ArrayAsc(List<T> beanList, Paging paging) {
		ArrayList<HashMap<String, String>> resultList = new ArrayList<HashMap<String, String>>();
        if(beanList != null){
        	int nowNo = 1;
        	for (T m : beanList) {
        		BeanCommon obj = (BeanCommon)m;
        		HashMap<String, String> tmpMap = obj.assignBeans();
        		tmpMap.put("NO", Integer.toString(nowNo));
        		resultList.add(tmpMap);
        		nowNo++;
        	}
        }
        return resultList;
	}
	
	/* VALIDATION :: PK UNIQUE (해당 PK 전체에 대해 중복값 체크) */
	public <T> boolean validPK(List<T> beanList) {
		boolean duplicate = false;
		
		if(beanList != null && beanList.size() > 0){
			List<HashMap<String, String>> listMapPK = new ArrayList<HashMap<String,String>>();
			
			// 1. PK FIELD가 있는지 확인
			BeanInterface tmp = (BeanInterface)beanList.get(0);
			if(tmp.getFieldPK() == null) return false;
			
			// 2. 비교			
			for(T item : beanList) {
				BeanInterface obj = (BeanInterface)item;
				HashMap<String, String> mapPK = obj.getFieldPK();

				for(HashMap<String, String> existMapPK : listMapPK) {
					duplicate = mapPK.equals(existMapPK);// compare
					if(duplicate) break;
				}
				
				if(duplicate) break;
				listMapPK.add(mapPK);
			}
		}
		
		return duplicate;
	}
	
	/* VALIDATION :: UNIQUE (개별 값들에 대한 중복 체크) */
	
	/* VALIDATION :: NOT BLANK (공백값 체크) */
	public <T> boolean validNotBlank(List<T> beanList) {
		boolean notBlank= false;
		
		if(beanList != null && beanList.size() > 0){
			List<HashMap<String, String>> listMapField = new ArrayList<HashMap<String,String>>();
			
			// 1. NOTBLANK FIELD가 있는지 확인
			BeanInterface tmp = (BeanInterface)beanList.get(0);
			if(tmp.getFieldPK() == null) return false;
			
			// 2. 값 체크
			for(T item : beanList) {
				BeanInterface obj = (BeanInterface)item;
				HashMap<String, String> mapFieldNotBlank = obj.getFieldNotBlank();
				for( String key : mapFieldNotBlank.keySet() ){
					String val = mapFieldNotBlank.get(key);
					if(val == null || val.equals("")) {
						notBlank = true;
					}
				}
				
				if(notBlank) break;
			}
		}
		
		return notBlank;
	}
}
