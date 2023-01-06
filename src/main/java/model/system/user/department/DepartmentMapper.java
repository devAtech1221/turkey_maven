package model.system.user.department;

import common.Paging;
import model.system.master.master.Master;

import java.util.List;

public interface DepartmentMapper {
	int selectTotalRecords();
	
	List<Master> selectList(Paging paging);
	List<Master> selectListByUser(Paging paging);
	Master selectDoc(String code);
	
	int insertDoc(Master obj);
    int updateDoc(Master obj);
    int deleteDoc(Master obj); 
}
