/**
 * Created by zhuwei on 2017-03-25.
 */
$(function(){
    getImg();   //获取
    addImg();   //新增图片
});

function addImg(){
    $('#addBtn').off('click').on('click',function(){
        $('#addCover').show();
    });
    $('#cancel').off('click').on('click',function(){
        $('#addCover').hide();
    });
    submitImg('save','img_form');   //绑定保存事件
}

//保存图片信息
function submitImg(submit_id,form_id){
    $("#"+submit_id).off('click').on("click",function(){
        var img_val = $("#"+form_id+" input[type=file]").val();
        //var img_val2 = $("#"+form_id+" input[type=file]").val();
        //if(img_val == ''){
        if(img_val == ''){
            alert('请添加图片!');
            return false;
        }else if(!/.(gif|jpg|jpeg|png|GIF|JPG|png|PNG)$/.test(img_val)){
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return false;
        }else{
            //获取图片宽高
            //var image = new Image();
            //image.src = img_val;
            $("#"+form_id).ajaxSubmit({
                xhrFields:{withCredentials:true},
                crossDomain:true,
                type:'post',
                url:'../php/home_info.php',
                dataType:'json',
                data:{type:1},
                success:function(json){
                    console.log('success:',json);
                    if(json.status == 'success'){
                        $('#addCover').hide();
                        getImg();
                    }else if(json.status == 'error'){
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

//获取图片信息
function getImg(){
    $.ajax({
        xhrFields:{withCredentials:true},
        crossDomain:true,
        type:'post',
        url: '../php/home_info.php',
        dataType:'json',
        data: {type:2},
        success:function(json){
            console.log('success:',json);
            var data = json['res'];
            $('#imgContent').empty();
            if(data.length){
                for(var i=0;i<data.length;i++){
                    var item = data[i];
                    var itemHTML = '<div class="item" data_id="'+item.id+'">' +
                        '<div class="item-mc">'+item.mc+'</div>'+
                        '<div class="item-path">'+item.path+'</div>'+
                        '<div class="item-bz">'+item.bz+'</div>'+
                        '<div class="item-cz">' +
                        '<input type="button" class="btn sub" value="子项信息">' +
                        '<input type="button" class="btn edit" value="修改">' +
                        '<input type="button" class="btn del" value="删除">' +
                        '</div>'+
                        '</div>';
                    $('#imgContent').append(itemHTML);
                }
            }else {
                $('#imgContent').append('<h1 style="text-align:center;">无法获取任何主项信息,请新增..</h1>');
            }

        },
        error:function(e){
            alert('获取主页面数据后台出错!');
            console.log(e);

        }
    });
    $('#imgContent').off('click').on('click','.btn',function(){
        var $this = $(this);
        var thisID = $(this).parent().parent().attr('data_id');
        if($this.hasClass('sub')){
            location.href = 'admin_sub.html?data_id='+thisID;
        }else if($this.hasClass('edit')){

        }else if($this.hasClass('del')){

        }
    });
}


$('#证件类型组件ID').combobox({
   onChange: function(n,o){
       if(n){
           if(n == '身份证代码'){
               $('#证件号码组件ID').textbox({
                   validType:'身份证验证规则'
               });
           }else {
               $('#证件号码组件ID').textbox({
                   validType:'' //其他验证规则或者为空不验证
               });
           }
       }
   }
});
