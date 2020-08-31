<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript"
	src="${pageContext.request.contextPath }/js/jquery-1.7.2.js" type="text/javascript" charset="utf-8"></script>
<title>Insert title here</title>
<script type="text/javascript">
$(function(){
	$("#bk_name").blur(function () {
	            $.ajax({
	                url : "api/findbooks",
	                type : "POST",
	                dataType:"json",
	                contentType : "application/json;charset=UTF-8",
	                data : JSON.stringify({
	                    bk_name : $("#bk_name").val(),
	                }),
	                success:function(result) {
	                	console.log(result);
	                    var message= JSON.stringify(result);
	                    $("#select-box").html("查询成功" + message);
	                },
	                error:function(result){
	                    $("#select-box").html("查询失败");
	                }
	            });
	        });
	});
</script>
</head>
<body>
<h2>找书</h2>
<form class="form-horizontal" >
    <label  class="col-sm-2 control-label">请输入书名</label>

      <input type="text" class="form-control" id="bk_name" placeholder="请输入书名">

   
      <button type="button" id="select" class="btn btn-default">查找</button>
      <c:if test="${!empty param.counts }">
				<span style="color:#FF0000">
				共查询到:${param.counts}条记录</span>	
		</c:if>
</form>
<div class="panel-body">
    <h2 class="text-danger text-center">
        <!-- 用来显示查找结果 -->
        <span class="glyphicon" id="select-box"></span>
    </h2>
</div>
</body>
</html>