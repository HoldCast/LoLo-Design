<?php
header("content-type:text/html;charset=utf8");
include 'common.php';


$post = $_POST;
$type = $post['type'];
if($type == 1){
    $res = uploadImg($post);//上传
}else if($type == 2){
    $res = getImgInfo($post);//获取
}else if($type == 3){
    $res = deleteImgInfo($post);//删除
}else if($type == 4){
    
}
echo json_encode($res);

//删除
function deleteImgInfo($post){
    $id = $post['id'];
    $cover_img = $post['cover_img'];
    $content_img = $post['content_img'];
    $message = '';
    if(file_exists('../'.$cover_img)){
        if(!unlink('../'.$cover_img)){
            $message = $cover_img.'删除失败!';
        }
    }
    if(file_exists('../'.$content_img)){
        if(!unlink('../'.$content_img)){
            $message = $content_img.'删除失败!';
        }
    }
    $res['del_message'] = $message;
    $sqlStr = "delete from sub_info where id=".$id;
    $res['res'] = querySql('delete',$sqlStr);
    return $res;
}


//获取
function getImgInfo($post){
    $p_id = $post['id'];
    $sqlStr = "select * from sub_info where p_id='".$p_id."' order by id asc";
    $res['res'] = querySql('query',$sqlStr);
    return $res;
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
                if (file_exists("../upload/" . $name)){
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
        move_uploaded_file($file_k["tmp_name"],"../upload/" . $name);
        $res[$key] = "upload/" .$file_k["name"];
    }
    $res['message'] = '上传成功!';

    $p_id = $post['p_id'];   
    $cover_title = $post['cover_title'];
    $cover_info = $post['cover_info'];    
    $cover_img = $res['cover_img'];    
    $content_img = $res['content_img'];    
    $bz = $post['bz'];

    $sqlStr = "insert into sub_info (p_id,cover_title,cover_info,cover_img,content_img,bz) values ('".$p_id."','".$cover_title."','".$cover_info."','".$cover_img."','".$content_img."','".$bz."')";

    $upStatus = querySql('insert',$sqlStr);
    if($upStatus){
        $res['status'] = 'success';
    }else{
        $res['status'] = 'error';
        $res['message'] = "上传成功! 保存数据库失败!";
        $res['sql'] = $sqlStr;
        $res['sql_err'] = $upStatus;
    }
    return $res;
}

?>
