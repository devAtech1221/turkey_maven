package model.system.master.pipeline;

import common.Paging;
import model.system.master.standardProcess.StandardProcess;
import mybatis.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class PipelineDao {
	private static PipelineDao instance = new PipelineDao();
	private SqlSessionFactory sqlMapper;
	private int noOfRecords;
	
	public static PipelineDao getInstance() { return instance; }
	public PipelineDao () { sqlMapper = SqlSessionManager.getSqlSession(); }
    public int getNoOfRecords () { return noOfRecords; }
    public void setNoOfRecords ( int noOfRecords ) { this.noOfRecords = noOfRecords; }
    
    private final Logger logger = LoggerFactory.getLogger(PipelineDao.class);
    
    public List<Pipeline> selectList(Paging paging) {
        List<Pipeline> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	PipelineMapper mapper = session.getMapper(PipelineMapper.class);
            list = mapper.selectList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[PipelineDao] : selectList : {}", e);
        } finally {
            session.close();
        }

        return list;
    }
    
    public Pipeline selectDoc(Pipeline code){
        SqlSession session = sqlMapper.openSession();
        Pipeline obj = null;
        
        try{
        	PipelineMapper mapper = session.getMapper(PipelineMapper.class);
        	obj = mapper.selectDoc(code);
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[PipelineDao] : selectDoc : {}", e);
        } finally {
            session.close();
        }
        return obj;
    } 
    
    public List<Pipeline> selectDetailList(Paging paging) {
        List<Pipeline> list = null;
        SqlSession session = sqlMapper.openSession();

        try {
        	PipelineMapper mapper = session.getMapper(PipelineMapper.class);
            list = mapper.selectDetailList(paging);
            this.noOfRecords = mapper.selectTotalRecords();
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[PipelineDao] : selectDetailList : {}", e);
        } finally {
            session.close();
        }

        return list;
    }
    
    public List<StandardProcess> selectProcessList(Paging paging){
        SqlSession session = sqlMapper.openSession();
        List<StandardProcess> list = null;
        
        try{
        	PipelineMapper mapper = session.getMapper(PipelineMapper.class);
        	list = mapper.selectProcessList(paging);
        } catch ( Exception e ) {
        	e.printStackTrace();
            logger.error ("Error[PipelineDao] : selectProcessList : {}", e);
        } finally {
            session.close();
        }
        return list;
    } 
    
    public boolean insertDoc(Pipeline obj, List<Pipeline> detail){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	PipelineMapper mapper = session.getMapper(PipelineMapper.class);
        	
        	//doc
        	appliedCNT = mapper.insertDoc(obj);
        	if(appliedCNT == 0) throw new Exception();

        	//Detail
        	appliedCNT = 0;
        	if(detail != null && !detail.isEmpty()) {
        		for(Pipeline dtl : detail) {
        			dtl.setPIPELINE_CD(obj.getPIPELINE_CD());
        		}
            	appliedCNT = mapper.insertDetail(detail);
            	if(detail.size() != appliedCNT) throw new Exception();
        	}
            session.commit();
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[PipelineDao] : insertDoc {}: ", e);
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean updateDoc(Pipeline obj, List<Pipeline> detail){
        SqlSession session = sqlMapper.openSession();
        int appliedCNT = 0;
        
        try{
        	PipelineMapper mapper = session.getMapper(PipelineMapper.class);
        	
        	//doc
        	appliedCNT = mapper.updateDoc(obj);
        	if(appliedCNT == 0) throw new Exception();

        	//Detail
        	appliedCNT = 0;
        	if(detail != null && !detail.isEmpty()) {
        		for(Pipeline dtl : detail) {
        			dtl.setPIPELINE_CD(obj.getPIPELINE_CD());
        		}
        		mapper.deleteDetail(obj);
            	appliedCNT = mapper.insertDetail(detail);
            	if(detail.size() != appliedCNT) throw new Exception();
        	}
            session.commit();
        }catch (Exception e) {
            session.rollback();
            logger.error ("Error[PipelineDao] : updateDoc : {}" ,e);
            return false;
        }finally {
            session.close();
        }
        return true;
    }
    
    public boolean deleteDoc(Pipeline obj){
        SqlSession session = sqlMapper.openSession();

        try{
        	PipelineMapper mapper = session.getMapper(PipelineMapper.class);
            mapper.deleteDoc(obj);
            session.commit();
            
        }catch (Exception e) {
            session.rollback();
            System.out.println("Error[PipelineDao] : deleteDoc : " + e.toString());
            return false;
        }finally {
            session.close();
        }        
        return true;
    }
}
