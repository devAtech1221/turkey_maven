<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="" %>
<%@ page import="common.*" %>
<%
	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	response.setHeader("Expires", "0"); // Proxies.
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta http-equiv="content-type" content="text/html;charset=UTF-8" />

	<title><%=Config.strSiteName%> - 404 Error</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta content="" name="description" />
	<meta content="" name="atech" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:900" rel="stylesheet">
</head>

<style>
	* {
	  -webkit-box-sizing: border-box;
	          box-sizing: border-box;
	}	
	body {
	  padding: 0;
	  margin: 0;
	}	
	#notfound {
	  position: relative;
	  height: 100vh;
	}	
	#notfound .notfound {
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  -webkit-transform: translate(-50%, -50%);
	      -ms-transform: translate(-50%, -50%);
	          transform: translate(-50%, -50%);
	}	
	.notfound {
	  max-width: 520px;
	  width: 100%;
	  line-height: 1.4;
	  text-align: center;
	}	
	.notfound .notfound-404 {
	  position: relative;
	  height: 240px;
	}	
	.notfound .notfound-404 h1 {
	  font-family: 'Montserrat', sans-serif;
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  -webkit-transform: translate(-50%, -50%);
	      -ms-transform: translate(-50%, -50%);
	          transform: translate(-50%, -50%);
	  font-size: 252px;
	  font-weight: 900;
	  margin: 0px;
	  color: #262626;
	  text-transform: uppercase;
	  letter-spacing: -40px;
	  margin-left: -20px;
	}	
	.notfound .notfound-404 h1>span {
	  text-shadow: -8px 0px 0px #fff;
	}	
	.notfound .notfound-404 h3 {
	  font-family: 'Cabin', sans-serif;
	  position: relative;
	  font-size: 16px;
	  font-weight: 700;
	  text-transform: uppercase;
	  color: #262626;
	  margin: 0px;
	  letter-spacing: 3px;
	  padding-left: 6px;
	}	
	.notfound h2 {
	  font-family: 'Cabin', sans-serif;
	  font-size: 20px;
	  font-weight: 400;
	  text-transform: uppercase;
	  color: #000;
	  margin-top: 0px;
	  margin-bottom: 25px;
	}	
	@media only screen and (max-width: 767px) {
	  .notfound .notfound-404 {
	    height: 200px;
	  }
	  .notfound .notfound-404 h1 {
	    font-size: 200px;
	  }
	}	
	@media only screen and (max-width: 480px) {
	  .notfound .notfound-404 {
	    height: 162px;
	  }
	  .notfound .notfound-404 h1 {
	    font-size: 162px;
	    height: 150px;
	    line-height: 162px;
	  }
	  .notfound h2 {
	    font-size: 16px;
	  }
	}
</style>

<body>
	<div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h3><%=Config.strSiteName%></h3>
				<h1><span>4</span><span>0</span><span>4</span></h1>
			</div>
			<h2>Page Not Found</h2>
		</div>
	</div>
</body>
</html>