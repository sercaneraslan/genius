/*
*
* Genius v3.0
* The JavaScript Game App
* sercaneraslan.com
*
*/

var Genius = {};

Genius.Game = function() {

    var box = 3,
        lev = 1,
        score = 0,
        second = 5,
        randomArr = [],
        level = $('.level'),
        scoreEl = $('.score'),
        time = $('.time'),
        gameZone = $('section ul li'),
        setTime,

        isRandomNumber = function(number) {
            var array = [],
                number = number,
                len = number.length,
                i = 0,
                j = 0;

            for ( i; i < len; i++ ) {
                
                for ( j = i+1;  j < len; j++ ) {
                    
                    if ( number[i] === number[j] ) {
                        j = ++i;
                    }
                }
                array.push( number[i] );
            }
            return array;
        },

        createRandomNumber = function() {
            var i = 0;

            for ( i; i < box; i++ ) {
               randomArr[i] = Math.floor( Math.random() * 40 );
            }

            randomArr = isRandomNumber(randomArr);

            if ( randomArr.length !== box ) {
                createRandomNumber();
            }

            gameZoneBox();

            return randomArr;
        },

        gameZoneBox = function() {
            var i = 0;

            gameZone.removeClass("ok err");
            
            clearTimeout(setTime);

            setTime = setInterval( function() {
                time.text( 'Süre : ' + second-- + ' sn' );

                if( second <= -1 ) {
                    clearTimeout(setTime);
                    gameZone.selightbox('#lightTimeOver');
                }
            }, 1000);

            level.text( 'Seviye: ' + lev );
            scoreEl.text( 'Puan: ' + score * second );
            time.text( 'Süre : ' + second + ' sn' );

            for ( i; i < box; i++ ) {
                $('#gameZone' + randomArr[i]).css('background','url(images/sprite.png) 0 -' + randomArr[i] * 95 + 'px');
            }

            setTimeout( function() {
                gameZone.css('background','');
            }, 1500);
        };

    gameZone.click( function(e) {
        var i = 0,
            currentId = e.currentTarget.id,
            elCurrentId = $('#' + currentId);

        for ( i; i < box; i++ ) {

            if ( currentId !== 'gameZone' + randomArr[i] ) {
                elCurrentId.addClass("err");
            } else {
                elCurrentId.removeClass("err").addClass("ok");
                break;
            }
        }

        if ( elCurrentId.hasClass("err") ) {
            clearTimeout(setTime);
            gameZone.selightbox('#lightBoxLose');
        }

        if( $('.ok').length == box ) {
            score = score+box;
            box++;

            if ( box == 25 ) {
                clearTimeout(setTime);
                gameZone.selightbox('#lightBoxWin');
            } else {
                second = 7 + lev;
                lev++;
                createRandomNumber();
            }
        }
    });

    gameZone.dblclick( function(e) {
        e.preventDefault();
        $(e.target).trigger('click');
        return false;
    });

    $('#lbNewGame, #lbWin, #lbTimeout').click( function() {
        lev = 1;
        box = 3;
        score = 0;
        second = 5;
        createRandomNumber();
    });
    
    createRandomNumber();
};

$(function(){
    $("section section").append('<ul></ul>');
    
    var start = $("#startGame"),
        article = $("article"),
        sectionUl = $("section ul"),
        sprite = new Image(),
        i = 0;

    sprite.src = "images/sprite.png";
    sprite.onload = function() {
        article.css('background','none');
        start.show();
    };

    for ( i; i <= 39; i++ ) {
        sectionUl.append('<li id="gameZone' + i + '"></li>')
    };

    start.click(function(){
        article.hide();
        sectionUl.show();
        new Genius.Game();
    });
});
