package model.system.customer.customer;

import common.Paging;

import java.util.List;

public interface CustomerMapper {
	int selectTotalRecords();
	
	List<Customer> selectList(Paging paging);
	Customer selectDoc(String code);
	
	int insertDoc(Customer obj);
    int updateDoc(Customer obj);
    int deleteDoc(Customer obj); 
    
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
