<?php
header("content-type:text/html;charset=utf8");


//操作数据库
function querySql($type,$sqlStr){
    $mysql_server_name = '120.77.249.41';   //数据库服务器
    $mysql_username = 'root';           //数据库用户名
    $mysql_password = 'root';               //数据库密码
    $mysql_database = 'test';           //数据库名

    $conn = @mysql_connect($mysql_server_name,$mysql_username,$mysql_password)  or die(mysql_error());
    @mysql_select_db($mysql_database,$conn) or die(mysql_error());
    $query = mysql_query($sqlStr) or die(mysql_error());
    mysql_close();  //关闭MySQL连接

    //查询
    if($type == 'query'){
        $result = array();
        while($thread=mysql_fetch_assoc($query)){
            $result[] = $thread;
        }
        return $result;
    }else if($type == 'insert' || $type == 'delete' || $type == 'update'){
        return $query;
    }
    
}

?>