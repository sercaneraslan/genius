/*
* Copyright 2012 Sercan Eraslan
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/*
*
* Selightbox.js v1.1
* http://sercaneraslan.github.io/Selightbox/
*
* Github : @sercaneraslan
* Twitter : @sercan_eraslan
* Web : sercaneraslan.com
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
        
        $("#lbNewGame, #lbWin, #lbTimeout").click(function(){
            lb.add(lbOut).hide();
            return false;
        });
        return false;
    };
});
