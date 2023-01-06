package model.system.master.standardProcess;

import common.Paging;

import java.util.List;

public interface StandardProcessMapper {
int selectTotalRecords();
	
	List<StandardProcess> selectList(Paging paging);
	StandardProcess selectDoc(StandardProcess sear);
	
	int insertDoc(StandardProcess obj);
    int updateDoc(StandardProcess obj);
    int deleteDoc(StandardProcess obj);
    
    List<StandardProcess> selectListAPI(Paging paging);
}
