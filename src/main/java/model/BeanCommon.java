package model;

import common.MyUtil;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class BeanCommon {
	public BeanCommon() {}
	
	/* 
	 * request parameter -> Field
	 * 
	 * ex)
	 * request param attr : "docMst[DOC_NO]"
	 * setName: "docMst"
	 * 
	 * */
	public BeanCommon(HttpServletRequest request, String setName){
		Class<? extends BeanCommon> testClass = this.getClass();
		Class[] paramTypes = new Class[1];
		paramTypes[0] = String.class;

		// field list 
		Field[] fields = testClass.getDeclaredFields();
		for (Field field : fields) {
			// 0. String only
			if(field.getType() != String.class) {
				continue;
			}
			
			String fName = field.getName();
			String fNameFirstCharUpper = fName.substring(0, 1).toUpperCase() + fName.substring(1);
			// 1. find method setter
			String methodName = "set" + fNameFirstCharUpper;
			Method m = null;
			try {
				m = testClass.getMethod(methodName, paramTypes);
			}catch(NoSuchMethodException e) {
//				e.printStackTrace();
				continue;
			}

			// 2. requestParam -> field
			try {
				String requestPram = new MyUtil().null2Blank(request.getParameter(setName + "[" + fName + "]")).trim();
			    m.invoke(this, requestPram);
			} catch (IllegalAccessException e) {
			    e.printStackTrace();
			} catch (InvocationTargetException e) {
			    e.printStackTrace();
			}
		}
	}
	
	public Map<String, String> bean2Map(){
		try {
			return BeanUtils.describe(this);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	/*
	 * bean -> HashMap<String, String>
	 * 
	 * */
	public HashMap<String, String> assignBeans() {
		HashMap<String, String>  tmpMap = new HashMap<String, String>();
		
		Class<? extends BeanCommon> testClass = this.getClass();
		Class[] paramTypes = new Class[1];
		paramTypes[0] = String.class;

		// field list 
		Field[] fields = testClass.getDeclaredFields();
		for (Field field : fields) {
			String fName = field.getName();
			
			// 1. find method getter
			String methodName = "get" + fName;
			Method m = null;
			try {
				m = testClass.getMethod(methodName);
			}catch(NoSuchMethodException e) {
				e.printStackTrace();
			}

			// 2. requestParam -> field
			try {
			    String targetVal = (String) m.invoke(this);
			    tmpMap.put(fName, targetVal);
			} catch (IllegalAccessException e) {
			    e.printStackTrace();
			} catch (InvocationTargetException e) {
			    e.printStackTrace();
			}
		}
		
		return tmpMap;
	}
}
