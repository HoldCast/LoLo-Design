$(function () {
    var a = document.getElementById("music").volume = 0.3;//设置音量大小
    showCoverImg(true); //展示封面
    menu();             //菜单处理

});


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
        }, 6000);
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
    //点击项目
    $('#case_img img').click(function () {
        openSubCase();
    });

}

//打开子项目弹窗
function openSubCase(){
    $('#sub_iframe iframe').prop('src','sub_case.html');
    $('#sub_iframe').fadeIn();
    $('body').css('overflow','hidden');
}
//关闭子项目弹窗
function closeSubCase(){
    $('#sub_iframe').fadeOut('fast');
    $('body').css('overflow','auto');
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


