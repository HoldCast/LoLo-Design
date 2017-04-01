//高度自适应
function autoHeight(id) {
    var winHeight = window.innerHeight;
    $('#' + id).height(winHeight);
    $(window).resize(function () {
        var winHeight = window.innerHeight;
        $('#' + id).height(winHeight);
    })
}

//获取页面参数(单个)
function getPageParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

//loading
function loading(type,msg){
    var msg = msg || '数据处理中,请稍候...';
    var loading_img_url = '../images/loading.gif';
    var loading_html='<div id="loadingMsk">'
        +'<div class="loadingPage">'
        +'<img src="'+loading_img_url+'" alt="loading">'
        +'<span class="msg">'+msg+'</span>'
        +'</div>'
        +'</div>';
    if($('#loadingMsk').length == 0){
        $('body').append(loading_html);
    }
    if(type == 'open'){
        $('#loadingMsk').fadeIn('fast');
    }else if(type == 'close'){
        $('#loadingMsk').fadeOut('fast').remove();
    }else{
        console.log('加载效果处理方式参数错误!');
        return false;
    }
}
