package mybatis;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;
import java.util.Properties;

public class SqlSessionManager {
    public static SqlSessionFactory sqlSession = null;

    static {
        String resource = "/mybatis/config.xml";
        String PropertiesResource = "/application.properties";
        Reader reader = null;
        Reader propertiesReader = null;
        Properties properties = new Properties();

        try {
            propertiesReader = Resources.getResourceAsReader(PropertiesResource);
            properties.load(propertiesReader);

            reader = Resources.getResourceAsReader(resource);
            sqlSession = new SqlSessionFactoryBuilder().build(reader, properties.getProperty("environment"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static SqlSessionFactory getSqlSession() {
        return sqlSession;
    }
}
