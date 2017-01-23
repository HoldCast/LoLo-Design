function autoHeight(id) {
    var winHeight = window.innerHeight;
    $('#' + id).height(winHeight);
    $(window).resize(function () {
        var winHeight = window.innerHeight;
        $('#' + id).height(winHeight);
    })
}

function getPageParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}