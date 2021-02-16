let fieldArr = Array.from(document.getElementsByClassName('cell'));
let winNode = document.getElementById('win');
let aiNode = document.querySelector('.ai-btn');
let newGameNode = document.querySelector('.new-game-btn');

let cells = [];
let phase = 1;
// phase 1 is a X move, phase -1 is a O move

let side = Math.sqrt(fieldArr.length);
let isAI = false;

for (let i = 0; i < fieldArr.length; i++) {
    fieldArr[i].addEventListener('click', move);
    cells[i] = null;
}

function move(e) {

    let fieldNode = e.currentTarget;
    let index = fieldArr.indexOf(fieldNode);
    let audio = document.getElementById('tink');

    phase = createMark(phase, fieldNode, index);
    audio.volume = 0.2;
    audio.play();

    if (isAI) {
        aiMove();
    }

}

function createMark(phase, fieldNode, index) {
    cells[index] = phase;

    if (phase > 0) {
        let line1 = fieldNode.querySelector('.line1');
        let line2 = fieldNode.querySelector('.line2');
        line1.classList.add('active');
        line2.classList.add('active');
    } else {
        let circle = fieldNode.querySelector('.circle');
        circle.classList.add('active');
    }

    fieldNode.removeEventListener('click', move);
    if (isVictory(cells, phase) === true) {
        let winner = phase === 1 ? 'X' : 'O';
        setTimeout(() => {
            winNode.innerText = `Victory of ${winner}!`;
        }, 1000);
    }
    return phase = phase === 1 ? -1 : 1;
}

function isVictory(arr, phase) {
    let victory = false;
    for (let i = 0; i < arr.length; i++) {
        if (i % side === 0 && arr[i] === phase && arr[i + 1] === phase && arr[i + 2] === phase ||
            arr[i] === phase && arr[i + side] === phase && arr[i + side * 2] === phase ||
            i === 0 && arr[i] === phase && arr[i + side + 1] === phase && arr[i + (side + 1) * 2] === phase ||
            i === (side - 1) && arr[i] === phase && arr[i + side - 1] === phase && arr[i + (side - 1) * 2] === phase
        ) {
            victory = true;
            for (let i = 0; i < fieldArr.length; i++) {
                fieldArr[i].removeEventListener('click', move);
            }
            return victory;
        }
    }
    return victory;
}

function aiMove() {
    setTimeout(() => {
        fieldNode = getRandomCell();
        phase = createMark(phase, fieldNode, index);
    }, 400);
}

function getRandomCell() {
    index = Math.floor(Math.random() * 9);
    cells[index] !== null ? getRandomCell() : fieldNode = fieldArr[index];
    return fieldNode;
}

aiNode.addEventListener('click', () => {
    isAI = true;
});

newGameNode.addEventListener('click', () => {
    location.reload();
});