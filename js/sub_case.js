var scrollTimer = null;
var isAnimate = false;
var subId = getPageParam('subId');
$(function () {
    autoHeight('main');
    returnBack();
    getSubCaseInfo();   //获取图片信息
});


//获取图片信息
function getSubCaseInfo(){
    $('#sloganImg').prop('src','../images/'+subId+'.jpg');
    var $scrollImg = $('#scroll_img');
    //获取子项信息
    $.ajax({
        xhrFields:{withCredentials:true},
        crossDomain:true,
        type:'post',
        url: '../php/sub_info.php',
        dataType:'json',
        data: {
            type: 2,
            id: subId
        },
        success:function(json){
            console.log('success:',json);
            var subCaseInfoArr = json['res'];
            var imgLen = subCaseInfoArr.length;
            if(imgLen){
                var imgWidth = imgLen*300;
                $scrollImg.css('width',imgWidth); //设置图片的总宽度
                for(var i=0;i<imgLen;i++){
                    var subCaseInfo = subCaseInfoArr[i];
                    var title = subCaseInfo.cover_title;
                    var info = subCaseInfo.cover_info;
                    var smallImg = '../' + subCaseInfo.cover_img;
                    var largeImg = '../' + subCaseInfo.content_img;
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
            }else{
                setTimeout(function(){
                    alert('无法获取任何子项信息,请到后台进行添加!!');
                    $('#return').click();
                },500);

            }

        },
        error:function(){
            console.log('获取子项信息数据后台出错!');
        }
    });

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
        var $width = parseInt($scrollImg.css('width'));
        var $scrollImgLeft = parseInt($scrollImg.css('left'));
        var $scrollImgRight = $width + $scrollImgLeft - 1200;
        if (!$this.hasClass('left')) {
            if ($scrollImgRight > 0) {
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
        var $width = parseInt($scrollImg.css('width'));
        var $scrollImgLeft = parseInt($scrollImg.css('left'));
        var $scrollImgRight = $width + $scrollImgLeft - 1200;
        if ($scrollImgRight > 0) {
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
