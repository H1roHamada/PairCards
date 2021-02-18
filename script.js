import { cards } from "./db.js";
const GAME = document.querySelector('.game')
let CARD;
let BACK;
let FRONT;
let activeCards = []

renderRandomCards(cards);
function renderRandomCards(arrayOfCards) {
    let arr, max_number, i, unic, a;
    arr = []
    max_number = 8;
    while (arr.length < max_number) {
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
        if (arr.length == max_number) {
            let dblArr = arr.concat(arr);
            let AddForRender = shuffle(dblArr)
            console.log(dblArr)
            console.log(AddForRender)
            for (let i = 0; i < dblArr.length; i++) {
                GAME.insertAdjacentHTML('beforeend',
                    `<div class="card" data-name=${arrayOfCards[AddForRender[i]].name}>
                                <div class="back"><img src="${arrayOfCards[AddForRender[i]].src}" alt="${arrayOfCards[AddForRender[i]].name}"></div>
                                <div class="front"></div>
                            </div>
                            `
                )
            }

            console.log(arrayOfCards)

            CARD = document.querySelectorAll('.card')
            BACK = document.querySelectorAll('.back')
            FRONT = document.querySelectorAll('.front')
            checkCard()
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
