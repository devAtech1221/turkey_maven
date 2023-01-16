package model.main;

import common.AES256Util;
import common.Config;
import common.MessageHandler;
import model.management.license.License;
import model.system.user.user.UserMapper;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
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
	
	public List<Solution> selectSolutionList(HttpServletRequest request) {
		List<Solution> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	MainMapper mapper = session.getMapper(MainMapper.class);
			MessageHandler mh = MessageHandler.getInstance();
			list = mapper.selectSolutionList()
					.stream()
					.map(solution -> {
						if (mh.equals("ko")) {
							solution.setSolution_name(solution.getSolution_name_ko());
						}

						List<Detail> details = mapper.selectDetailList(solution.getSolution_id())
								.stream()
								.map(detail -> {
									if (mh.equals("ko")) {
										detail.setContents(detail.getContents_ko());
									}
									return detail;
								}).collect(Collectors.toList());

						List<LicenseInfo> licenseInfoList = mapper.selectLicenseList(solution.getSolution_id())
								.stream()
								.map(licenseInfo -> {
									if (mh.equals("ko")) {
										licenseInfo.setType(licenseInfo.getType_ko());
										licenseInfo.setCustom(licenseInfo.getCustom_ko());
									}
									return licenseInfo;
								}).collect(Collectors.toList());

						solution.setDetail(details);
						solution.setLicense(licenseInfoList);

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
