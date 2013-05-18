// Genius v2.1
// sercaneraslan.com
var random = {},
    game = {};

// Random olarak oluşturulan array'de ki aynı sayıları ayıklar
random.Array = function( number ) {

    var array = [],
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
};

// Oyunun tamamı burada kontrol ediliyor
game.Zone = function() {

    var box = 3,
        lev = 1,
        score = 0,
        second = 5,
        randomArr = [],
        setTime = null,
        level = $('.level'),
        scoreEl = $('.score'),
        time = $('.time'),
        gameZone = $('section ul li'),
        
        // Random sayılar ile dizi oluşturur.
        randomNumber = function() {
            
            var i = 0;

            for ( i; i < box; i++ ){
               randomArr[i] = Math.floor( Math.random() * 40 );
            }

            randomArr = random.Array( randomArr );
            
            if( randomArr.length !== box ){
                randomNumber();
            }

            gameZoneBox();

            return randomArr;
        },

        // Kutuların arkaplanlarına image ekler ve 1.5 sn sonra kaybeder
        gameZoneBox = function() {
            
            var i = 0;

            gameZone.removeClass( "ok err" );
            
            clearTimeout(setTime);

            setTime = setTimeout( timer,1000 );

            level.text( 'Seviye: ' + lev );
            scoreEl.text( 'Puan: ' + score * second );
            time.text( 'Süre : ' + second + ' sn' );

            for ( i; i<box; i++ ) {
                $('#gameZone'+randomArr[i]).css('background','url(images/sprite.png) 0 -'+ randomArr[i] * 95 +'px');
            }

            setTimeout( function() {
                gameZone.css('background','');
            },1500);
        },
    
        // Geri sayan zamanlayıcı
        timer = function() {
            time.text( 'Süre : ' + second-- + ' sn' );

            if( second <= -1 ) {
                clearTimeout(setTime);
                gameZone.selightbox('#lightTimeOver');
            }
        };

    gameZone.click( function( e ) {
        // Tıklanan kutu doğru değilse err classı ekliyoruz, doğru ise err classını silip ok classı ekliyoruz.
        var i = 0;

        for ( i; i < box; i++ ) {
            if ( e.currentTarget.id !== 'gameZone'+randomArr[i] ) {
                $('#'+e.currentTarget.id).addClass("err");
            } else {
                $('#'+e.currentTarget.id).removeClass("err").addClass("ok");
                break;
            }
        }

        // Kutunun err classı varsa oyunu bitiriyoruz.
        if ( $('#'+e.currentTarget.id).hasClass("err") ) {
            clearTimeout(setTime);
            gameZone.selightbox('#lightBoxLose');
        }

        // Doğru tıklanan kutu sayısı, gösterdiğimiz kutu sayısına eşit ise sonra ki aşamaya geçiliyor.
        if( $('.ok').length == box ) {
            score = score + box;
            box++;

            // Gösterilen kutu sayısı 25 e eşit değilse bir sonra ki aşamaya geçiliyor, eşitse oyun bitiyor.
            if( box == 25 ) {
                clearTimeout(setTime);
                gameZone.selightbox('#lightBoxWin');
            } else {
                second = 7 + lev;
                lev++;
                randomNumber();
            }
        }
    });

    // Aynı kutuya 2 kez tıklamayı önler.
    gameZone.dblclick( function( e ) {
        e.preventDefault();
        $(e.target).trigger('click');
        return false;
    });

    $('#lbNewGame, #lbWin, #lbTimeout').click( function() {
        lev = 1;
        box = 3;
        score = 0;
        second = 5;
        randomNumber();
    });
    
    randomNumber();
};

$( function() {
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

    start.click( function() {
        article.hide();
        sectionUl.show();
        new game.Zone();
    });
});
