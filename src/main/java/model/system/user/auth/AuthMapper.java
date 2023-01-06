package model.system.user.auth;

import common.Paging;

import java.util.List;

public interface AuthMapper {
	int selectTotalRecords();
	
	List<Auth> selectList(Paging paging);
	Auth selectDoc(String code);
	
	int insertDoc(Auth obj);
    int updateDoc(Auth obj);
    int deleteDoc(Auth obj); 
    
    List<AuthDetail> selectDocDetailList(String code);
    int insertDocDetailList(List<AuthDetail> authDetailList);
    int deleteDocDetailAll(Auth obj);
    
//    Auth selectAllowedUser(Auth info);
}
