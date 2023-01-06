package model.system.master.menu;

import common.Paging;

import java.util.List;

public interface MenuMapper {
	int selectTotalRecords();
	
	/* 메뉴관리 */
	List<Menu> selectList(Paging paging);
	Menu selectObj(Menu sear);
	
	int insertDoc(Menu obj);
	int updateDoc(Menu obj);
	int deleteDoc(Menu obj);
	
	/*
	 * MENU
	 */
    List<Menu> selectMenuList();
    List<Menu> selectAuthMenuList(String auth_cd);
    
    List<Menu> selectMenu1List();
    List<Menu> selectMenu2List(int menu1_cd);
    List<Menu> selectMenu3List(int menu2_cd);
    
    Menu getMenu1ByInfo(Menu obj); 
    Menu getMenu2ByInfo(Menu obj);
    Menu getMenu3ByInfo(Menu obj);
    
    Menu getMenu1ByURL(String url); 
    Menu getMenu2ByURL(String url);
    Menu getMenu3ByURL(String url);
    
    int getCntMenu2(int menu1_cd);
    int getCntMenu3(int menu2_cd);

    int getMaxMENU1_CD();
    int getMaxMENU2_CD();
    int getMaxMENU3_CD();

    int getMaxORDER1();
    int getMaxORDER2();
    int getMaxORDER3(); 
    
    int updateMenuOrder(Menu obj);
}
