package model.system.master.standardProcess;

import common.Paging;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class StandardProcessDao {
	private static StandardProcessDao instance = new StandardProcessDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	
	public static StandardProcessDao getInstance() { return instance; }
	public StandardProcessDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    
    private final Logger logger = LoggerFactory.getLogger(StandardProcessDao.class);
    
    
    public List<StandardProcess> selectList(Paging paging) {
        List<StandardProcess> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	StandardProcessMapper mapper = session.getMapper(StandardProcessMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[ProcessDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public StandardProcess selectDoc(StandardProcess sear){
        SqlSession session = sqlMapper.openSession();
        StandardProcess obj = null;
        
        try{
        	StandardProcessMapper mapper = session.getMapper(StandardProcessMapper.class);
        	obj = mapper.selectDoc(sear);
        }finally {
            session.close();
        }
        return obj;
    } 
    
    public boolean insertDoc(StandardProcess obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	StandardProcessMapper mapper = session.getMapper(StandardProcessMapper.class);
        	
        	appliedCNT = mapper.insertDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[ProcessDao] : insertUser : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(StandardProcess obj, List<StandardProcess> detail){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	StandardProcessMapper mapper = session.getMapper(StandardProcessMapper.class);
        	
        	appliedCNT = mapper.updateDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[ProcessDao] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(StandardProcess obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	StandardProcessMapper mapper = session.getMapper(StandardProcessMapper.class);
            mapper.updateDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[ProcessDao] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteDoc(StandardProcess obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	StandardProcessMapper mapper = session.getMapper(StandardProcessMapper.class);
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
    
    public List<StandardProcess> selectListAPI(Paging paging) {
        List<StandardProcess> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	StandardProcessMapper mapper = session.getMapper(StandardProcessMapper.class);
            list = mapper.selectListAPI(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[ProcessDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
}
