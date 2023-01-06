package model.system.customer.purchase;

import common.Paging;
import model.system.customer.customer.Bank;
import model.system.customer.customer.Manager;

import java.util.List;

public interface PurchaseMapper {
	int selectTotalRecords();
	
	List<Purchase> selectList(Paging paging);
	Purchase selectDoc(String code);
	
	int insertDoc(Purchase obj);
    int updateDoc(Purchase obj);
    int deleteDoc(Purchase obj); 
    
    List<Bank> selectBankList(Paging paging);
    Bank selectBank(Bank obj);
    
    int insertBank(Bank obj);
    int updateBank(Bank obj);
    int deleteBank(Bank obj); 
    
    List<Manager> selectManagerList(Paging paging);
    Manager selectManager(Manager obj);
    int selectDefaultManagerCount(Manager obj);
    
    int insertManager(Manager obj);
    int updateManager(Manager obj);
    int deleteManager(Manager obj); 
}
