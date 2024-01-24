/* 번갈아 가면서 주사위를 던지는 게임. 누적 점수 50점을 먼저 만들면 승.
주사위 1~2점 : 현재 점수 초기화 후 턴 변경
주사위 3~6점 : 현재 점수 + 주사위 점수 
-> Hold : 누적 점수 keep하고 턴 변경 | Role : 주사위 굴리기 */

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

/* 점수 초기화 */
function resetScore(presentTurn) {
    if (presentTurn) {
        leftScoreDiv.innerText = '00';
        leftScore = 0;
    } else {
        rightScoreDiv.innerText = '00';
        rightScore = 0;
    }
}



/* 게임 종료 시 */
function gameOver (winner) {
    // 게임 종료 화면 띄우기
    gameOverH1.innerText = '게임 종료';
    gameOverRestart.innerText = 'New Game';
    if (winner) {
        gameOverH2.innerText = 'Winner : Player 1';
    } else {
        gameOverH2.innerText = 'Winner : Player 2';
    }

    gameOverPopUp.classList = 'game-over';

    btnLeftRoleDice.removeEventListener('click', handleRoleDice);
    btnRightRoleDice.removeEventListener('click', handleRoleDice);
    btnLeftHold.removeEventListener('click', handleHoldBtn);
    btnRightHold.removeEventListener('click', handleHoldBtn);

    btnReset.style = 'display: none';
    gameOverRestart.addEventListener('click', handleResetBtn);
}

/* Hold 버튼 눌렀을 때 이벤트 */
function handleHoldBtn (presentTurn) {
    turnChange(!presentTurn);   // Turn 변경
    btnLeftHold.style = "display:none"; // Hold 버튼 숨기기
    btnRightHold.style = "display:none"; // Hold 버튼 숨기기
}

/* 점수 누적 */
function addScore (presentTurn) {
    // Player 1
    if (presentTurn) {
        leftScore += diceScore;
        leftScoreDiv.innerText = leftScore.toString().padStart(2, '0');

        if (leftScore >= finalScore) {
            gameOver(true);
        }
    // Player 2
    } else {
        rightScore += diceScore;
        rightScoreDiv.innerText = rightScore.toString().padStart(2, '0');

        if (rightScore >= finalScore) {
            gameOver(false);
        }
    }
};

/* 주사위 점수별 동작 */
function roleDiceResult (diceScore, presentTurn) {
    // 주사위가 1 또는 2로 나왔을 때 : 점수 초기화 후 턴 변경
    if (diceScore <= 2) {
        resetScore(presentTurn); // 점수 초기화
        turnChange(!presentTurn); // 턴 변경
        if (presentTurn) {
            btnLeftHold.style = "display:none"; // Hold 버튼 숨기기
        } else {
            btnRightHold.style = "display:none"; // Hold 버튼 숨기기
        }

    // 주사위가 3 이상이 나왔을 때 : 점수 누적. 주사위 계속 굴릴지 상대로 넘길지 선택
    } else { 
        addScore(presentTurn);
        if (presentTurn) {
            btnLeftHold.style = "display: visible;"; // hold 버튼 등장
            btnLeftRoleDice.style = "left: calc(50vw - 22.5rem)";
        } else {
            btnRightHold.style = "display: visible;"; // hold 버튼 등장
            btnRightRoleDice.style = "right: calc(50vw - 22.5rem)";
        }
    }  
};


/* 주사위 굴리는 버튼 눌렀을 때 이벤트 */
function handleRoleDice (presentTurn) {
    // 주사위 점수
    diceScore = Math.floor((Math.random() * 6) + 1);
    // 주사위 모양 바꾸기
    changeDiceShape(diceScore);
    // 점수별 동작
    roleDiceResult(diceScore, presentTurn);

    console.log('turn: ', turn, 'left', leftScore, 'right', rightScore);
    console.log('diceScore', diceScore)
};

/* Reset 버튼 눌렀을 때 이벤트 */
function handleResetBtn () {
    turnChange (true);

    // 초기화
    leftScore = 0;
    leftScoreDiv.innerText = '00';
    rightScore = 0;
    rightScoreDiv.innerText = '00';
    
    btnLeftRoleDice.style = "display:initial";
    btnRightRoleDice.style = "display:none";
    btnLeftHold.style = "display:none";
    btnRightHold.style = "display:none";

    for (let idx=1; idx<=6; idx++) {
        diceDiv.querySelector(`.pip:nth-child(${idx})`).style = "display: initial";
    };
    diceDiv.classList = 'dice';

    // gameover 창 닫기
    gameOverPopUp.classList = 'pop-up';
    gameOverH1.innerText = '';
    gameOverH2.innerText = '';
    gameOverRestart.innerText = '';

    btnReset.style = 'diplay: initial';
}

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

/* game over 화면 */
const gameOverPopUp = document.querySelector('div.pop-up');
const gameOverH1 = document.querySelector('.pop-up h1');
const gameOverH2 = document.querySelector('.pop-up h2');
const gameOverRestart = document.querySelector('.pop-up div');

/* 초기 세팅 */
let leftScore = 0;
let rightScore = 0;
let diceScore;
let turn = true; // true = left, false = right
let finalScore = 50; // 게임 종료되는 점수
leftPlayer.style = "background-color: var(--markColor)";
btnRightRoleDice.style = "display:none";
btnLeftHold.style = "display:none";
btnRightHold.style = "display:none";


btnLeftRoleDice.addEventListener('click', () => handleRoleDice(turn));
btnRightRoleDice.addEventListener('click', () => handleRoleDice(turn));
btnLeftHold.addEventListener('click', () => handleHoldBtn(turn));
btnRightHold.addEventListener('click', () => handleHoldBtn(turn));
btnReset.addEventListener('click', handleResetBtn);