<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>注册界面</title>
</head>
<body>

	<form action="regist" method="post">
		用户名<input type="text" name="username" id="username" /><br> 密码<input
			type="password" name="password" id="username" /><br> 
			电话<input type="text" name="user_tel" id="user_tel" /><br> 
			QQ<input type="text" name="user_qq" id="user_qq" /><br> 
			邮箱<input type="text" name="user_mail" id="user_mail" /> 
			
		<input type="submit" value="注册"/><br>
	</form>
</body>
</html>