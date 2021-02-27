import { cards } from "./db.js";
const GAME = document.querySelector('.game')
const START = document.querySelector('#start')
const MAIN_SCREEN = document.querySelector('.mainScreen');
const BTN_START = document.querySelector('.button');
let CARD;
let BACK;
let FRONT;
let timer;
let activeCards = [];
let easy = 8;
let medium = 18;
let hard = 32;

// difficulty
let difficulty = medium

renderRandomCards(cards);

BTN_START.addEventListener('click', (btn) => {
    timer = prompt('Время на запоминание в секундах, не более 60');
    if (timer.length != 0) {
        if (timer.replace(/\s/g, '').length === 0 || isNaN(timer)) {
            alert('Нужно писать число!');
        }
        else if (timer <= 60) {
            btn.target.remove()
            GAME.insertAdjacentHTML('afterend', `<h1 class='timerWrap'><span class='timer'>${timer}</span></h1>`)
            const TIMER = document.querySelector('.timer')
            initializeClock(TIMER)
            CARD.forEach(e => {
                e.classList.add('rotate')
                setTimeout(() => {
                    e.classList.remove('rotate')
                }, (timer + 1) * 1000);
            })
            setTimeout(() => {
                checkCard()
            }, 500);

        } else {
            alert('Введите число меньше 60');
        }
    } else {
        alert('Повторите еще раз');
    }



})


function initializeClock(TIMER) {
    var secondsSpan = TIMER
    function updateClock() {
        secondsSpan.innerHTML = (timer);
        if (timer > 0) {
            timer--
            console.log(timer)
        } else {
            TIMER.parentNode.remove()
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}



function renderRandomCards(arrayOfCards) {
    let arr, i, unic, a;
    arr = []
    while (arr.length < difficulty) {
        if (difficulty > cards.length) {
            difficulty = cards.length
        }
        do {
            unic = true;
            a = Math.floor(Math.random() * arrayOfCards.length);
            for (i = 0; i < arr.length; i++) {
                if (a == arr[i]) {
                    // такое число уже было
                    unic = false;
                    break;
                }
            }
        } while (!unic) // повторить генерацию числа
        arr.push(a);
        if (arr.length == difficulty) {
            let dblArr = arr.concat(arr);
            let AddForRender = shuffle(dblArr)
            for (let i = 0; i < dblArr.length; i++) {
                GAME.insertAdjacentHTML('beforeend',
                    `<div class="card" data-name=${arrayOfCards[AddForRender[i]].name}>
                                <div class="back"><img src="${arrayOfCards[AddForRender[i]].src}" alt="${arrayOfCards[AddForRender[i]].name}"></div>
                                <div class="front"></div>
                            </div>
                            `
                )
            }
            CARD = document.querySelectorAll('.card')
            BACK = document.querySelectorAll('.back')
            FRONT = document.querySelectorAll('.front')
        }
    }
}

function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}





function checkCard() {
    CARD.forEach(e => e.addEventListener('click', () => {
        e.classList.add('rotate')
        activeCards.push(e)
        console.log(activeCards)
        if (activeCards.length == 2) {
            CARD.forEach(item => {
                item.classList.add('hold')
            })
            setTimeout(() => {
                if (activeCards[0].dataset.name == activeCards[1].dataset.name) {
                    activeCards[0].classList.add('hide')
                    activeCards[1].classList.add('hide')
                } else {
                    activeCards[0].classList.remove('rotate')
                    activeCards[1].classList.remove('rotate')

                }
                activeCards = []
                CARD.forEach(item => {
                    item.classList.remove('hold')
                })
            }, 1000);
        }
    }))
}
