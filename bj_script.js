"use strict";
console.log("test");
// List of Variables //
let color = document.getElementById("color");
let name = document.getElementById("name");
let start = document.getElementById("start");
// let dealer = document.getElementById("dealer");
let body = document.getElementById("body");
let user = document.getElementById("user");
let minbet = document.getElementById('bet-min');
let maxBet = document.getElementById('bet-max');
let betfive = document.getElementById('bet-5');
let deal = document.getElementById('deal');
let hit = document.getElementById('hit');
let stay = document.getElementById('stay');
let double = document.getElementById('double');
let split = document.getElementById('split');
let currentBt = document.getElementById('current-bet');
let chipCount = document.getElementById('chip-count');
let dealerCard1 = document.getElementById('dealer-card-1');
let dealerCard2 = document.getElementById('dealer-card-2');
window['dealerCard3'] = document.getElementById('dealer-card-3');
let dealerCard4 = document.getElementById('dealer-card-4');
let dealerCard5 = document.getElementById('dealer-card-5');
let dealerCard6 = document.getElementById('dealer-card-6');
let playerCard1 = document.getElementById('player-card-1');
let playerCard2 = document.getElementById('player-card-2');
let playerCard3  document.getElementById('player-card-3');
let playerCard4 = document.getElementById('player-card-4');
let playerCard5 = document.getElementById('player-card-5');
let playerCard6 = document.getElementById('player-card-6');
let dealerHandTot = document.getElementById('dealer-hand-total');
let playerHandTot = document.getElementById('player-hand-total');
let cardReset = document.getElementsByClassName('reset-src');
let message = document.getElementById('message');
let playerHandVal = 0;
let dealerHandVal = 0;
// let dealerTotal = 0;
let cardVal = 0;
deal.disabled = true;
hit.disabled = true;
stay.disabled = true;
//PRESET VALUES//

let chipTotal = 0;
currentBt.value = 0;
currentBt.innerText = 0;
let currentBet = 0;
// let currentBet = 0;
// List of addEventListener //

color.addEventListener('change', create);
name.addEventListener('change', newUser);
minbet.addEventListener('click', betMin);
maxBet.addEventListener('click', betMax);
betfive.addEventListener('click', betFive);
deal.addEventListener('click', function () {
  dealNew("https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/4zakt0un65c4/draw/?count=4");
  minbet.disabled = true;
  betfive.disabled = true;
  maxBet.disabled = true;

});
hit.addEventListener('click', function () {
  newHit("https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/4zakt0un65c4/draw/?count=1");

});
stay.addEventListener('click', function () {
  if(dealerHandVal <= 14) {
  dealerStay("https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/4zakt0un65c4/draw/?count=1");
 }
 else {
   stayEval();
 }
});
// double.addEventListener();
// split.addEventListener();
// start.addEventListener('click', newGame);
if(sessionStorage.getItem("chip Count") != undefined) {
  chipCount.innerText = sessionStorage.getItem("chip Count");
  chipTotal = sessionStorage.getItem("chip Count");
}
else {
  chipTotal = 200;
}
if(sessionStorage.getItem("color") != undefined) {
  body.style.backgroundColor = sessionStorage.getItem("color");
  color.value = sessionStorage.getItem("color");
}
else {
  body.style.backgroundColor = "white";
  color.value = '#ffffff';
}
if(sessionStorage.getItem("name") != undefined) {
  name.value = sessionStorage.getItem("name");
  user.innerText = name.value;
}
else {
  name.value = "Hello Player 1"
  user.innerText = name.value;
}
// if(currenBt == 0) {
//   deal.disabled = true;
// }
// else{
//   deal.disabled = false;
// }
// Web Storage Values
// chipCount.innerText = sessionStorage.getItem("chip Count");
// chipTotal = sessionStorage.getItem("chip Count");
// body.style.backgroundColor = sessionStorage.getItem("color");
// color.value = sessionStorage.getItem("color");
// name.value = sessionStorage.getItem("name");
//
// user.innerText = name.value;

