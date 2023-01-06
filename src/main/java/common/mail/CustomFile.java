package common.mail;

import lombok.Data;

import java.io.InputStream;

@Data
public class CustomFile {
    private InputStream inputStream;
    private String fileName;
}
