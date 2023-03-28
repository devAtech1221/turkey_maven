package model.management.license;

import common.Paging;
import model.main.Detail;
import model.main.LicenseInfo;
import model.main.Solution;
import model.system.user.user.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface LicenseMapper {
	int selectTotalRecords();
    List<License> selectLicenseList(Paging paging);
    List<License> selectLicenseListById(User user);
    int insert(License obj);
    int update(License obj);
    int changeResYn(HashMap<String,String> map);
}