// List of Functions //
function betMin () {
  if(Number(currentBt.innerText) <= 18) {
    deal.disabled = false;
    currentBet += 2;
    currentBt.innerText = currentBet;
    chipTotal -= 2;
    console.log(chipTotal);
    chipCount.innerText = chipTotal;
  }
}

function betFive () {
  if(Number(currentBt.innerText) <= 15) {
    deal.disabled = false;
    currentBet += 5;
    currentBt.innerText = currentBet;
    chipTotal -= 5;
    console.log(chipTotal);
    chipCount.innerText = chipTotal;
  }
}

function betMax () {
  if(Number(currentBt.innerText) == 0) {
    deal.disabled = false;
    currentBet += 20;
    currentBt.innerText = currentBet;
    chipTotal -= 20;
    console.log(chipTotal);
    chipCount.innerText = chipTotal;
  }
}

function create () {
  sessionStorage.setItem("color", color.value);
  body.style.backgroundColor = color.value;
}

function newUser () {
  sessionStorage.setItem("name", name.value);
  user.innerText = name.value;
}
function chipStorage () {
  sessionStorage.setItem("chip Count", chipCount.innerText);
}

function resetSrc () {
  setTimeout(function () {
    for(let item of cardReset) {
      // item.src = "";
      item.removeAttribute("src");
      message.innerText = '';
    }
  }, 3000);
}

function reShuffle (url) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.response);
      console.log(data);
    }
  };
  req.open("GET", url);

  req.send();
}
function newHit (url) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.response);
    console.log(playerCard3.src);
    if(playerCard3.src == "") {
      playerCard3.src = data.cards[0].image;
      playerCard3.setAttribute("cardval", valuator(data.cards[0].value));
      playerHandVal += Number(playerCard3.getAttribute("cardval"));
      playerHandTot.innerText = playerHandVal;
      busted();
    }
     else if(playerCard4.src == "") {
      playerCard4.src = data.cards[0].image;
      playerCard4.setAttribute("cardval", valuator(data.cards[0].value));
      playerHandVal += Number(playerCard4.getAttribute("cardval"));
      playerHandTot.innerText = playerHandVal;
      busted();
    }
    else if(playerCard5.src == "") {
      playerCard5.src = data.cards[0].image;
      playerCard5.setAttribute("cardval", valuator(data.cards[0].value));
      playerHandVal += Number(playerCard5.getAttribute("cardval"));
      playerHandTot.innerText = playerHandVal;
      busted();
    }
    else if(playerCard6.src == "") {
      playerCard6.src = data.cards[0].image;
      playerCard3.setAttribute("cardval", valuator(data.cards[0].value));
      playerHandVal += Number(playerCard6.getAttribute("cardval"));
      playerHandTot.innerText = playerHandVal;
      busted();
    }
   }
 };
    req.open("GET", url);

    req.send();
}


