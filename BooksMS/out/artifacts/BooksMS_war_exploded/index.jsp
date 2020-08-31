<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<form action="login" method="post">
		用户名:<input type="text" name="username" /><br /> 
		密码:<input type="password" name="password" /><br /> 
		<c:if test="${!empty param.username }">
				<span style="color:#FF0000">
				[${param.username }]登陆失败！</span>	
		</c:if>
		<input type="submit" value="登录" /><input type="reset" value="重置" />
		<div class="regest_wap_right">
			还没有账号？ <a class="blue"
				href="/spring-mybatis/regist.jsp">立即注册</a>
		</div>
		
	</form>
</body>
</html>