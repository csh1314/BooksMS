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
		<h2>整个list集合： ${users }</h2>
		<h2>list集合大小：${users.size()}</h2>
		<h2>第一行全部数据：${users[0] } </h2>
		
		<h2>第一行数据的id：${users[0].user_id }</h2>
	
		<h2></h2>
	
</body>
</html>