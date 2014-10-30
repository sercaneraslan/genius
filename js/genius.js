/*
*
* Genius v3.1.0
*
* (c) 2013-2014 Sercan Eraslan http://sercaneraslan.com
* License: MIT
*
*/
var Genius = {};

Genius.Game = function () {

    var box = 3,
        lev = 1,
        score = 0,
        second = 5,
        randomArr = [],
        level = $('.level span'),
        scoreEl = $('.score span'),
        time = $('.time span'),
        zones = $('section ul li'),
        setTime,
        isRandomNumber = function (number) {
            var array = [],
                number = number,
                len = number.length,
                i = 0,
                j = 0;

            for (i; i < len; i++) {
                for (j = i + 1;  j < len; j++) {
                    if (number[i] === number[j]) {
                        j = ++i;
                    }
                }
                array.push(number[i]);
            }

            return array;
        },
        createRandomNumber = function () {
            var i = 0;

            for (i; i < box; i++) {
               randomArr[i] = Math.floor(Math.random() * 40);
            }

            randomArr = isRandomNumber(randomArr);

            if (randomArr.length !== box) {
                createRandomNumber();
            }

            handleActions();

            return randomArr;
        },
        handleActions = function () {
            var i = 0;

            zones.removeClass("ok err");
            
            clearTimeout(setTime);

            setTime = setInterval(function () {
                time.text(second--);

                if (second <= -1) {
                    clearTimeout(setTime);
                    zones.selightbox('#lightTimeOver');
                }
            }, 1000);

            level.text(lev);
            scoreEl.text(score * second);
            time.text(second);

            for (i; i < box; i++) {
                $('#zone' + randomArr[i]).css(
                    'background', 'url(images/sprite.png) 0 -' + randomArr[i] * 95 + 'px'
                );
            }

            setTimeout(function () {
                zones.css('background','');
            }, 1500);
        },
        startGame = function() {
            lev = 1;
            box = 3;
            score = 0;
            second = 5;

            createRandomNumber();
        };

    // Zones Click Event
    zones.click(function (e) {
        var currentId = e.currentTarget.id,
            elCurrentId = $('#' + currentId),
            i = 0;

        for (i; i < box; i++) {

            if (currentId !== 'zone' + randomArr[i]) {
                elCurrentId.addClass("err");
            } else {
                elCurrentId.removeClass("err").addClass("ok");
                break;
            }
        }

        if (elCurrentId.hasClass("err")) {
            clearTimeout(setTime);
            zones.selightbox('#lightBoxLose');
        }

        if($('.ok').length == box) {
            score = score + box;
            box++;

            if (box == 25) {
                clearTimeout(setTime);
                zones.selightbox('#lightBoxWin');
            } else {
                second = 7 + lev;
                lev++;

                createRandomNumber();
            }
        }
    });

    // Zones Double Click Event
    zones.dblclick(function (e) {
        e.preventDefault();
        $(e.target).trigger('click');
        return false;
    });

    // Play Again Buttons Click Event
    $('.play-again').click(function() {
        startGame();
    });

    startGame();
};
