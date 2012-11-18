// Selightbox v1.1 (edited version)
// http://wwww.sercaneraslan.com
$(function(){
    $("body").prepend('<div id="lbOut"></div>');
    $.fn.selightbox = function(selector){
        var lb = $((selector == null) ? selector = ".lb" : selector = selector),
            lbOut = $("#lbOut");
            
        var docHeight = $(document).height(),
            winY = $(window).height(),
            winX = $(window).width(),
            lbOutY = lb.outerHeight(),
            lbOutX = lb.outerWidth();
            
        lbOut.height(docHeight).show();
        lb.css({'top': (winY - lbOutY) / 2, 'left': (winX - lbOutX) / 2}).show();
        
        $(".lbOk").click(function(){
            lb.add(lbOut).hide();
            return false;
        });
        return false;
    };
});