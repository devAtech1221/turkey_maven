package model.system.customer.customer;

import common.Paging;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class CustomerDao {
	private static CustomerDao instance = new CustomerDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	public static CustomerDao getInstance() { return instance; }
	public CustomerDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    private final Logger logger = LoggerFactory.getLogger(CustomerDao.class);
    
    public List<Customer> selectList(Paging paging) {
        List<Customer> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[CustomerDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public Customer selectDoc(String code){
        SqlSession session = sqlMapper.openSession();
        Customer obj = null;
        
        try{
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
        	obj = mapper.selectDoc(code);
        }finally {
            session.close();
        }
        return obj;
    } 
    
    public boolean insertDoc(Customer obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
        	
        	appliedCNT = mapper.insertDoc(obj); // mybatis keyProperty=""로 PK 추출
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : insertDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(Customer obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
        	
        	appliedCNT = mapper.updateDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteDoc(Customer obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
            mapper.deleteDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : deleteDoc : " + e.toString());
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
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
            list = mapper.selectBankList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[CustomerDao] : selectBankList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public Bank selectBank(Bank code){
        SqlSession session = sqlMapper.openSession();
        Bank obj = null;
        
        try{
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
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
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
        	
        	appliedCNT = mapper.insertBank(obj); // mybatis keyProperty=""로 PK 추출
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : insertBank : " + e.toString());
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
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
        	
        	appliedCNT = mapper.updateBank(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : updateBank : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteBank(Bank obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
            mapper.deleteBank(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : deleteBank : " + e.toString());
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
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
            list = mapper.selectManagerList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[CustomerDao] : selectManagerList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public int selectDefaultManagerCount(Manager obj) {
    	int count = -1;
        SqlSession session = sqlMapper.openSession();

        try {
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
        	count = mapper.selectDefaultManagerCount(obj);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[CustomerDao] : selectDefaultManagerCount : {}", e.toString());
        } finally {
            session.close();
        }

        return count;
    }
    
    public Manager selectManager(Manager code){
        SqlSession session = sqlMapper.openSession();
        Manager obj = null;
        
        try{
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
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
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
        	
        	appliedCNT = mapper.insertManager(obj); // mybatis keyProperty=""로 PK 추출
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : insertManager : " + e.toString());
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
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
        	
        	appliedCNT = mapper.updateManager(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : updateManager : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteManager(Manager obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	CustomerMapper mapper = session.getMapper(CustomerMapper.class);
            mapper.deleteManager(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[CustomerDao] : deleteManager : " + e.toString());
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
}
