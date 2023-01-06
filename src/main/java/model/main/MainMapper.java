package model.main;

import common.Paging;

import java.util.List;

public interface MainMapper {
	int selectTotalRecords();
	List<Solution> selectSolutionList();
    List<Detail> selectDetailList(String solutionId);
    List<LicenseInfo> selectLicenseList(String solutionId);
}
