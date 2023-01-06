package model.system.master.master;


import common.Paging;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class MasterDao {
	private static MasterDao instance = new MasterDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	
	public static MasterDao getInstance() { return instance; }
	public MasterDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    
    private final Logger logger = LoggerFactory.getLogger(MasterDao.class);
    
    
    public List<Master> selectList(Paging paging) {
        List<Master> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	MasterMapper mapper = session.getMapper(MasterMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[MasterDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public List<Master> selectListByUser(Paging paging) {
        List<Master> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	MasterMapper mapper = session.getMapper(MasterMapper.class);
            list = mapper.selectListByUser(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[MasterDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    
    public Master selectDoc(Master sear){
        SqlSession session = sqlMapper.openSession();
        Master obj = null;
        
        try{
        	MasterMapper mapper = session.getMapper(MasterMapper.class);
        	obj = mapper.selectDoc(sear);
        }finally {
            session.close();
        }
        return obj;
    } 
    
    public boolean insertDoc(Master obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	MasterMapper mapper = session.getMapper(MasterMapper.class);
        	
        	appliedCNT = mapper.insertDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[MasterDao] : insertUser : " + e.toString());
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
        	MasterMapper mapper = session.getMapper(MasterMapper.class);
        	
        	appliedCNT = mapper.updateDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[MasterDao] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(Master obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	MasterMapper mapper = session.getMapper(MasterMapper.class);
            mapper.updateDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[MasterDao] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteDoc(Master obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	MasterMapper mapper = session.getMapper(MasterMapper.class);
            mapper.deleteDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[MasterDao] : deleteDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
}
