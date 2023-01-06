#### 221124 FCT_SERVER 테이블 DB_SERVER, WAS_SERVER 컬럼 추가
```sql
ALTER TABLE FCT_SERVER ADD COLUMN DB_SERVER VARCHAR(50) DEFAULT NULL COMMENT 'DB 서버';
ALTER TABLE FCT_SERVER ADD COLUMN WAS_SERVER VARCHAR(50) DEFAULT NULL COMMENT 'WAS 서버';
```

## 220711 FCT_MINUTES 테이블 EDITABLE 컬럼 추가
`EDITABLE CHAR(1) DEFAULT 'Y' NOT NULL 수정가능여부`


# BizAtech SSL 인증서 추가(220617)

## **인증서 추가 명령어**
```certbot certonly --webroot -w /usr/local/apache-tomcat-8.5.31/webapps/biz -d biz.atech1221.com```

## **인증서 경로**
```/etc/letsencrypt/live/biz.atech1221.com-0001/```

cert.pem

chain.pem

fullchain.pem

privkey.pem

## **톰캣 ssl 인증서 적용 및 http2 적용**
```/usr/local/apache/server.xml``` 수정
```
<Connector port="80" protocol="HTTP/1.1"
            connectionTimeout="20000"
            redirectPort="443" />

<Connector port="443" protocol="org.apache.coyote.http11.Http11NioProtocol"
maxThreads="150" SSLEnabled="true" defaultSSLHostConfigName="biz.atech1221.com">
    <UpgradeProtocol className="org.apache.coyote.http2.Http2Protocol" />
    <SSLHostConfig hostName="biz.atech1221.com">

        <Certificate
            certificateKeyFile="/etc/letsencrypt/live/biz.atech1221.com-0001/privkey.pem"
            certificateFile="/etc/letsencrypt/live/biz.atech1221.com-0001/cert.pem"
            certificateChainFile="/etc/letsencrypt/live/biz.atech1221.com-0001/fullchain.pem"
            type="RSA" />

    </SSLHostConfig>
</Connector>
```
## **220617 인증서 자동 갱신(crontab) 추가**
```0 4 1 3,6,9,12 * /usr/bin/certbot certonly --webroot --force-renew -w /usr/local/apache-tomcat-8.5.31/webapps/biz -d biz.atech1221.com```

## **비즈에이텍 https로 자동 리다이렉트**
https 리다이렉트

http://gitlab.atech1221.com/dev/t1/bizatech/-/commit/526ebb58e4897cf8363d158ea26ab65e0b45acf7

웹소켓 wss 리다이렉트

http://gitlab.atech1221.com/dev/t1/bizatech/-/commit/65462d62bdaaf564e0dfaa8dabede6c43e5183a8

## 220708 서버관리 메뉴 => 서비스관리 메뉴로 변경 및 데이터적재
##### FCT_SERVER TABLE 변경
```sql
-- USE_YN 컬럼 추가 DEFAULT 'Y' CHAR(1)
-- ROOT_SERVER => 사업년도
-- TITLE => 서비스명
-- SERVER_P => 사업년도
```

##### SYS_MENU TABLE UPDATE
```sql
UPDATE `SYS_MENU` SET `MENU_NM`='서비스관리' WHERE  `MENU1_CD`=5 AND `MENU2_CD`=4 AND `MENU3_CD`=0;
```

## **220706 SQL 수정**
```회의록 LOOKUP 길이``` 수정
CHAR(50) -> CHAR(1)

ALTER TABLE FCT_MINUTES MODIFY LOOKUP CHAR(1)

## **220711 SQL 수정**
```회의록 컬럼명``` 수정
LOOKUP -> EDITABLE

ALTER TABLE FCT_MINUTES RENAME COLUMN LOOKUP TO EDITABLE
