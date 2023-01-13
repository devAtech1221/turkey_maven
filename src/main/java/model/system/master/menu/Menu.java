package model.system.master.menu;

import lombok.Getter;
import lombok.Setter;
import model.BeanCommon;
import model.BeanInterface;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Getter @Setter
public class Menu extends BeanCommon implements BeanInterface{
	private String MENU1_CD;
	private String MENU2_CD;
	private String MENU3_CD;
	private String MENU_SEQ;
	private String MENU_NM;
	private String MENU_NM_KO;
	private String MENU_URL;
	private String MENU_ICON;
	private String COMMENT;
	private String USE_YN;
	private String SELECT_YN;
	private String UPDATE_YN;
	private String NOTI_YN;
	private String CREATE_ID;
	private String CREATE_DTM;
	private String CREATE_DT;
	private String UPDATE_ID;
	private String UPDATE_DTM;
	private String UPDATE_DT;

	public Menu() {}
	public Menu(HttpServletRequest request, String setName){super(request, setName);}

	@Override
	public HashMap<String, String> getFieldPK() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public HashMap<String, String> getFieldUnique() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public HashMap<String, String> getFieldNotBlank() {
		// TODO Auto-generated method stub
		return null;
	}
}
