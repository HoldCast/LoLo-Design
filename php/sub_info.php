<?php
header("content-type:text/html;charset=utf8");
include 'common.php';


$post = $_POST;
$type = $post['type'];
if($type == 1){
    $res = uploadImg($post);    //上传
    echo json_encode($res);
}else if($type == 2){
    getImgInfo($post);   //获取
}else if($type == 3){

}else if($type == 4){
    
}

//获取
function getImgInfo($post){
    $sqlstr = "select * from sub_info order by id desc";
    $res['res'] = querySql('query',$sqlstr);
    $res = json_encode($res);
    echo $res;
}

//上传图片
function uploadImg($post){
    $res = array();
    $file = $_FILES;
    $res['file'] = $_FILES;
    $res['post'] = $post;
    $res['status'] = 'success';
    //循环验证
    foreach ($file as $key => $value){
        $file_k = $value;
        $fileName = $file_k['name'];
        //判断文件格式
        if (
            (($file_k["type"] == "image/gif")
            || ($file_k["type"] == "image/jpeg")
            || ($file_k["type"] == "image/png")
            || ($file_k["type"] == "image/PNG")
            || ($file_k["type"] == "image/pjpeg"))
            && ($file_k["size"] < 200000000)
        ){
            //文件错误
            if ($file_k["error"] > 0){
                $res['status'] = 'error';
                $res['message'] = $file_k["error"];
                return $res;
            }else{
                $res['file'] = $file_k;
                $name = iconv('utf-8','gb2312',$file_k["name"]); //利用Iconv函数对文件名进行重新编码
                if (file_exists("upload/" . $name)){
                    $res['status'] = 'error';
                    $res['message'] = $file_k["name"] . "已经存在";
                    return $res;
                }
            }
        }else{
            $res['status'] = 'error';
            $res['message'] = '文件类型错误';
            return $res;
        }
    }
    //循环上传
    foreach ($file as $key => $value){
        $file_k = $value;
        $fileName = $file_k['name'];
        $name = iconv('utf-8','gb2312',$file_k["name"]); //利用Iconv函数对文件名进行重新编码
        move_uploaded_file($file_k["tmp_name"],"upload/" . $name);
        $res[$key] = "upload/" .$file_k["name"];
    }
    $res['message'] = '上传成功!';

    $p_id = $post['p_id'];   
    $cover_title = $post['cover_title'];
    $cover_info = $post['cover_info'];    
    $cover_img = $res['cover_img'];    
    $content_img = $res['content_img'];    
    $bz = $post['bz'];

    $sqlstr = "insert into sub_info (p_id,cover_title,cover_info,cover_img,content_img,bz) values ('".$p_id."','".$cover_title."','".$cover_info."','".$cover_img."','".$content_img."','".$bz."')";

    $upStatus = querySql('insert',$sqlstr);
    if($upStatus){
        $res['status'] = 'success';
    }else{
        $res['status'] = 'error';
        $res['message'] = "上传成功! 保存数据库失败!";
        $res['sql'] = $sqlstr;
        $res['sql_err'] = $upStatus;
    }
    return $res;
}

?>
