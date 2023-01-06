package model.system.master.menu;

import common.Paging;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class MenuDao {
	private static MenuDao instance = new MenuDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;

	public static MenuDao getInstance(){ return instance; }
	public MenuDao(){ sqlMapper = SqlSessionManager.getSqlSession(); }
	public int getNoOfRecords(){ return noOfRecords; }
	public void setNoOfRecords(int noOfRecords) { this.noOfRecords = noOfRecords; }

	private final Logger logger = LoggerFactory.getLogger(MenuDao.class);
	
	public List<Menu> selectList(Paging paging) {
		List<Menu> list = null;
		SqlSession session = sqlMapper.openSession();
		
		try {
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			list = mapper.selectList(paging);
			this.noOfRecords = mapper.selectTotalRecords();
		} catch(Exception e) {
			e.printStackTrace();
			logger.error("Error[MenuDao] : selectList : {}", e.toString());
		} finally {
			session.close();
		}
		
		return list;
	}
	
	public Menu selectObj(Menu sear) {
		SqlSession session = sqlMapper.openSession();
		Menu obj = null;
		
		try {
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			obj = mapper.selectObj(sear);
		} finally {
			session.close();
		}
		return obj;
	}
	
	public boolean insertDoc(Menu obj) {
		SqlSession session = sqlMapper.openSession();
		int appliedCNT = 0;
		
		try {
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			
			appliedCNT = mapper.insertDoc(obj);
			if(appliedCNT == 0) throw new Exception();
			session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[MenuDao] : insertDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
	}
	
	public boolean updateDoc(Menu obj) {
		SqlSession session = sqlMapper.openSession();

        try{
        	MenuMapper mapper = session.getMapper(MenuMapper.class);
            mapper.updateDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[MenuDao] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
	}
	
	public boolean deleteDoc(Menu obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	MenuMapper mapper = session.getMapper(MenuMapper.class);
            mapper.deleteDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[ProcessDao] : deleteDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
	/*
	 * selectMenuList
	 */
	public List<Menu> selectMenuList(){
		List<Menu> list = null;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			list = mapper.selectMenuList();
			this.noOfRecords = mapper.selectTotalRecords();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : selectMenuList : "+e.getMessage());
		}finally{
			session.close();
		}
		return list;
	}
	
	public List<Menu> selectAuthMenuList(String auth_cd){
		List<Menu> list = null;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			list = mapper.selectAuthMenuList(auth_cd);
			this.noOfRecords = mapper.selectTotalRecords();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : selectAuthMenuList : "+e.getMessage());
		}finally{
			session.close();
		}
		return list;
	}

	/*
	 * selectMenu1List
	 */
	public List<Menu> selectMenu1List(){
		List<Menu> list = null;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			list = mapper.selectMenu1List();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : selectMenu1List : "+e.getMessage());
		}finally{
			session.close();
		}
		return list;
	}

	/*
	 * selectMenu2List
	 */
	public List<Menu> selectMenu2List(int MENU1_CD){
		List<Menu> list = null;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			list = mapper.selectMenu2List(MENU1_CD);
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : selectMenu2List : "+e.getMessage());
		}finally{
			session.close();
		}
		return list;
	}
	
	/*
	 * selectMenu3List
	 */
	public List<Menu> selectMenu3List(int MENU2_CD){
		List<Menu> list = null;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			list = mapper.selectMenu3List(MENU2_CD);
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : selectMenu3List : "+e.getMessage());
		}finally{
			session.close();
		}
		return list;
	}

	/*
	 * getMenu1Bymenu
	 */
	public Menu getMenu1ByInfo(Menu menu){
		Menu obj;
		SqlSession session = sqlMapper.openSession();
		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			obj = mapper.getMenu1ByInfo(menu);
		}catch(Exception e){
			obj = null;
			System.out.println("Error[MenuDAO] : getMenu1ByInfo : "+e.getMessage());
		}finally{
			session.close();
		}
		return obj;
	}

	/*
	 * getMenu2Bymenu
	 */
	public Menu getMenu2ByInfo(Menu menu){
		Menu obj;
		SqlSession session = sqlMapper.openSession();
		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			obj = mapper.getMenu2ByInfo(menu);
		}catch(Exception e){
			obj = null;
			System.out.println("Error[MenuDAO] : getMenu2ByInfo : "+e.getMessage());
		}finally{
			session.close();
		}
		return obj;
	}
	
	/*
	 * getMenu3Bymenu
	 */
	public Menu getMenu3ByInfo(Menu menu){
		Menu obj;
		SqlSession session = sqlMapper.openSession();
		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			obj = mapper.getMenu3ByInfo(menu);
		}catch(Exception e){
			obj = null;
			System.out.println("Error[MenuDAO] : getMenu3ByInfo : "+e.getMessage());
		}finally{
			session.close();
		}
		return obj;
	}

	/*
	 * getMenu1ByURL
	 */
	public Menu getMenu1ByURL(String url){
		Menu obj;
		SqlSession session = sqlMapper.openSession();
		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			obj = mapper.getMenu1ByURL(url);
		}catch(Exception e){
			obj = null;
			System.out.println("Error[MenuDAO] : getMenu1ByURL : "+e.getMessage());
		}finally{
			session.close();
		}
		return obj;
	}

	/*
	 * getMenu2ByURL
	 */
	public Menu getMenu2ByURL(String url){
		Menu obj;
		SqlSession session = sqlMapper.openSession();
		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			obj = mapper.getMenu2ByURL(url);
		}catch(Exception e){
			obj = null;
			System.out.println("Error[MenuDAO] : getMenu2ByURL : "+e.getMessage());
		}finally{
			session.close();
		}
		return obj;
	}
	
	/*
	 * getMenu3ByURL
	 */
	public Menu getMenu3ByURL(String url){
		Menu obj;
		SqlSession session = sqlMapper.openSession();
		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			obj = mapper.getMenu3ByURL(url);
		}catch(Exception e){
			obj = null;
			System.out.println("Error[MenuDAO] : getMenu3ByURL : "+e.getMessage());
		}finally{
			session.close();
		}
		return obj;
	}

	/*
	 * getCntMenu2
	 */
	public int getCntMenu2(int MENU2_CD){
		int CD = 0;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			CD = mapper.getCntMenu2(MENU2_CD);
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : getCntMenu2 : "+e.getMessage());
		}finally{
			session.close();
		}
		return CD;
	}
	
	/*
	 * getCntMenu3
	 */
	public int getCntMenu3(int MENU2_CD){
		int CD = 0;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			CD = mapper.getCntMenu3(MENU2_CD);
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : getCntMenu3 : "+e.getMessage());
		}finally{
			session.close();
		}
		return CD;
	}

	/*
	 * getMaxMENU1_CD
	 */
	public int getMaxMENU1_CD(){
		int CD = 0;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			CD = mapper.getMaxMENU1_CD();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : getMaxMENU1_CD : "+e.getMessage());
		}finally{
			session.close();
		}
		return CD;
	}

	/*
	 * getMaxMENU2_CD
	 */
	public int getMaxMENU2_CD(){
		int CD = 0;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			CD = mapper.getMaxMENU2_CD();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : getMaxMENU2_CD : "+e.getMessage());
		}finally{
			session.close();
		}
		return CD;
	}
	
	/*
	 * getMaxMENU3_CD
	 */
	public int getMaxMENU3_CD(){
		int CD = 0;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			CD = mapper.getMaxMENU3_CD();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : getMaxMENU3_CD : "+e.getMessage());
		}finally{
			session.close();
		}
		return CD;
	}

	/*
	 * getMaxORDER1
	 */
	public int getMaxORDER1(){
		int ORDER = 0;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			ORDER = mapper.getMaxORDER1();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : getMaxORDER1 : "+e.getMessage());
		}finally{
			session.close();
		}
		return ORDER;
	}

	/*
	 * getMaxORDER2
	 */
	public int getMaxORDER2(){
		int ORDER = 0;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			ORDER = mapper.getMaxORDER2();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : getMaxORDER2 : "+e.getMessage());
		}finally{
			session.close();
		}
		return ORDER;
	}
	
	/*
	 * getMaxORDER3
	 */
	public int getMaxORDER3(){
		int ORDER = 0;
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			ORDER = mapper.getMaxORDER3();
		}catch(Exception e){
			System.out.println("Error[MenuDAO] : getMaxORDER3 : "+e.getMessage());
		}finally{
			session.close();
		}
		return ORDER;
	}

	/*
	 * updateMenuOrder
	 */
	public boolean updateMenuOrder(List<Menu> list){
		SqlSession session = sqlMapper.openSession();

		try{
			MenuMapper mapper = session.getMapper(MenuMapper.class);
			for(int i=0; i < list.size(); i++){
				Menu m = list.get(i);
				mapper.updateMenuOrder(m);
			}
			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[MenuDAO] : updateMenuOrder : "+e.getMessage());
			return false;
		}finally {
			session.close();
		}
		return false;
	}
}
