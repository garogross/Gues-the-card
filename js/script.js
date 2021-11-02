"use strict";

// ! buttons

const startBtn = document.querySelector(".start-btn");
const lowerBtn = document.querySelector(".lower-btn");
const higherBtn = document.querySelector(".higher-btn");
const restartBtn = document.querySelector(".restart-btn");

// ! html elements

const buutons = document.querySelector(".buttons");
const card = document.querySelector(".card");
const heartsNum = document.querySelector(".hearts-num");
const scoreNum = document.querySelector(".score-num");
const highscoreNum = document.querySelector(".highscore-num");

// ! new variables

const cardArr = [];
let score = 0;
let hearts = 5;
let highscore = 0
// ! functions

const openCard = function () {
  const cardNum = Math.trunc(Math.random() * 13) + 1;
  card.src = `card-${cardNum}.png`;
  card.classList.remove("card-anim");
  setTimeout(function () {
    card.classList.add("card-anim");
  }, 100);
  cardArr.push(cardNum);
  if(cardArr.length === 3){
    cardArr.shift()
  } 
  if(score > highscore){
    highscore = score
  }
  localStorage.setItem("highscore", JSON.stringify(highscore))
  const data = JSON.parse(localStorage.getItem("highscore"))
  // if(!data) return ;
  highscore = data
  highscoreNum.textContent = highscore
  console.log(data)
};
const calcScoreHigh = function () {
  cardArr.reduce((acc, cur) => {
      if (cur >= acc) {
        score += 100;
        scoreNum.textContent = score;
      } else if (hearts > 0) {
        hearts -= 1;
      }
    heartsNum.textContent = "❤".repeat(hearts);
  });
};



const calcScoreLow = function () {
  const curCard = cardArr.reduce((acc, cur) => {

      if (cur <= acc) {
        score += 100;
        scoreNum.textContent = score;
      } else if (hearts > 0) {
        hearts -= 1;
      }
    heartsNum.textContent = "❤".repeat(hearts);
  });
};

const hidden = function () {
    startBtn.classList.add("hidden-opp");
    // buutons.classList.remove("hidden-display")
    buutons.classList.remove("hidden-opp");
    setTimeout(function () {
        startBtn.classList.add("hidden-display");
    }, 1000);
};

const loseFunc = function(){
   if(hearts === 0){
    document.querySelector("body").classList.add("lose-body")
    document.querySelector(".tittle")
    .textContent = `You Lose Your Score Is ${score}`
    document.querySelector(".tittle").classList.add("white-text")
    document.querySelector(".highscore-text").classList.add("white-text")
   }
}
const restartFunc = function(){
  document.querySelector("body").classList.remove("lose-body")
  document.querySelector(".tittle").textContent = "Guess The Next Card"
    document.querySelector(".tittle").classList.remove("white-text")
    document.querySelector(".highscore-text").classList.remove("white-text")
    score = 0;
    hearts = 5
    heartsNum.textContent = "❤".repeat(hearts);
    scoreNum.textContent = score;
    startBtn.classList.remove('hidden-opp')
    startBtn.classList.remove('hidden-display')
    card.classList.remove("card-anim")

}
// ! addeventlisteners

startBtn.addEventListener("click", function () {
  openCard();
  hidden();
});
higherBtn.addEventListener("click", function () {
  if (hearts !== 0) {
    openCard();
    calcScoreHigh();
    loseFunc()

  }
});
lowerBtn.addEventListener("click", function () {
    if (hearts !== 0) {
      openCard();
        calcScoreLow();
        loseFunc()
      }

});
restartBtn.addEventListener("click", restartFunc)