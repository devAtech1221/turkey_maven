package model.system.user.auth;

import common.Paging;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class AuthDao {
	private static AuthDao instance = new AuthDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	
	public static AuthDao getInstance() { return instance; }
	public AuthDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    
    private final Logger logger = LoggerFactory.getLogger(AuthDao.class);
    
    
    public List<Auth> selectList(Paging paging) {
        List<Auth> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	AuthMapper mapper = session.getMapper(AuthMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[UserDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public Auth selectDoc(String code){
        SqlSession session = sqlMapper.openSession();
        Auth obj = null;
        
        try{
        	AuthMapper mapper = session.getMapper(AuthMapper.class);
        	obj = mapper.selectDoc(code);
        }finally {
            session.close();
        }
        return obj;
    }
    
    public boolean insertDoc(Auth obj, List<AuthDetail> detailList){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	AuthMapper mapper = session.getMapper(AuthMapper.class);
        	
        	// doc
        	appliedCNT = mapper.insertDoc(obj); // mybatis keyProperty="AUTH_CD"로 PK 추출
        	if(appliedCNT == 0) throw new Exception();
        	
        	// detail
        	if(detailList != null && !detailList.isEmpty()) {
        		for(AuthDetail detail : detailList) {
        			detail.setAUTH_CD(obj.getAUTH_CD());
        		}
        		appliedCNT = 0;
            	appliedCNT = mapper.insertDocDetailList(detailList);
            	if(detailList.size() != appliedCNT) {
            		throw new Exception();
            	}
        	}
        	
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
    
    public boolean updateDoc(Auth obj, List<AuthDetail> detailList){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	AuthMapper mapper = session.getMapper(AuthMapper.class);
        	
        	appliedCNT = mapper.updateDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
        	mapper.deleteDocDetailAll(obj);
        	if(detailList != null && !detailList.isEmpty()) {
        		appliedCNT = 0;
            	appliedCNT = mapper.insertDocDetailList(detailList);
            	if(detailList.size() != appliedCNT) {
            		throw new Exception();
            	}
        	}
        	
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
    
    public boolean deleteDoc(Auth obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	AuthMapper mapper = session.getMapper(AuthMapper.class);
        	mapper.deleteDoc(obj);
        	mapper.deleteDocDetailAll(obj);
        	
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
    
    public List<AuthDetail> selectDocDetailList(String code){
        SqlSession session = sqlMapper.openSession();
        List<AuthDetail> list = null;
        
        try{
        	AuthMapper mapper = session.getMapper(AuthMapper.class);
        	list = mapper.selectDocDetailList(code);
        }finally {
            session.close();
        }
        return list;
    }
}