function dealerStay (url) {
  let cardNum = 3
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.response);
        console.log(window['dealerCard' + cardNum]);
        let currentCard = window['dealerCard' + cardNum]
        currentCard.setAttribute("cardval", valuator(data.cards[0].value));
        currentCard.src = data.cards[0].image;
        console.log(dealerHandVal);
        dealerHandVal += Number(currentCard.getAttribute("cardval"));
        console.log(dealerHandVal);
        dealerHandTot.innerText = dealerHandVal;
        // cardNum ++;
        console.log(cardNum);
        stayEval();
        // if(dealerHandVal > 21) {
        //   chipCount.innerText = (currentBet * 2) + chipTotal;
        //   chipTotal = chipCount.innerText;
        //   console.log('YOU WIN');
        //   message.innerText = 'YOU WIN!'
        //   resetHand();
        // }
        // else if(dealerHandVal <= playerHandVal){
        //   chipCount.innerText = (currentBet * 2) + chipTotal;
        //   chipTotal = chipCount.innerText;
        //   console.log('YOU WIN');
        //   message.innerText = 'YOU WIN!'
        //   resetHand();
        // }
        // else if(playerHandVal < dealerHandVal) {
        //   chipCount.innerText =  chipTotal - currentBet;
        //   chipTotal = chipCount.innerText;
        //   console.log('SORRY YOU LOST THE HAND');
        //   message.innerText = 'YOU LOST!'
        //   resetHand();
        // }
      }
    };
    req.open("GET", url);

    req.send();
}
function valuator (card) {
  if(card === 'ACE') {
    return 11;
  }
  if(card === 'JACK' || card === 'QUEEN' || card === 'KING') {
    return 10;
  }
  else  {
    return card;
  }
}
function dealNew (url) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.response);
    if(data.remaining <= 146) {
      reShuffle("https://deckofcardsapi.com/api/deck/4zakt0un65c4/shuffle/");
    }
      dealerCard1.setAttribute("cardval", valuator(data.cards[0].value));
      dealerCard1.src = data.cards[0].image;
      dealerCard2.setAttribute("cardval", valuator(data.cards[1].value));
      dealerCard2.src = data.cards[1].image;
      playerCard1.setAttribute("cardval", valuator(data.cards[2].value));
      playerCard1.src = data.cards[2].image;
      playerCard2.setAttribute("cardval", valuator(data.cards[3].value));
      playerCard2.src = data.cards[3].image;
      dealerHandVal = Number(dealerCard1.getAttribute("cardval")) + Number(dealerCard2.getAttribute("cardval"));
      playerHandVal = Number(playerCard1.getAttribute("cardval")) + Number(playerCard2.getAttribute("cardval"));
      playerHandTot.innerText = playerHandVal;
      dealerHandTot.innerText = dealerHandVal;
      hit.disabled = false;
      stay.disabled = false;
      if(dealerHandVal <= 20  && playerHandVal == 21) {
        chipCount.innerText = (currentBet * 3) + chipTotal;
        chipTotal = chipCount.innerText;
        console.log('BLACKJACK!');
        message.innerText = 'BLACKJACK!!!'
        resetHand();
      }
      else if(dealerHandVal == 21 && playerHandVal < dealerHandVal) {
        chipCount.innerText =  chipTotal - currentBet;
        chipTotal = chipCount.innerText;
        console.log('SORRY YOU LOST THE HAND');
        message.innerText = 'YOU LOST!'
        resetHand();
      }
       else if(dealerHandVal > 14 && playerHandVal >= dealerHandVal){
        chipCount.innerText = (currentBet * 2) + chipTotal;
        chipTotal = chipCount.innerText;
        console.log('YOU WIN');
        message.innerText = 'YOU WIN!'
        resetHand();
      }

     }
  };
  req.open("GET", url);

  req.send();
}

function resetHand() {
  currentBet = 0;
  currentBt.innerText = currentBet;
  playerHandVal = 0;
  playerHandTot.innerText = playerHandVal;
  dealerHandVal = 0;
  dealerHandTot.innerText = dealerHandVal;
  minbet.disabled = false;
  betfive.disabled = false;
  maxBet.disabled = false;
  deal.disabled = true;
  hit.disabled = true;
  stay.disabled = true;
  chipStorage();
  resetSrc();
}

function busted () {
  if(playerHandVal > 21) {
    console.log('YOU BUSTED');
    chipTotal -= currentBet;
    chipCount.innerText = chipTotal;
    message.innerText = 'YOU LOST!'
    resetHand();
  }
}
// dealNew("https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/4zakt0un65c4/draw/?count=4");
// newHit("https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/4zakt0un65c4/draw/?count=1");
// reShuffle("https://deckofcardsapi.com/api/deck/4zakt0un65c4/shuffle/");


function stayEval () {
  if(dealerHandVal > 21) {
    chipCount.innerText = (currentBet * 2) + chipTotal;
    chipTotal = chipCount.innerText;
    console.log('YOU WIN');
    message.innerText = 'YOU WIN!'
    resetHand();
  }
  else if(dealerHandVal <= playerHandVal){
    chipCount.innerText = (currentBet * 2) + chipTotal;
    chipTotal = chipCount.innerText;
    console.log('YOU WIN');
    message.innerText = 'YOU WIN!'
    resetHand();
  }
  else if(playerHandVal < dealerHandVal) {
    chipCount.innerText =  chipTotal - currentBet;
    chipTotal = chipCount.innerText;
    console.log('SORRY YOU LOST THE HAND');
    message.innerText = 'YOU LOST!'
    resetHand();
  }
}
