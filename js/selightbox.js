/*
*
* Selightbox.js v1.1.0
*
* Genius.js Special Version
*
*/
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
        
        $(".play-again").click(function(){
            lb.add(lbOut).hide();
            return false;
        });

        return false;
    };
});
