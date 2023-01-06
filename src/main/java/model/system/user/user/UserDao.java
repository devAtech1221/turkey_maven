package model.system.user.user;

import common.AES256Util;
import common.Config;
import common.Paging;
import common.mail.SendMail;
import model.system.master.master.Master;
import model.system.user.auth.Auth;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.UUID;

public class UserDao {
	private static UserDao instance = new UserDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	
	public static UserDao getInstance() { return instance; }
	public UserDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    
    private final Logger logger = LoggerFactory.getLogger(UserDao.class);
    
    
    public List<User> selectList(Paging paging) {
        List<User> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	UserMapper mapper = session.getMapper(UserMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[UserDao] : selectList : {}", e.toString());
        } finally {
            session.close();
        }

        return list;
    }

    public boolean join(User obj){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;

        try{
            UserMapper mapper = session.getMapper(UserMapper.class);

            AES256Util aes256Util = new AES256Util(Config.getEKey());
            obj.setUser_pass(aes256Util.aesEncode(obj.getUser_pass()));

            appliedCNT = mapper.join(obj);
            if(appliedCNT == 0) throw new Exception();

            session.commit();
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[UserDAO] : insertUser : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return true;
    }

    public boolean idDulpChk(User obj){
        SqlSession session = sqlMapper.openSession();

        try{
            UserMapper mapper = session.getMapper(UserMapper.class);
            List<User> user = mapper.idDulpChk(obj);

            if(user.size() != 0) throw new Exception();
            session.commit();

        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[UserDAO] : idDulpChk : " + e.toString());
            return false;

        }finally {
            session.close();
        }

        return true;
    }

    public boolean emailDuplChk(User obj){
        SqlSession session = sqlMapper.openSession();

        try{
            UserMapper mapper = session.getMapper(UserMapper.class);
            List<User> user = mapper.emailDuplChk(obj);

            if(user.size() != 0) throw new Exception();
            session.commit();

        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[UserDAO] : emailDuplChk : " + e.toString());
            return false;

        }finally {
            session.close();
        }

        return true;
    }

    public User selectAllowedUser(User info){
        SqlSession session = sqlMapper.openSession();
        User obj;
        try{
            UserMapper mapper = session.getMapper(UserMapper.class);
            obj = mapper.selectAllowedUser(info);
        }finally {
            session.close();
        }
        return obj;
    }

    public User selectDoc(String code){
        SqlSession session = sqlMapper.openSession();
        User obj = null;

        try{
            UserMapper mapper = session.getMapper(UserMapper.class);
            obj = mapper.selectDoc(code);
        }finally {
            session.close();
        }
        return obj;
    }
}
