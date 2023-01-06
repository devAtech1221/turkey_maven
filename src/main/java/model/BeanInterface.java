package model;

import java.util.HashMap;

public interface BeanInterface {
	HashMap<String, String> assignBeans();
	HashMap<String, String> getFieldPK();
	HashMap<String, String> getFieldUnique();
	HashMap<String, String> getFieldNotBlank();
}
