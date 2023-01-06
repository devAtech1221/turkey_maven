package common.mail;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import model.management.question.Question;
import model.mylicense.Mylicense;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class MailDto {
    private String mail_title;
    private String message;
    private String to;
    private String question_id;
    private String license_question_id;

    private Mylicense mylicense;
    private List<CustomFile> files = new ArrayList<>();

    public void setFiles(CustomFile file) {
        this.files.add(file);
    }
}
