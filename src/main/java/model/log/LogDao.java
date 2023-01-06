package model.log;

import common.Paging;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class LogDao {
    private static LogDao instance = new LogDao();
    private SqlSessionFactory sqlMapper;
    private int noOfRecords;
    
    public static LogDao getInstance(){
        return instance;
    }
    
    public LogDao(){
        sqlMapper = SqlSessionManager.getSqlSession();
    }

    public int getNoOfRecords() {
        return noOfRecords;
    }

    public void setNoOfRecords(int noOfRecords) {
        this.noOfRecords = noOfRecords;
    }

    /*
     * SELECT LOGIN LOG
     */
    public List<LogLogin> selectLoginLog(Paging paging){
        List<LogLogin> list = null;
        SqlSession session = sqlMapper.openSession();
        
        try{
            LogMapper mapper = session.getMapper(LogMapper.class);
            list = mapper.selectLogLogin(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        }catch(Exception e){
            System.out.println("Error[LogDAO] : selectLoginLog : " + e.toString());
        }finally{
            session.close();
        }
        return list;
    }
    
    /* 
     * GET AUTO ACCESS INFO
     */
	public AutoAccess getAutoAccess(AutoAccess info) {
		AutoAccess obj;
		SqlSession session = sqlMapper.openSession();

		try{
			LogMapper mapper = session.getMapper(LogMapper.class);
			obj = mapper.getAutoAccess(info);
		}finally {
			session.close();
		}
		return obj;
	}
	
	/* 
     * GET EXIST AUTO ACCESS INFO
     */
	public int isExistAutoAccess(AutoAccess info) {
		AutoAccess obj;
		SqlSession session = sqlMapper.openSession();
        int cnt = 0;

		try{
			LogMapper mapper = session.getMapper(LogMapper.class);
			cnt = mapper.isExistAutoAccess(info);
		}finally {
			session.close();

		}
		return cnt;
	}

    /*
     * INSERT ACCESS LOG
     */
    public boolean insertAccessLog(LogAccess info){
        SqlSession session = sqlMapper.openSession();

        try{
            LogMapper mapper = session.getMapper(LogMapper.class);
            if(mapper.getLogAccess(info.getSESSION_KEY())== null){
                mapper.insertLogAccess(info);
                session.commit();
            }
        }catch (Exception e) {
        	session.rollback();
        	System.out.println("Error[LogDAO] : insertAccessLog : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return false;
    }

    /*
     * INSERT LOGIN LOG
     */
    public boolean insertLoginLog(LogLogin info){
        SqlSession session = sqlMapper.openSession();

        try{
            LogMapper mapper = session.getMapper(LogMapper.class);
            mapper.insertLogLogin(info);
            session.commit();
        }catch (Exception e) {
        	session.rollback();
        	System.out.println("Error[LogDAO] : insertLoginLog : " + e.toString());
            return false;
        }finally {
            session.close();
        }
        return false;
    }
    
    /*
     * INSERT AUTO ACCESS
     */
    public boolean insertAutoAccess(AutoAccess info){
    	SqlSession session = sqlMapper.openSession();

		try{
			LogMapper mapper = session.getMapper(LogMapper.class);
			mapper.insertAutoAccess(info);
			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[LogDAO] : insertAutoAccess : " + e.toString());
			return false;
		}finally {
			session.close();
		}
		return true;
    }
    
    /*
     * DELETE AUTO ACCESS
     */
    public boolean deleteAutoAccess(AutoAccess info){
    	SqlSession session = sqlMapper.openSession();

		try{
			LogMapper mapper = session.getMapper(LogMapper.class);
			mapper.deleteAutoAccess(info);
			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[LogDAO] : deleteAutoAccess : " + e.toString());
			return false;
		}finally {
			session.close();
		}
		return true;
    }

    /*
     * UPDATE AUTO ACCESS LAST DATE
     */
    public boolean updateLastCheckedDateAutoAccess(AutoAccess info){
		SqlSession session = sqlMapper.openSession();

		try{
			LogMapper mapper = session.getMapper(LogMapper.class);
			mapper.updateLastCheckedDateAutoAccess(info);
			session.commit();
		}catch (Exception e) {
			session.rollback();
			System.out.println("Error[LogDAO] : updateLastCheckedDateAutoAccess : " + e.toString());
			return false;
		}finally {
			session.close();
		}
		return true;
	}
}
