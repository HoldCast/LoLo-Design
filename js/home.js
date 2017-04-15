
var openedCaseId = null;
$(function () {
    showCoverImg(true); //展示封面
    menu();             //菜单处理
    caseShow();         //案列展示
    scrollControl();

});

function caseShow(){
    var $caseImg = $('#case_img');
    var caseImgArr = caseConfig;   //以后可能从后台获取信息
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
            for(var i=0;i<data.length;i++){
                var caseImg = data[i];
                var imgSrc = '../' + caseImg.path;
                var subId = caseImg.id;
                var caseHtml =  '<div class="item">'+
                    '<img src="'+imgSrc+'" alt="'+caseImg.mc+'" sub_id="'+subId+'">'+
                    '</div>';
                $caseImg.append(caseHtml);
            }
        },
        error:function(){
            console.log('获取主页面数据后台出错!');
            for(var i=0;i<caseImgArr.length;i++){
                var caseImg = caseImgArr[i];
                var imgSrc = '../images/' + caseImg.img;
                var subId = caseImg.id;
                var caseHtml =  '<div class="item">'+
                    '<img src="'+imgSrc+'" alt="案例图片" sub_id="'+subId+'">'+
                    '</div>';
                $caseImg.append(caseHtml);
            }
        }
    });



    //点击项目
    $caseImg.on('click','img',function () {
        var $this = $(this);
        var subId = $this.attr('sub_id');
        console.log(subId);
        if(subId){
            openSubCase(subId);
        }else{
            alert('无法获取主项ID,请联系开发人员');
        }

    });

}




//展示封面
function showCoverImg(bool) {
    var $menuBtn = $('#menu_open_btn');
    var $body = $('body');
    var $main = $('#lolo_main');
    var timer = null;
    if (bool) {
        $menuBtn.hide();
        $main.fadeOut(function () {
            $body.css({
                overflow: 'hidden',
                background: 'url("../images/indexBg.jpg") fixed center center no-repeat',
                backgroundSize: 'cover',
                width: '100%'
            });
        });
        timer = setTimeout(function () {
            showCoverImg(false);
        }, 8000);
        $(document).click(function () {
            showCoverImg(false);
            clearTimeout(timer);
        });

    } else {
        $body.css({
            background: '#fff',
            overflow: 'auto'
        });
        $main.fadeIn('slow');
        $(document).off('click');
        $menuBtn.show();
    }
}

//菜单相关
function menu() {
    //点击菜单按钮
    $('#menu_open_btn').click(function () {
        $(this).hide();
        $('#menu_cover').show();
        $('body').css({
            overflow: 'hidden',
            borderRight: '3px solid #fff'
        });
    });
    //点击关闭
    $('#menu_close_btn').click(function () {

        $('#menu_open_btn').show();
        $('#menu_cover').fadeOut('fast', function () {
            $('body').css({
                overflow: 'auto',
                borderRight: 'none'
            });
        });

    });
    //选择菜单项
    $('#menu_cover a').off('click').on('click', function () {
        $('#menu_close_btn').click();
    });

    $('#adminBtn').dblclick(function () {
        open('admin.html');
    });
}

//打开子项目弹窗
function openSubCase(subId){
    var random = Math.random();
    $('#sub_iframe iframe').prop('src','sub_case.html?random='+random+'&subId='+subId);
    $('#sub_iframe').show('fast');
    $('body').css('overflow','hidden');
}
//关闭子项目弹窗
function closeSubCase(){
    $('#sub_iframe').hide('fast');
    $('body').css('overflow','auto');
}

function scrollControl(){
    var isGo = false;
    $(window).on('scroll', function () {
        var  id = 'brand';
        var teamTop = $('#' + id)[0].offsetTop;
        var scrollTop = $(window).scrollTop();
        var wHeight = $(window).height();
        console.log(scrollTop+wHeight,teamTop);
        if((scrollTop+wHeight) > teamTop && !isGo){
            $('html,body').animate({scrollTop: teamTop + 'px'}, 800);
            isGo = true;
        }
        if((scrollTop+wHeight) < teamTop){
            isGo = false;
        }
    });
}

function scrollArea(id) {
    //滚轮事件
    var initTop = 0;
    var isScroll = true;
    var n = null;
    var bool = true;
    var m = 0;
    var u = 0;
    var d = 0;
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        var wHeight = $(window).height();
        var teamTop = $('#' + id)[0].offsetTop;
        console.log(m);
        if (scrollTop > initTop) {
            u++;
            if (teamTop >= (scrollTop + 50) && teamTop < (scrollTop + wHeight)) {

                if (m > 3) {
                    if (isScroll) {
                        $('html,body').animate({scrollTop: teamTop + 'px'}, 800);
                        isScroll = false;
                    }
                } else {
                    if (bool) {
                        m = 0;
                        $(window).scrollTop(scrollTop);
                        n = scrollTop;
                        bool = false;
                        console.log("div在可视范围", scrollTop);

                    } else {
                        m++;
                        $(window).scrollTop(n);
                    }
                }
            } else {
                m = 0;
                console.log("div不在");
                isScroll = true;
            }
//            if(result > 500 && result < 520){
//                //$('html,body').animate({scrollTop: mTop +'px'},300);
//            }

            /*if(result < 600 && result >300){
             //                $(window).scrollTop(mTop);
             //

             }*/

            //console.log("下", scrollTop,mTop%scrollTop,result);
        } else {
            //m = 1;
            //console.log("上", scrollTop,mTop%scrollTop,result);
        }
        initTop = scrollTop;
    });
}




