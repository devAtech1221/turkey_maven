package model.management.license;

import common.AES256Util;
import common.Config;
import common.Paging;
import model.main.Detail;
import model.main.LicenseInfo;
import model.main.MainMapper;
import model.main.Solution;
import model.management.question.QuestionMapper;
import model.system.user.user.UserMapper;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class LicenseDao {
	private static LicenseDao instance = new LicenseDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	public static LicenseDao getInstance(){return instance;}
	public LicenseDao(){sqlMapper = SqlSessionManager.getSqlSession();}
	public int getNoOfRecords(){return noOfRecords;}
	public void setNoOfRecords(int noOfRecords) {this.noOfRecords = noOfRecords;}
	private final Logger logger = LoggerFactory.getLogger(LicenseDao.class);

	public List<License> selectLicenseList(Paging paging) {
		List<License> list = null;
		SqlSession session = sqlMapper.openSession();

		try {
			LicenseMapper mapper = session.getMapper(LicenseMapper.class);
			list = mapper.selectLicenseList(paging);
			logger.info("selectLicenseList {} " , list);
			this.noOfRecords = mapper.selectTotalRecords();
		} catch ( Exception e ) {
			e.printStackTrace();
			logger.error ("Error[MainDao] : selectLicenseList : {}", e.toString());
		} finally {
			session.close();
		}

		return list;
	}

	public boolean insert(License obj) {
		SqlSession session = sqlMapper.openSession();
		int appliedCNT = 0;

		try{
			LicenseMapper mapper = session.getMapper(LicenseMapper.class);

			appliedCNT = mapper.insert(obj);
			if(appliedCNT == 0) throw new Exception();

			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[LicenseDAO] : insert : " + e.toString());
			return false;
		}finally {
			session.close();
		}
		return true;
	}

	public boolean changeResYn(String resYn, String license_question_id) {
		SqlSession session = sqlMapper.openSession();
		int appliedCNT = 0;

		try{
			LicenseMapper mapper = session.getMapper(LicenseMapper.class);
			HashMap<String, String> map = new HashMap<>();
			map.put("resYn",resYn);
			map.put("license_question_id",license_question_id);
			appliedCNT = mapper.changeResYn(map);
			if(appliedCNT == 0) throw new Exception();

			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[LicenseDao] : insert : " + e.toString());
			return false;
		}finally {
			session.close();
		}

		return true;
	}
}
