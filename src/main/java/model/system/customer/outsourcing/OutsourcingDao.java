package model.system.customer.outsourcing;

import common.Paging;
import model.system.customer.customer.Bank;
import model.system.customer.customer.Manager;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class OutsourcingDao {
	private static OutsourcingDao instance = new OutsourcingDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	
	public static OutsourcingDao getInstance() { return instance; }
	public OutsourcingDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    
    private final Logger logger = LoggerFactory.getLogger(OutsourcingDao.class);
    
    public List<Outsourcing> selectList(Paging paging) {
        List<Outsourcing> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[OutsourcingDao] : selectList : {}", e);
        } finally {
            session.close();
        }

        return list;
    }
    
    public Outsourcing selectDoc(String code){
        SqlSession session = sqlMapper.openSession();
        Outsourcing obj = null;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	obj = mapper.selectDoc(code);
        }finally {
            session.close();
        }
        return obj;
    } 
    
    public boolean insertDoc(Outsourcing obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	
        	appliedCNT = mapper.insertDoc(obj); // mybatis keyProperty=""??? PK ??????
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : insertDoc : {}", e);
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(Outsourcing obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	
        	appliedCNT = mapper.updateDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : updateDoc : {}", e);
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteDoc(Outsourcing obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
            mapper.deleteDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : deleteDoc : {}", e);
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
    
    public List<Bank> selectBankList(Paging paging) {
        List<Bank> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
            list = mapper.selectBankList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[OutsourcingDao] : selectBankList : {}", e);
        } finally {
            session.close();
        }

        return list;
    }
    
    public Bank selectBank(Bank code){
        SqlSession session = sqlMapper.openSession();
        Bank obj = null;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	obj = mapper.selectBank(code);
        }finally {
            session.close();
        }
        return obj;
    } 
    
    public boolean insertBank(Bank obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	
        	appliedCNT = mapper.insertBank(obj); // mybatis keyProperty=""??? PK ??????
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : insertBank : {}", e);
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateBank(Bank obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	
        	appliedCNT = mapper.updateBank(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : updateBank : {}", e);
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteBank(Bank obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
            mapper.deleteBank(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : deleteBank : {}", e);
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
    
    public List<Manager> selectManagerList(Paging paging) {
        List<Manager> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
            list = mapper.selectManagerList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[OutsourcingDao] : selectManagerList : {}", e);
        } finally {
            session.close();
        }

        return list;
    }
    
    public int selectDefaultManagerCount(Manager obj) {
    	int count = -1;
        SqlSession session = sqlMapper.openSession();

        try {
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	count = mapper.selectDefaultManagerCount(obj);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[OutsourcingDao] : selectDefaultManagerCount : {}", e);
        } finally {
            session.close();
        }

        return count;
    }
    
    public Manager selectManager(Manager code){
        SqlSession session = sqlMapper.openSession();
        Manager obj = null;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	obj = mapper.selectManager(code);
        }finally {
            session.close();
        }
        return obj;
    } 
    
    public boolean insertManager(Manager obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	
        	appliedCNT = mapper.insertManager(obj); // mybatis keyProperty=""??? PK ??????
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : insertManager : {}", e);
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateManager(Manager obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
        	
        	appliedCNT = mapper.updateManager(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : updateManager : {}", e);
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteManager(Manager obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	OutsourcingMapper mapper = session.getMapper(OutsourcingMapper.class);
            mapper.deleteManager(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[OutsourcingDao] : deleteManager : {}", e);
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
}
