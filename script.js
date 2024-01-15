/*
번갈아 가면서 주사위를 던지는 게임입니다. 먼저 누적 점수 50점을 만들면 이깁니다.

주사위를 던졌을 때 숫자가 나오면 1~2는 본인 현재 점수 초기화 후 턴 변경,
 3~6은 현재 점수에 나온 주사위 숫자를 더한다. 
이후에 홀드 하고 현재 점수를 누적 점수에 더할지, 계속 주사위를 던질지 선택한다.
*/

const leftScore = document.querySelector("div.left div.score");
const rightScore = document.querySelector("div.right div.score");
const btnRoleDice = document.querySelector("#role");

let diceScore;
let turn;

function roleDiceResult (diceScore) {
    if (diceScore <= 1) {

    }
    
};


function handleRoleDice () {
    diceScore = Math.floor((Math.random() * 6) + 1);
    console.log(diceScore);
};

btnRoleDice.addEventListener('click', handleRoleDice);

