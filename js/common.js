function autoHeight(id){
    var winHeight = window.innerHeight;
    $('#' + id).height(winHeight);
    $(window).resize(function(){
        var winHeight = window.innerHeight;
        $('#' + id).height(winHeight);
    })
}