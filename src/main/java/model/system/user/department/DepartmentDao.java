package model.system.user.department;

import common.Paging;
import model.system.master.master.Master;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class DepartmentDao {
	private static DepartmentDao instance = new DepartmentDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	
	public static DepartmentDao getInstance() { return instance; }
	public DepartmentDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    
    private final Logger logger = LoggerFactory.getLogger(DepartmentDao.class);
    
    
    public List<Master> selectList(Paging paging) {
        List<Master> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	DepartmentMapper mapper = session.getMapper(DepartmentMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[DepartmentDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public List<Master> selectListByUser(Paging paging) {
        List<Master> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	DepartmentMapper mapper = session.getMapper(DepartmentMapper.class);
            list = mapper.selectListByUser(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[DepartmentDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public Master selectDoc(String code){
        SqlSession session = sqlMapper.openSession();
        Master obj = null;
        
        try{
        	DepartmentMapper mapper = session.getMapper(DepartmentMapper.class);
        	obj = mapper.selectDoc(code);
        }finally {
            session.close();
        }
        return obj;
    } 
    
    public boolean insertDoc(Master obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	DepartmentMapper mapper = session.getMapper(DepartmentMapper.class);
        	
        	appliedCNT = mapper.insertDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[UserDAO] : insertUser : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(Master obj, List<Master> detail){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	DepartmentMapper mapper = session.getMapper(DepartmentMapper.class);
        	
        	appliedCNT = mapper.updateDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[UserDAO] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(Master obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	DepartmentMapper mapper = session.getMapper(DepartmentMapper.class);
            mapper.updateDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[UserDAO] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteDoc(Master obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	DepartmentMapper mapper = session.getMapper(DepartmentMapper.class);
            mapper.deleteDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[UserDAO] : deleteDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
}
