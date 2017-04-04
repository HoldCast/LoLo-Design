var dataId = getPageParam('data_id');

$(function(){
    getSubInfo(dataId,true);
    addImg(dataId);   //新增图片
});

function addImg(dataId){
    $('#addBtn').off('click').on('click',function(){
        $('#addCover').show();
    });
    $('#backBtn').off('click').on('click',function(){
        history.go(-1);
    });
    $('#cancel').off('click').on('click',function(){
        $('#addCover').hide();
    });
    submitImg('save','img_form',dataId);   //绑定保存事件
}

//保存图片信息
function submitImg(submit_id,form_id,dataId){
    $("#"+submit_id).off('click').on("click",function(){
        var coverImg = $('#cover_img').val();
        var contentImg = $('#content_img').val();
        if(coverImg == '' || contentImg == ''){
            alert('请添加图片!');
            return false;
        }else if(coverImg == contentImg){
            alert("请勿上传相同图片!");
            return false;
        }else if(!/.(gif|jpg|jpeg|png|GIF|JPG|png|PNG)$/.test(coverImg)){
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return false;
        }else if(!/.(gif|jpg|jpeg|png|GIF|JPG|png|PNG)$/.test(contentImg)){
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return false;
        }else{
            //获取图片宽高
            //var image = new Image();
            //image.src = img_val;
            loading('open');
            $("#"+form_id).ajaxSubmit({
                xhrFields:{withCredentials:true},
                crossDomain:true,
                type:'post',
                url:'../php/sub_info.php',
                dataType:'json',
                data:{type:1,p_id:dataId},
                success:function(json){
                    console.log('success:',json);
                    if(json.status == 'success'){
                        $('#addCover').hide();
                        getSubInfo(dataId,false);
                    }else if(json.status == 'error'){
                        loading('close');
                        alert(json.message);
                    }
                },
                error:function(){
                    alert('主页面保存数据后台出错!');
                }
            });
        }
    });
}

//获取信息
function getSubInfo(dataId,type){
    if(type){
        //获取主项信息
        $.ajax({
            xhrFields:{withCredentials:true},
            crossDomain:true,
            type:'post',
            url: '../php/home_info.php',
            dataType:'json',
            data: {type:5,id: dataId},
            success:function(json){
                console.log('主项信息:',json);
                var data = json['res'][0];
                var mc = data.mc;
                $('#sub_title').text('【'+mc+'--系列】子项管理');
            }
        });
    }
    //获取子项信息
    $.ajax({
        xhrFields:{withCredentials:true},
        crossDomain:true,
        type:'post',
        url: '../php/sub_info.php',
        dataType:'json',
        data: {
            type: 2,
            id: dataId
        },
        success:function(json){
            loading('close');
            console.log('success:',json);
            var data = json['res'];
            var imgContent = $('#imgContent');
            imgContent.empty();
            if(data.length){
                for(var i=0;i<data.length;i++){
                    var item = data[i];
                    var itemHTML = '<div class="item" cover_img="'+item.cover_img+'" content_img="'+item.content_img+'" data_id="'+item.id+'">' +
                        '<div class="item-mc">'+item.cover_title+'</div>'+
                        '<div class="item-path">'+item.cover_info+'</div>'+
                        '<div class="item-bz">'+item.bz+'</div>'+
                        '<div class="item-cz">' +
                        //'<input type="button" class="btn edit" value="修改">' +
                        '<input type="button" class="btn del" value="删除">' +
                        '</div>'+
                        '</div>';
                    imgContent.append(itemHTML);
                }
            }else{
                imgContent.append('<h1 style="text-align:center;">无法获取任何子项信息,请新增..</h1>');
            }

        },
        error:function(){
            console.log('获取子项信息数据后台出错!');

        }
    });
    $('#imgContent').off('click').on('click','.btn',function(){
        var $this = $(this);
        var thisID = $(this).parent().parent().attr('data_id');
        var cover_img = $(this).parent().parent().attr('cover_img');
        var content_img = $(this).parent().parent().attr('content_img');
        if($this.hasClass('edit')){

        }

        //删除
        else if($this.hasClass('del')){
            if(confirm("确定要删除吗？")){
                loading('open');
                $.ajax({
                    xhrFields:{withCredentials:true},
                    crossDomain:true,
                    type:'post',
                    url: '../php/sub_info.php',
                    dataType:'json',
                    data: {
                        type: 3,
                        id: thisID,
                        cover_img: cover_img,
                        content_img: content_img
                    },
                    success: function(json){
                        if(json['res']){
                            getSubInfo(dataId,false);
                        }
                    }
                });
            }

        }
    });
}