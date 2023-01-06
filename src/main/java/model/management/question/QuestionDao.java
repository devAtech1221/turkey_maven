package model.management.question;

import common.Paging;
import model.management.license.License;
import model.management.license.LicenseMapper;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;

public class QuestionDao {
	private static QuestionDao instance = new QuestionDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	public static QuestionDao getInstance(){return instance;}
	public QuestionDao(){sqlMapper = SqlSessionManager.getSqlSession();}
	public int getNoOfRecords(){return noOfRecords;}
	public void setNoOfRecords(int noOfRecords) {this.noOfRecords = noOfRecords;}
	private final Logger logger = LoggerFactory.getLogger(QuestionDao.class);

	public List<Question> selectQuestionList(Paging paging) {
		List<Question> list = null;
		SqlSession session = sqlMapper.openSession();

		try {
			QuestionMapper mapper = session.getMapper(QuestionMapper.class);
			list = mapper.selectQuestionList(paging);
			logger.info("selectQuestionList {} " , list);
			this.noOfRecords = mapper.selectTotalRecords();
		} catch ( Exception e ) {
			e.printStackTrace();
			logger.error ("Error[questionDAO] : {}", e.toString());
		} finally {
			session.close();
		}

		return list;
	}

	public boolean insert(Question obj) {
		SqlSession session = sqlMapper.openSession();
		int appliedCNT = 0;

		try{
			QuestionMapper mapper = session.getMapper(QuestionMapper.class);

			appliedCNT = mapper.insert(obj);
			if(appliedCNT == 0) throw new Exception();

			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[QuestionDAO] : insert : " + e.toString());
			return false;
		}finally {
			session.close();
		}

		return true;
	}

	public boolean changeResYn(String resYn, String question_id) {
		SqlSession session = sqlMapper.openSession();
		int appliedCNT = 0;

		try{
			QuestionMapper mapper = session.getMapper(QuestionMapper.class);
			HashMap<String, String> map = new HashMap<>();
			map.put("resYn",resYn);
			map.put("question_id",question_id);
			appliedCNT = mapper.changeResYn(map);
			if(appliedCNT == 0) throw new Exception();

			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[QuestionDAO] : insert : " + e.toString());
			return false;
		}finally {
			session.close();
		}

		return true;
	}
}
