package model.system.user.user;

import common.Paging;
import model.system.master.master.Master;
import model.system.user.auth.Auth;

import java.util.List;

public interface UserMapper {
	int selectTotalRecords();
	List<User> selectList(Paging paging);
	int join(User obj);
	List<User> idDulpChk(User obj);
	List<User> emailDuplChk(User obj);
	User selectAllowedUser(User info);
	User selectDoc(String code);

}
