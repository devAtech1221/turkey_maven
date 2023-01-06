package model.log;

import common.Paging;

import java.util.List;

public interface LogMapper {
    int selectTotalRecords();//Get a number of rows after a select query with SQL_CALC_FOUND_ROWS
    
    /*
     * LOG
     */
    List<LogLogin> selectLogLogin(Paging paging);
    
    LogAccess getLogAccess(String SESS_KEY);
    AutoAccess getAutoAccess(AutoAccess info);
    int isExistAutoAccess(AutoAccess info);
    
    int insertLogAccess(LogAccess info);
    int insertLogLogin(LogLogin info);
    
    int insertAutoAccess(AutoAccess info);
    int deleteAutoAccess(AutoAccess info);
    
    int updateLastCheckedDateAutoAccess(AutoAccess info);
}
