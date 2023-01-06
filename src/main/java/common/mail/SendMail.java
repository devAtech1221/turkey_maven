package common.mail;

import handler.management.QuestionHandler;
import model.mylicense.Mylicense;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Properties;
import java.util.Random;

public class SendMail {
	static Properties mailServerProperties;
	static Session getMailSession;
	static MimeMessage generateMailMessage;
	private static final String FROM_ADDRESS = "dev@atech1221.com";
	private static final String FROM_PASS = "Dpdlxpzm1221!@";
	private String authCode;
	Logger log = LoggerFactory.getLogger(SendMail.class);
	private static SendMail instance = new SendMail();
	public static SendMail getInstance() {
		return instance;
	}
	private SendMail() {createKey();}

	public boolean send(MailDto mailDto) {
		// 프로퍼티 설정
		mailServerProperties = System.getProperties();
		mailServerProperties.put("mail.smtp.host", "ezsmtp.bizmeka.com");
		mailServerProperties.put("mail.smtp.port", 25);
		mailServerProperties.put("mail.smtp.auth", "true");
		mailServerProperties.put("mail.smtp.starttls.enable", "true");
		mailServerProperties.put("mail.transport.protocol", "smtp");

		try {
			// 메일 설정
			getMailSession = Session.getDefaultInstance(mailServerProperties, null);
			generateMailMessage = new MimeMessage(getMailSession);
			generateMailMessage.setFrom(new InternetAddress(FROM_ADDRESS));
			generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(mailDto.getTo()));
			generateMailMessage.setSubject(mailDto.getMail_title(),"utf-8");

			// body 설정
			Multipart multipart = new MimeMultipart();
			MimeBodyPart part = new MimeBodyPart();
			part.setContent(mailDto.getMessage(), "text/html; charset=utf-8");
			multipart.addBodyPart(part);

			// 파일 설정
			for (CustomFile file : mailDto.getFiles()) {
				MimeBodyPart filePart = new MimeBodyPart();
				File tempFile = File.createTempFile(String.valueOf(file.getInputStream().hashCode()), ".tmp");
				tempFile.deleteOnExit();
				FileDataSource fileDataSource = new FileDataSource(tempFile.getAbsolutePath());
				filePart.setDataHandler(new DataHandler(fileDataSource));
				multipart.addBodyPart(filePart);
			}

			generateMailMessage.setContent(multipart);

			// 전송
			Transport.send(generateMailMessage,FROM_ADDRESS,FROM_PASS);
		} catch (MessagingException e) {
			log.info("SendMail error {}",e.getMessage());
			return false;
		} catch (IOException e) {
			log.info("SendMail error {}",e.getMessage());
			return false;
		}

		return true;
	}

	public void sendCodeMail(String to) throws MessagingException, IOException {
		createKey();
		String html = createMailAuthHTML();
		MailDto mailDto = new MailDto();
		mailDto.setMail_title("인증코드입니다.");
		mailDto.setTo(to);
		mailDto.setMessage(html);
		send(mailDto);
	}

	public String createLicenseHTML(Mylicense mylicense, MailDto mailDto) {
		StringBuffer html = new StringBuffer();
		html.append("   <div style=\"width: 100%; padding: 8px; font-size: 12px;\"> ");
		html.append("       <div style=\"word-break: break-all;\">" + mailDto.getMessage() + "</div> ");
		html.append("       <div style=\"margin: 12px auto; font-size: 12px; font-weight: bold;\"> ");
		html.append("           <div>솔루션 계정 : <span>" + mylicense.getSite_id() + "</span></div> ");
		html.append("           <div>솔루션 URL : <span>" + mylicense.getSite_pass() + "</span></div> ");
		html.append("           <div>솔루션 비밀번호 : <a  href=\"" + mylicense.getSite_url() + "\" target=\"_blank\"> 바로가기 </a></div> ");
		html.append("       </div> ");
		html.append("   </div> ");

		return html.toString();
	}

	public String createMailHTML(MailDto mailDto) {
		StringBuffer html = new StringBuffer();
		html.append("   <div style=\"width: 100%; padding: 8px; font-size: 12px;\"> ");
		html.append("       <div style=\"word-break: break-all;\">" + mailDto.getMessage() + "</div> ");
		html.append("   </div> ");

		return html.toString();
	}

	public String createMailAuthHTML() {
		StringBuffer html = new StringBuffer();

		html.append("<div align='center' style='border:1px solid black; font-family:verdana';>");
		html.append("<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>");
		html.append("<div style='font-size:130%'>");
		html.append("CODE : <strong>");
		html.append(authCode + "</strong><div><br/> ");

		return html.toString();
	}

	public void createKey() {
		StringBuffer key = new StringBuffer();
		Random rnd = new Random();

		for (int i = 0; i < 8; i++) { // 인증코드 8자리
			int index = rnd.nextInt(3); // 0~2 까지 랜덤

			switch (index) {
				case 0:
					key.append((char) ((int) (rnd.nextInt(26)) + 97));
					//  a~z  (ex. 1+97=98 => (char)98 = 'b')
					break;
				case 1:
					key.append((char) ((int) (rnd.nextInt(26)) + 65));
					//  A~Z
					break;
				case 2:
					key.append((rnd.nextInt(10)));
					// 0~9
					break;
			}
		}

		this.authCode = key.toString();
	}

	public boolean check(String code) {
		log.info("인증코드 {}", authCode);
		log.info("입력받은 코드 {}",code);
		if(code.equals(authCode)) {
			createKey();

			return true;
		}

		return false;
	}
}
