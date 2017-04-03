<?php
header("content-type:text/html;charset=utf8");
include 'common.php';

$post = $_POST;
$type = $post['type'];
if($type == 1){
    $res = uploadImg($post);//上传
}else if($type == 2){
    $res = getImgInfo();    //获取
}else if($type == 3){
    $res = deleteImgInfo($post);
}else if($type == 4){
    
}else if($type == 5){
    $id = $post['id'];
    $res = getImgInfoByID($id);
}

echo json_encode($res);


//删除
function deleteImgInfo($post){
    $id = $post['id'];
    $img = $post['path'];
    $message = '';
    if(file_exists('../'.$img)){
        if(!unlink('../'.$img)){
            $message = $img.'删除失败!';
        }
    }

    /*$cover_img = $post['cover_img'];
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
    }*/
    $res['del_message'] = $message;
    $sqlStr = "delete from home_info where id=".$id;
    $res['res'] = querySql('delete',$sqlStr);
    return $res;
}

//获取
function getImgInfo(){
    $sqlStr = "select * from home_info order by id asc";
    $res['res'] = querySql('query',$sqlStr);
    return $res;
}

//获取by ID
function getImgInfoByID($id){
    $sqlStr = "select * from home_info where id='".$id."'";
    $res['res'] = querySql('query',$sqlStr);
    return $res;
}



//上传图片
function uploadImg($post){
    $res = array();
    $file = $_FILES;
    $res['file'] = $_FILES;
    $file_k = $file['file'];
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
        }else{

            $res['file'] = $file_k;
            $name = iconv('utf-8','gb2312',$file_k["name"]); //利用Iconv函数对文件名进行重新编码
            if (file_exists("../upload/" . $name)){
                $res['status'] = 'error';
                $res['message'] = $file_k["name"] . "已经存在";
            }else{
                move_uploaded_file($file_k["tmp_name"],"../upload/" . $name);
                $res['file']['path'] = "upload/" .$file_k["name"];
                $res['message'] = '上传成功!';
                $mc = $post['mc'];
                $type = $post['type'];
                $path = $res['file']['path'];
                $bz = $post['bz'];
                $sqlStr = "insert into home_info (mc,type,path,bz) values ('".$mc."','".$type."','".$path."','".$bz."')";
                $upStatus = querySql('insert',$sqlStr);
                if($upStatus){
                    $res['status'] = 'success';
                }else{
                    $res['status'] = 'error';
                    $res['message'] = "上传成功! 保存数据库失败!";
                    $res['sql_err'] = $upStatus;
                    $res['sql'] = $sqlStr;
                }
            }
        }
    }else{
        $res['status'] = 'error';
        $res['message'] = '文件类型错误';
    }
    return $res;
}





?>
