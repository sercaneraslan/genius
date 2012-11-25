// Genius v2.1
// sercaneraslan.com
var random = {},
    game = {};

// Random olarak oluşturulan array'de ki aynı sayıları ayıklar
random.Array = function (x){
    var a = [],
        l = x.length;

    for (var i=0; i<l; i++){
        for (var j=i+1; j<l; j++) {
            if(x[i] === x[j]){
                j = ++i;
            }
        }
        a.push(x[i]);
    }
    return a;
};

// Oyun kontrolleri burada
game.Zone = function(){
    var box = 3,
        lev = 1,
        score = 0,
        second = 5,
        randomArr = [],
        set = null,
        level = $('.level'),
        scoreEl = $('.score'),
        time = $('.time'),
        gameZone = $('section ul li'),
        
        // Random sayılar ile dizi oluşturur.
        randomNumber = function(){
            for (var i=0; i<box; i++){
               randomArr[i] = Math.floor(Math.random()*40);
            }
            
            randomArr = random.Array(randomArr);
            if(randomArr.length !== box){
                randomNumber();
            }

            gameZoneBox();
            return randomArr;
        },

        // Kutuların arkaplanlarına image ekler ve 1.5 sn sonra kaybeder
        gameZoneBox = function(){
            gameZone.removeClass("ok err");
            
            clearInterval(set);
            set = setInterval(timer,1000);

            level.text('Seviye: '+lev);
            scoreEl.text('Puan: ' + score*second);
            time.text('Süre : ' + second + ' sn');

            for (var i=0; i<box; i++){
                $('#gameZone'+randomArr[i]).css('background','url(images/sprite.png) 0 -'+ randomArr[i]*95 +'px');
            }

            setTimeout(function(){
                gameZone.css('background','');
            },1500);
        },
    
        // Geri sayan zamanlayıcı
        timer = function(){
            time.text('Süre : ' + second-- + ' sn');

            if(second <= -1){
                clearInterval(set);
                gameZone.selightbox('#lightTimeOver');
            }
        };

    gameZone.click(function(e){
        // Tıklanan kutu doğru değilse err classı ekliyoruz, doğru ise err classını silip ok classı ekliyoruz.
        for (var i=0; i<box; i++){
            if(e.currentTarget.id !== 'gameZone'+randomArr[i]){
                $('#'+e.currentTarget.id).addClass("err");
            }else{
                $('#'+e.currentTarget.id).removeClass("err").addClass("ok");
                break;
            }
        }

        // Kutunun err classı varsa oyunu bitiriyoruz.
        if($('#'+e.currentTarget.id).hasClass("err")){
            clearInterval(set);
            gameZone.selightbox('#lightBoxLose');
        }

        // Doğru tıklanan kutu sayısı, gösterdiğimiz kutu sayısına eşit ise sonra ki aşamaya geçiliyor.
        if($('.ok').size() == box){
            score = score+box;
            box++;

            // Gösterilen kutu sayısı 25 e eşit değilse bir sonra ki aşamaya geçiliyor, eşitse oyun bitiyor.
            if(box == 25){
                clearInterval(set);
                gameZone.selightbox('#lightBoxWin');
            }else{
                second = 7 + lev;
                lev++;
                randomNumber();
            }
        }
    });

    // Aynı kutuya 2 kez tıklamayı önler.
    gameZone.dblclick(function(e){
        e.preventDefault();
        $(e.target).trigger('click');
        return false;
    });

    $('#lbNewGame, #lbWin, #lbTimeout').click(function(){
        lev = 1;
        box = 3;
        score = 0;
        second = 5;
        randomNumber();
    });
    
    randomNumber();
};

$(function(){
    var start = $("#startGame");

    $("body > img").load(function(){
        $("article > img").hide();
        start.show();
    });

    start.click(function(){
        $('article').hide();
        $('section ul').show();
        new game.Zone();
    });
});