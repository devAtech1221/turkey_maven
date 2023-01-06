package model.system.master.master;

import common.Paging;

import java.util.List;

public interface MasterMapper {
	int selectTotalRecords();
	
	List<Master> selectList(Paging paging);

	List<Master> selectListByUser(Paging paging);
	Master selectDoc(Master sear);
	
	int insertDoc(Master obj);
    int updateDoc(Master obj);
    int deleteDoc(Master obj); 
	
}