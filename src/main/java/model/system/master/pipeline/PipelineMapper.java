package model.system.master.pipeline;

import common.Paging;
import model.system.master.standardProcess.StandardProcess;

import java.util.List;

public interface PipelineMapper {
	int selectTotalRecords();
	
	List<Pipeline> selectList(Paging paging);
	List<Pipeline> selectDetailList(Paging paging);
	Pipeline selectDoc(Pipeline code);
	List<StandardProcess> selectProcessList(Paging paging);
	
	int insertDoc(Pipeline obj);
	int insertDetail(List<Pipeline> detail);
	int deleteDetail(Pipeline obj);
    int updateDoc(Pipeline obj);
    int deleteDoc(Pipeline obj); 
}
