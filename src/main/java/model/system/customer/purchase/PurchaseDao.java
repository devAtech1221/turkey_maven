package model.system.customer.purchase;

import common.Paging;
import model.system.customer.customer.Bank;
import model.system.customer.customer.Manager;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class PurchaseDao {
	private static PurchaseDao instance = new PurchaseDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	public static PurchaseDao getInstance() { return instance; }
	public PurchaseDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    private final Logger logger = LoggerFactory.getLogger(PurchaseDao.class);
    
    public List<Purchase> selectList(Paging paging) {
        List<Purchase> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[PurchaseDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public Purchase selectDoc(String code){
        SqlSession session = sqlMapper.openSession();
        Purchase obj = null;
        
        try{
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
        	obj = mapper.selectDoc(code);
        }finally {
            session.close();
        }
        return obj;
    } 
    
    public boolean insertDoc(Purchase obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
        	
        	appliedCNT = mapper.insertDoc(obj); // mybatis keyProperty=""로 PK 추출
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : insertDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(Purchase obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
        	
        	appliedCNT = mapper.updateDoc(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : updateDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteDoc(Purchase obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
            mapper.deleteDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : deleteDoc : " + e.toString());
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
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
            list = mapper.selectBankList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[PurchaseDao] : selectBankList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public Bank selectBank(Bank code){
        SqlSession session = sqlMapper.openSession();
        Bank obj = null;
        
        try{
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
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
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
        	
        	appliedCNT = mapper.insertBank(obj); // mybatis keyProperty=""로 PK 추출
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : insertBank : " + e.toString());
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
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
        	
        	appliedCNT = mapper.updateBank(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : updateBank : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteBank(Bank obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
            mapper.deleteBank(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : deleteBank : " + e.toString());
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
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
            list = mapper.selectManagerList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[PurchaseDao] : selectManagerList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
    
    public int selectDefaultManagerCount(Manager obj) {
    	int count = -1;
        SqlSession session = sqlMapper.openSession();

        try {
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
        	count = mapper.selectDefaultManagerCount(obj);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[PurchaseDao] : selectDefaultManagerCount : {}", e.toString());
        } finally {
            session.close();
        }

        return count;
    }
    
    public Manager selectManager(Manager code){
        SqlSession session = sqlMapper.openSession();
        Manager obj = null;
        
        try{
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
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
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
        	
        	appliedCNT = mapper.insertManager(obj); // mybatis keyProperty=""로 PK 추출
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : insertManager : " + e.toString());
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
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
        	
        	appliedCNT = mapper.updateManager(obj);
        	if(appliedCNT == 0) throw new Exception();
        	
            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : updateManager : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteManager(Manager obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	PurchaseMapper mapper = session.getMapper(PurchaseMapper.class);
            mapper.deleteManager(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PurchaseDao] : deleteManager : " + e.toString());
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
}