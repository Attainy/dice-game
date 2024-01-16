/*
번갈아 가면서 주사위를 던지는 게임입니다. 먼저 누적 점수 50점을 만들면 이깁니다.

주사위를 던졌을 때 숫자가 나오면 1~2는 본인 현재 점수 초기화 후 턴 변경,
 3~6은 현재 점수에 나온 주사위 숫자를 더한다. 
이후에 홀드 하고 현재 점수를 누적 점수에 더할지, 계속 주사위를 던질지 선택한다.
*/

const leftScoreDiv = document.querySelector("div.left div.score");
const rightScoreDiv = document.querySelector("div.right div.score");
const btnRoleDice = document.querySelector("#role");
const diceDiv = document.querySelector(".dice");

//let leftScore = 
console.log('score', leftScoreDiv.getAttribute('innerText'))
let leftScore;
let rightScore;
let diceScore;
let turn = true; // true = left, false = right


function resultOneOrTwo () {
    if (turn) {
        leftScoreDiv.innerText = '00';
        leftScore = 0;
    } else {
        rightScoreDiv.innerText = '00';
        rightScore = 0;
    }
};

function resultMoreThree () {
    if (turn) {
        leftScore += diceScore;
        leftScoreDiv.innerText = leftScore.toString().padStart(2, '0');
    } else {
        rightScore += diceScore;
        rightScoreDiv.innerText = leftScore.toString().padStart(2, '0');
    }
};

function roleDiceResult (diceScore) {
    if (diceScore <= 2) {
        resultOneOrTwo();
        turn = !turn;
        console.log(turn);
    } else {
        resultMoreThree();
    }
    
};


function handleRoleDice () {
    diceScore = Math.floor((Math.random() * 6) + 1);
    console.log(diceScore);
    
    diceDiv.innerText = diceScore;
    diceDiv.style = "font-size:32px; padidng:20px auto;";

    roleDiceResult(diceScore);
};

btnRoleDice.addEventListener('click', handleRoleDice);

