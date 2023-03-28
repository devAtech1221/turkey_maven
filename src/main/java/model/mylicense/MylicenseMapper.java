package model.mylicense;

import common.Paging;
import model.management.license.License;
import model.system.user.user.User;

import java.util.HashMap;
import java.util.List;

public interface MylicenseMapper {
	int selectTotalRecords();
	List<Mylicense> selectMylicenseList(User user);
	int insert(Mylicense obj);

	Mylicense selectDoc(String id);
	int editInfo(User user);
	int editPass(User user);
}
