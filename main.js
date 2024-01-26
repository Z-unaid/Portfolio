console.log('Working');
let body = document.querySelector('body');
let boxes = body.querySelectorAll('.box'),
resetGame = body.querySelector('#reset-btn'),
winnerMsg = body.querySelector('.msg'),
newGame = body.querySelector('.new-btn'),
winnerMsgTxt = body.querySelector('.winner-msg'),
draw = body.querySelector('.game-draw'),
turnX = true,
count = 0;
let player1 = body.querySelector('.player-1'),
player2 = body.querySelector('.player-2');
const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
  ];

//event listener for boxes
boxes.forEach((box)=>{
  box.addEventListener('click', ()=>{
    console.log('button was clicked');
    if (turnX) {
      box.innerText = 'X';
      box.style.color = '#3C486B'
      turnX = false;
      player1.classList.add('brightness');
      player2.classList.remove('brightness');
    } else {
      box.innerText = 'O';
      box.style.color = '#F45050';
      turnX = true;
      player1.classList.remove('brightness');
      player2.classList.add('brightness');
    }
    count++;
    box.disabled = true;
   let isWinner = checkWinner();
   if(count === 9 && !isWinner){
     gameDraw();
   }
  });
});
const gameDraw = ()=>{
  draw.classList.add('draw-display');
  console.log('game draw');
};
const hideDraw = ()=>{
  resetGameFun();
}
draw.lastElementChild.addEventListener('click',hideDraw);

const checkWinner = ()=>{
  for(let pattern of winPatterns){
let pos1 = boxes[pattern[0]].innerText,
    pos2 = boxes[pattern[1]].innerText,
    pos3 = boxes[pattern[2]].innerText;
 if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showMsg(pos1);
        return true;
      }
    }
  }
};

const showMsg = (winner)=>{
  if (winner === 'X') {
    winnerMsgTxt.firstElementChild.style.color = '#3C486B';
  } else {
    winnerMsgTxt.firstElementChild.style.color = '#F45050';
  }
  winnerMsg.classList.remove('hide-msg');
  winnerMsgTxt.firstElementChild.innerText = winner;
  disableBoxes();
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = '';
  }
};
  
const resetGameFun = ()=>{
  turnX = true;
  count = 0;
  winnerMsg.classList.add('hide-msg');
  enableBoxes();
  draw.classList.remove('draw-display');
  player1.classList.remove('brightness');
  player2.classList.add('brightness');
};
newGame.addEventListener('click', resetGameFun);
resetGame.addEventListener('click', resetGameFun);