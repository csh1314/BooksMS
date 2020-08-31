<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript"
	src="${pageContext.request.contextPath }/js/jquery-1.7.2.js" type="text/javascript" charset="utf-8"></script>
<title>Insert title here</title>
<script type="text/javascript">
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "timesJson",
        dataType: "json",
       
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            alert("系统繁忙,请稍后重试!");
        }
    });
});
</script>
</head>

<body>
	 
	<strong>推荐书</strong>
	<h2>评分</h2>
	
	<h2>借阅次数</h2>
	
	<h2>猜你喜欢</h2>
	
</body>
</html>
