package model.management.question;

import common.Paging;
import model.management.license.License;

import java.util.HashMap;
import java.util.List;

public interface QuestionMapper {
	int selectTotalRecords();
    List<Question> selectQuestionList(Paging paging);
    int insert(Question obj);
    int changeResYn(HashMap<String,String> map);

}
