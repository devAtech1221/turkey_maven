package model.system.customer.outsourcing;

import common.Paging;
import model.system.customer.customer.Bank;
import model.system.customer.customer.Manager;

import java.util.List;

public interface OutsourcingMapper {
	int selectTotalRecords();
	
	List<Outsourcing> selectList(Paging paging);
	Outsourcing selectDoc(String code);
	
	int insertDoc(Outsourcing obj);
    int updateDoc(Outsourcing obj);
    int deleteDoc(Outsourcing obj); 
    
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
