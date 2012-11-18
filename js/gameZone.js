var util = {},
    game = {};

// Random olarak oluşturulan array'de ki aynı sayıları ayıklar
util.array = {};
util.array.unique = function (arrayItem){
    var a = [],
        l = arrayItem.length;
    for (var i=0; i<l; i++){
        for (var j=i+1; j<l; j++) {
            if(arrayItem[i] === arrayItem[j]){
                j = ++i;
            }
        }
        a.push(arrayItem[i]);
    }
    return a;
};

game.Zone = function(){
    var box = 3,
        clicked = 0,
        score = 0,
        randomArr = [],
        lev = 1,
        second = 5,
        set = null,
        gameZone = $('section ul li'),
        time = $('.time'),
        scoreWrite = $('.score').text('Puan: ' + score*second);
        
    // Random sayılar ile dizi oluşturur.
    var randomNumber = function(){
        for (var i=0; i<box; i++){
           randomArr[i] = Math.floor(Math.random()*40);
        }
        
        randomArr = util.array.unique(randomArr);
        if(randomArr.length !== box){
            randomNumber();
        }

        gameZoneBox();
        return randomArr;
    }

    // Kutuların arkaplanlarına image ekler ve 2 sn sonra kaybeder
    var gameZoneBox = function(){
        $('section ul').hide().fadeIn(100);
        $('.level').text('Seviye: '+lev);
        scoreWrite;

        for (var i=0; i<box; i++){
            var spriteYpos = randomArr[i] * 95;
            $('#gameZone'+randomArr[i]).css('background','url(images/sprite.png) 0 -'+spriteYpos+'px');
            spriteYpos = 0;
        }

        setTimeout(function(){
            gameZone.css('background','');
        },2000);
    }
    
    // Geri sayan zamanlayıcı
    var timer = function(){
        time.text('Süre : ' + second-- + ' sn');
        if(second <= -1){
            clearInterval(set);
            gameZone.selightbox('#lightTimeOver');
        }
    }

    gameZone.click(function(e){
        // Tıklanan kutu doğru değilse err classı ekliyoruz, doğru ise err classını silip ok classı ekliyoruz.
        for (var i=0; i<box; i++){
            if(e.currentTarget.id !== 'gameZone'+randomArr[i]){
                console.log(e.currentTarget.id);
                $('#'+e.currentTarget.id).addClass("err");
            }else{
                $('#'+e.currentTarget.id).removeClass("err").addClass("ok , clicked");
                break;
            }
        }

        // Kutunun err classı varsa oyunu bitiriyoruz.
        if($('#'+e.currentTarget.id).hasClass("err")){
            clearInterval(set);
            gameZone.selightbox('#lightBoxLose');
        }

        clicked = $('.clicked').size();

        // Doğru tıklanan kutu sayısı, gösterdiğimiz kutu sayısına eşit ise sonra ki aşamaya geçiliyor.
        if(clicked == box){
            score = score+box;
            clicked = 0;
            box++;
            scoreWrite;

            // Gösterilen kutu sayısı 25 e eşit değilse bir sonra ki aşamaya geçiliyor, eşitse oyun bitiyor.
            if(box == 25){
                gameZone.selightbox('#lightBoxWin');
                clearInterval(set);
            }else{
                gameZone.removeClass("clicked");
                $('.level').text('Seviye: '+lev);
                $('.score').text('Puan: ' + score*second);
                second = 7 + lev+1;
                clearInterval(set);
                lev++;
                gameZone.removeClass("ok err");
                set = setInterval(timer,1000);
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
        location.reload();
    });
    
    set = setInterval(timer,1000);
    randomNumber();
};

$(function(){
    $("#startGame").click(function(){
        $('article').hide();
        new game.Zone();
    });
});