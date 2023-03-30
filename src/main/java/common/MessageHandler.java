package common;

import lombok.Setter;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import java.util.HashMap;
import java.util.Locale;
import java.util.Set;

@Setter
public class MessageHandler extends ReloadableResourceBundleMessageSource{

    private static MessageHandler instance = new MessageHandler();

    private Locale locale;

    public static MessageHandler getInstance() {
        return instance;
    }

    public Locale getLocale() {
        return locale;
    }

    public MessageHandler() {
        setBasename("message");
        setDefaultEncoding("UTF-8");
        setAlwaysUseMessageFormat(true);
        setUseCodeAsDefaultMessage(true);
        setFallbackToSystemLocale(true);

        Locale defaultLang= new Locale("tr");
        setDefaultLocale(defaultLang);
        this.locale = defaultLang;
    }

    public String code(String code) {
        return getMessage(code, null, this.locale);
    }

    public String code(String code, String... args) {
        return getMessage(code, args, null);
    }

    public String code(String code, Locale locale, String... args) {
        return getMessage(code, args, locale);
    }

    public HashMap<String,String> getMessages(Locale locale) {
        HashMap<String,String> list = new HashMap<>();
        PropertiesHolder mergedProperties = getMergedProperties(locale);
        Set<Object> objects = mergedProperties.getProperties().keySet();

        for (Object object : objects) {
            list.put((String)object,code((String)object));
        }

        return list;
    }

    public HashMap<String,String> getMessages() {
        HashMap<String,String> list = new HashMap<>();
        System.out.println(this.locale);
        PropertiesHolder mergedProperties = getMergedProperties(this.locale);
        Set<Object> objects = mergedProperties.getProperties().keySet();

        for (Object object : objects) {
            list.put((String)object,code((String)object));
        }

        return list;
    }

    @Override
    public boolean equals(Object obj) {
        return locale.toString().equals((String) obj);
    }
}
