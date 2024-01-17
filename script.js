/*
번갈아 가면서 주사위를 던지는 게임입니다. 먼저 누적 점수 50점을 만들면 이깁니다.

주사위를 던졌을 때 숫자가 나오면 1~2는 본인 현재 점수 초기화 후 턴 변경,
 3~6은 현재 점수에 나온 주사위 숫자를 더한다. 
이후에 홀드 하고 현재 점수를 누적 점수에 더할지, 계속 주사위를 던질지 선택한다.
*/
const leftPlayer = document.querySelector('div.left.player');
const rightPlayer = document.querySelector('div.right.player');

const leftScoreDiv = document.querySelector("div.left div.score");
const rightScoreDiv = document.querySelector("div.right div.score");
const diceDiv = document.querySelector(".dice");

const btnRoleDice = document.querySelector("#role");
const btnHold = document.querySelector('#hold');
const btnReset = document.querySelector('#reset');

let leftScore = 0;
let rightScore = 0;
let diceScore;
let turn = true; // true = left, false = right
leftPlayer.style = "background-color: rgba(255, 203, 203)";

function presentPlayerMark () {
    if (turn) {
        leftPlayer.style = "background-color: rgba(255, 203, 203)";
        rightPlayer.style = "background-color: #720455";
    } else {
        rightPlayer.style = "background-color: rgba(255, 203, 203)";
        leftPlayer.style = "background-color: #720455";
    }
}

/* 주사위가 1 또는 2로 나왔을 때 : 점수 초기화 후 턴 변경*/
function resultOneOrTwo () {
    if (turn) {
        leftScoreDiv.innerText = '00';
        leftScore = 0;
    } else {
        rightScoreDiv.innerText = '00';
        rightScore = 0;
    }
};

/* 주사위가 3 이상이 나왔을 때 : 점수 누적. 주사위 계속 굴릴지 상대로 넘길지 선택*/
function resultMoreThree () {
    btnHold.style = "display:visible";
}


function addScore () {
    if (turn) {
        leftScore += diceScore;
        leftScoreDiv.innerText = leftScore.toString().padStart(2, '0');
    } else {
        rightScore += diceScore;
        rightScoreDiv.innerText = leftScore.toString().padStart(2, '0');
    }
};

/* Hold 버튼 눌렀을 때 이벤트 */
function handleHoldBtn () {
    addScore();
    turn = !turn;
    presentPlayerMark();
    btnHold.style = "display:none";
}


function roleDiceResult (diceScore) {
    // 주사위가 1 또는 2로 나왔을 때 : 점수 초기화 후 턴 변경
    if (diceScore <= 2) {
        resultOneOrTwo();
        turn = !turn;
        presentPlayerMark()
    } else { // 주사위가 3 이상이 나왔을 때 : 점수 누적. 주사위 계속 굴릴지 상대로 넘길지 선택
        resultMoreThree();
    }
    
};

/* Reset 버튼 눌렀을 때 이벤트 */
function handleResetBtn () {
    leftScore = 0;
    leftScoreDiv.innerText = '00';
    rightScore = 0;
    rightScoreDiv.innerText = '00';

    turn = true;
}

/* 주사위 굴리는 버튼 눌렀을 때 이벤트 */
function handleRoleDice () {
    diceScore = Math.floor((Math.random() * 6) + 1);
    console.log(diceScore);
    
    diceDiv.innerText = diceScore;
    diceDiv.style = "font-size:32px; padidng:20px auto;";

    roleDiceResult(diceScore);
};

btnRoleDice.addEventListener('click', handleRoleDice);
btnHold.addEventListener('click', handleHoldBtn);
btnReset.addEventListener('click', handleResetBtn);
