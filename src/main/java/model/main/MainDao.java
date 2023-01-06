package model.main;

import common.AES256Util;
import common.Config;
import model.management.license.License;
import model.system.user.user.UserMapper;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.stream.Collectors;

public class MainDao {
	private static MainDao instance = new MainDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	public static MainDao getInstance(){return instance;}
	public MainDao(){sqlMapper = SqlSessionManager.getSqlSession();}
	public int getNoOfRecords(){return noOfRecords;}
	public void setNoOfRecords(int noOfRecords) {this.noOfRecords = noOfRecords;}
	private final Logger logger = LoggerFactory.getLogger(MainDao.class);
	
	public List<Solution> selectSolutionList() {
		List<Solution> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	MainMapper mapper = session.getMapper(MainMapper.class);
            list = mapper.selectSolutionList()
					.stream()
					.map(solution -> {
						List<Detail> details = mapper.selectDetailList(solution.getSolution_id());
						List<LicenseInfo> licenseInfos = mapper.selectLicenseList(solution.getSolution_id());
						solution.setDetail(details);
						solution.setLicense(licenseInfos);

						return solution;
					}).collect(Collectors.toList());
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[MainDao] : selectPlanList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }
}
