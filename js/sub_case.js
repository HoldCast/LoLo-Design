var scrollTimer = null;
var isAnimate = false;
$(function () {
    autoHeight('main');
    returnBack();
    getSubCaseInfo();   //获取图片信息
});


//获取图片信息
function getSubCaseInfo(){
    var subId = getPageParam('subId');
    var $scrollImg = $('#scroll_img');
    var subCaseInfoArr = subCaseConfig[subId]; //以后从后台数据库获取[subId为查询条件]
    var imgLen = subCaseInfoArr.length;
    var imgWidth = imgLen*300;
    $scrollImg.css('width',imgWidth); //设置图片的总宽度
    for(var i=0;i<imgLen;i++){
        var subCaseInfo = subCaseInfoArr[i];
        var title = subCaseInfo.title;
        var info = subCaseInfo.info;
        var smallImg = '../images/' + subCaseInfo.smallImg;
        var largeImg = '../images/' + subCaseInfo.largeImg;
        var url = smallImg;
        var html =  '<div class="img-item" small_img="'+smallImg+'" style="background-image: url('+smallImg+');">'+
                        '<div class="cover" large_img="'+largeImg+'">'+
                            '<div class="title">'+title+'</div>'+
                            '<div class="more-btn">MORE</div>'+
                            '<div class="slogan">'+info+'</div>'+
                        '</div>'+
                    '</div>';
        $scrollImg.append(html);
    }
    startAutoScroll();  //自动滚
    moveImg();          //手动滚
    hoverImg();         //hover效果
}

function hoverImg(){
    $('#scroll_img .img-item').hover(function(){
        clearInterval(scrollTimer);
        var $cover = $(this).find('.cover');
        $cover.off('click').on('click',function(){
            var imgUrl = $(this).attr('large_img');
            $('#case_img').prop('src',imgUrl);
            $('#case_cover').fadeIn('fast',function(){
                $('#case_img').slideDown();
            });
            $('#case_close_btn').click(function(){
                $('#case_cover').hide().find('img').hide();
            });
        });
        $cover.stop().fadeIn();
    },function(){
        var $cover = $(this).find('.cover');
        $cover.stop().fadeOut('show');
        startAutoScroll();
    });
}

//点击滚动
function moveImg() {
    var $scrollImg = $('#scroll_img');
    $('#scroll_btn').on('click', 'i', function () {
        clearInterval(scrollTimer);
        if(isAnimate) return false;
        isAnimate = true;
        var $this = $(this);
        var $scrollImgLeft = parseInt($scrollImg.css('left'));
        var $scrollImgRight = parseInt($scrollImg.css('right'));
        if (!$this.hasClass('left')) {
            if ($scrollImgRight < 0) {
                $scrollImg.stop().animate({left: $scrollImgLeft - 300 + 'px'},function(){
                    isAnimate = false;
                });
            }else{
                isAnimate = false;
            }
        } else {
            if ($scrollImgLeft < 0) {
                $scrollImg.stop().animate({left: $scrollImgLeft + 300 + 'px'},function(){
                    isAnimate = false;
                });
            }else{
                isAnimate = false;
            }
        }
        setTimeout(function(){
            startAutoScroll();
        },5000);
    });
}

//启动自动滚动
function startAutoScroll(){
    clearInterval(scrollTimer);
    scrollTimer = setInterval(function(){
        var $scrollImg = $('#scroll_img');
        var $scrollImgLeft = parseInt($scrollImg.css('left'));
        var $scrollImgRight = parseInt($scrollImg.css('right'));
        if ($scrollImgRight < 0) {
            $scrollImg.stop().animate({left: $scrollImgLeft - 300 + 'px'});
        }else{
            $scrollImg.stop().animate({left: '0px'},300);
        }
    },2000);
}


function returnBack(){
    $('#return').click(function(){
        parent.closeSubCase();
    });
}
