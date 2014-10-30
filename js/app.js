/*
*
* Genius App Scripts
*
* (c) 2013-2014 Sercan Eraslan http://sercaneraslan.com
* License: MIT
*
*/

$(function () {    
    var start = $("#start"),
        article = $("article"),
        sectionUl = $("section ul"),
        sprite = new Image(),
        i = 0;

    // Loading Sprite
    sprite.src = "images/sprite.png";
    sprite.onload = function () {
        article.css('background','none');
        start.show();
    };

    // Creating Zones
    for ( i; i <= 39; i++ ) {
        sectionUl.append('<li id="zone' + i + '"></li>')
    };

    // Start Button Click Event
    start.click(function () {
        $('body').addClass('game-active');
        new Genius.Game();
    });
});
