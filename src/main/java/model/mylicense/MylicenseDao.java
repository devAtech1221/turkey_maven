package model.mylicense;

import common.AES256Util;
import common.Config;
import common.Paging;
import model.management.license.License;
import model.management.license.LicenseMapper;
import model.system.user.user.User;
import model.system.user.user.UserMapper;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;

public class MylicenseDao {
	private static MylicenseDao instance = new MylicenseDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	public static MylicenseDao getInstance(){return instance;}
	public MylicenseDao(){sqlMapper = SqlSessionManager.getSqlSession();}
	public int getNoOfRecords(){return noOfRecords;}
	public void setNoOfRecords(int noOfRecords) {this.noOfRecords = noOfRecords;}
	private final Logger logger = LoggerFactory.getLogger(MylicenseDao.class);

	public List<Mylicense> selectMylicenseList(User user) {
		List<Mylicense> list = null;
		SqlSession session = sqlMapper.openSession();

		try {
			MylicenseMapper mapper = session.getMapper(MylicenseMapper.class);
			list = mapper.selectMylicenseList(user);
			this.noOfRecords = mapper.selectTotalRecords();
		} catch ( Exception e ) {
			e.printStackTrace();
			logger.error ("Error[MylicenseDao] : selectMylicenseList : {}", e.toString());
		} finally {
			session.close();
		}

		return list;
	}

	public Mylicense selectDoc(String id){
		SqlSession session = sqlMapper.openSession();
		Mylicense obj = null;

		try{
			MylicenseMapper mapper = session.getMapper(MylicenseMapper.class);
			obj = mapper.selectDoc(id);
		}finally {
			session.close();
		}
		return obj;
	}

	public boolean insert(Mylicense obj) {
		SqlSession session = sqlMapper.openSession();
		int appliedCNT = 0;

		try{
			MylicenseMapper mapper = session.getMapper(MylicenseMapper.class);

			appliedCNT = mapper.insert(obj);
			if(appliedCNT == 0) throw new Exception();

			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[MylicenseDao] : insert : " + e.toString());
			return false;
		}finally {
			session.close();
		}
		return true;
	}

	public boolean editInfo(User obj) {
		SqlSession session = sqlMapper.openSession();
		int appliedCNT = 0;

		try{
			MylicenseMapper mapper = session.getMapper(MylicenseMapper.class);

			appliedCNT = mapper.editInfo(obj);
			if(appliedCNT == 0) throw new Exception();

			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[MylicenseDao] : editInfo : " + e.toString());
			return false;
		}finally {
			session.close();
		}
		return true;
	}

	public boolean editPass(User obj) throws UnsupportedEncodingException, InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
		SqlSession session = sqlMapper.openSession();
		int appliedCNT = 0;
		AES256Util aes256Util = new AES256Util(Config.getEKey());
		obj.setUser_pass(aes256Util.aesEncode(obj.getUser_pass()));

		try{
			MylicenseMapper mapper = session.getMapper(MylicenseMapper.class);

			appliedCNT = mapper.editPass(obj);
			if(appliedCNT == 0) throw new Exception();

			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[MylicenseDao] : editPass : " + e.toString());
			return false;
		}finally {
			session.close();
		}
		return true;
	}
}
