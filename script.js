/* 번갈아 가면서 주사위를 던지는 게임입니다. 먼저 누적 점수 50점을 만들면 이깁니다.

주사위를 던졌을 때 숫자가 나오면 1~2는 본인 현재 점수 초기화 후 턴 변경,
3~6은 현재 점수에 나온 주사위 숫자를 더한다. 
이후에 홀드 하고 현재 점수를 누적 점수에 더할지, 계속 주사위를 던질지 선택한다. */

/* 플레이어 */
const leftPlayer = document.querySelector('div.left.player');
const rightPlayer = document.querySelector('div.right.player');

/* 점수 */
const leftScoreDiv = document.querySelector("div.left div.score");
const rightScoreDiv = document.querySelector("div.right div.score");
const diceDiv = document.querySelector(".dice");

/* 버튼 */
const btnLeftRoleDice = document.querySelector(".left button.role");
const btnRightRoleDice = document.querySelector(".right button.role");
const btnLeftHold = document.querySelector('.left button.hold');
const btnRightHold = document.querySelector('.right button.hold');
const btnReset = document.querySelector('#reset');

/* 초기 세팅 */
let leftScore = 0;
let rightScore = 0;
let diceScore;
let turn = true; // true = left, false = right
leftPlayer.style = "background-color: var(--markColor)";
btnRightRoleDice.style = "display:none";
btnLeftHold.style = "display:none";
btnRightHold.style = "display:none";

/* 주사위 모양 바꾸기 */
function changeDiceShape (diceScore) {
    for (let idx=1; idx<=6; idx++) {
        if (idx<=diceScore) {
            diceDiv.querySelector(`.pip:nth-child(${idx})`).style = "display: initial";
        } else {
            diceDiv.querySelector(`.pip:nth-child(${idx})`).style = "display: none";
        }
    }

    if (diceScore === 3) {
        diceDiv.classList = 'dice dice-3';
    } else if (diceScore === 5) {
        diceDiv.classList = 'dice dice-5';
    } else {
        diceDiv.classList = 'dice';
    }
};

/* Turn 변경 */
function turnChange (presentTurn) {
    turn = presentTurn;

    // 현재 플레이어 표시 + Role 버튼
    if (presentTurn) {
        leftPlayer.style = "background-color: var(--markColor)";
        rightPlayer.style = "background-color: var(--scoreBoardColor)";

        btnLeftRoleDice.style = "display:visible";
        btnRightRoleDice.style = "display:none";
    } else {
        rightPlayer.style = "background-color: var(--markColor)";
        leftPlayer.style = "background-color: var(--scoreBoardColor)";

        btnRightRoleDice.style = "display:visible";
        btnLeftRoleDice.style = "display:none";
    }
}

/* 현재 플레이어 표시 */
function presentPlayerMark () {
    if (turn) {
        leftPlayer.style = "background-color: var(--markColor)";
        rightPlayer.style = "background-color: var(--scoreBoardColor)";
    } else {
        rightPlayer.style = "background-color: var(--markColor)";
        leftPlayer.style = "background-color: var(--scoreBoardColor)";
    }
}

/* 점수 초기화 */
function resetScore() {
    if (turn) {
        leftScoreDiv.innerText = '00';
        leftScore = 0;
    } else {
        rightScoreDiv.innerText = '00';
        rightScore = 0;
    }
}

/* 게임 종료 시 */
function gameOver () {
    const gameOverPopUp = document.createElement('div');
    const gameOverH1 = document.createElement('h1');
    const gameOverH2 = document.createElement('h2');
    const gameOverButton = document.createElement('a');

    document.body.appendChild(gameOverPopUp);
    gameOverPopUp.appendChild(gameOverH1);
    gameOverPopUp.appendChild(gameOverH2);
    gameOverPopUp.appendChild(gameOverButton);
    gameOverPopUp.classList = 'game-over';

    gameOverButton.addEventListener('click', handleResetBtn);

    gameOverH1.innerText = '게임 종료';
    gameOverButton.innerText = 'New Game';
    if (turn) {
        gameOverH2.innerText = 'Winner : Player 1';
    } else {
        gameOverH2.innerText = 'Winner : Player 2';
    }

    btnLeftRoleDice.removeEventListener('click', handleRoleDice);
    btnRightRoleDice.removeEventListener('click', handleRoleDice);
    btnLeftHold.removeEventListener('click', handleHoldBtn);
    btnRightHold.removeEventListener('click', handleHoldBtn);

    btnReset.style = 'diplay: none';
}

/* 점수 누적 */
function addScore () {
    if (turn) {
        leftScore += diceScore;
        leftScoreDiv.innerText = leftScore.toString().padStart(2, '0');

        if (leftScore >= 5) {
            gameOver();
        }
    } else {
        rightScore += diceScore;
        rightScoreDiv.innerText = rightScore.toString().padStart(2, '0');

        if (rightScore >= 5) {
            gameOver();
        }
    }
};

/* Hold 버튼 눌렀을 때 이벤트 */
function handleHoldBtn () {
    if (turn) {
        btnLeftHold.style = "display:none"; // Hold 버튼 숨기기
    } else {
        btnRightHold.style = "display:none"; // Hold 버튼 숨기기
    }

    turnChange(!turn);   // Turn 변경
}

/* 주사위 점수별 동작 */
function roleDiceResult (diceScore) {
    // 주사위가 1 또는 2로 나왔을 때 : 점수 초기화 후 턴 변경
    if (diceScore <= 2) {
        resetScore(); // 점수 초기화
        turnChange(!turn); // 턴 변경

        // 주사위가 3 이상이 나왔을 때 : 점수 누적. 주사위 계속 굴릴지 상대로 넘길지 선택
    } else { 
        addScore();
        if (turn) {
            btnLeftHold.style = "display: visible"; // hold 버튼 등장
            
        } else {
            btnRightHold.style = "display: visible"; // hold 버튼 등장
            
        }
    }
    
};

/* 주사위 굴리는 버튼 눌렀을 때 이벤트 */
function handleRoleDice () {

    // 주사위 점수
    diceScore = Math.floor((Math.random() * 6) + 1);

    // 주사위 모양 바꾸기
    changeDiceShape(diceScore);
    
    // 점수별 동작
    roleDiceResult(diceScore);


    console.log('turn: ', turn, 'left', leftScore, 'right', rightScore);
    console.log('diceScore', diceScore)
};



/* Reset 버튼 눌렀을 때 이벤트 */
function handleResetBtn () {
    // 점수 초기화
    leftScore = 0;
    leftScoreDiv.innerText = '00';
    rightScore = 0;
    rightScoreDiv.innerText = '00';

    turn = true; // true = left, false = right
    leftPlayer.style = "background-color: var(--markColor)";
    btnRightRoleDice.style = "display:none";
    btnLeftHold.style = "display:none";
    btnRightHold.style = "display:none";
}


btnLeftRoleDice.addEventListener('click', handleRoleDice);
btnRightRoleDice.addEventListener('click', handleRoleDice);
btnLeftHold.addEventListener('click', handleHoldBtn);
btnRightHold.addEventListener('click', handleHoldBtn);
btnReset.addEventListener('click', handleResetBtn);


