function Player(phase, isBot) {
    this.phase = phase;
    this.isBot = isBot;
    // if (isBot === true) {

    // }

    this.isVictory = function () {
        let victory = false;
        let side = gameController.side;
        let phase = this.phase;

        console.log('start isVictory! phase: ', phase);

        gameController.cells.forEach((_, idx, cells) => {
            if (idx % side === 0 && cells[idx] === phase && cells[idx + 1] === phase && cells[idx + 2] === phase ||
                cells[idx] === phase && cells[idx + side] === phase && cells[idx + side * 2] === phase ||
                idx === 0 && cells[idx] === phase && cells[idx + side + 1] === phase && cells[idx + (side + 1) * 2] === phase ||
                idx === (side - 1) && cells[idx] === phase && cells[idx + side - 1] === phase && cells[idx + (side - 1) * 2] === phase
            ) {
                victory = true;
                return victory;
            }
            console.log('victory, phase: ', victory, phase);
        });

        console.log('end isVictory!');

        return victory;
    };

    this.move = function (index) {
        gameController.cells[index] = this.phase;
        this.winner = this.isVictory();
        if (this.isBot === true) {
            index = this.chose();
            console.log('Bot index:', index);
        }
        if (this.winner === false) {
            gameController.transferMove();
        }
    };

    this.chose = function () {
        index = Math.floor(Math.random() * 9);
        if (gameController.cells[index] !== null) {
            this.chose();
        }
        return index;
    };

}

const gameController = {
    cells: [],

    init(side, isBot) {
        this.side = side;
        this.playerX = new Player(1, isBot);
        console.log('playerX: ', this.playerX);
        this.playerO = new Player(-1, isBot);
        console.log('playerO: ', this.playerO);
        this.currentPlayer = this.playerX;
        console.log('gameController: ', this);
    },

    transferMove() {
        this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
    },

    // isVictory() {
    //     let victory = false;
    //     let side = this.side;
    //     let phase = this.currentPlayer.phase;

    //     console.log('start isVictory! phase: ', phase);

    //     this.cells.forEach((_, idx, cells) => {
    //         if (idx % side === 0 && cells[idx] === phase && cells[idx + 1] === phase && cells[idx + 2] === phase ||
    //             cells[idx] === phase && cells[idx + side] === phase && cells[idx + side * 2] === phase ||
    //             idx === 0 && cells[idx] === phase && cells[idx + side + 1] === phase && cells[idx + (side + 1) * 2] === phase ||
    //             idx === (side - 1) && cells[idx] === phase && cells[idx + side - 1] === phase && cells[idx + (side - 1) * 2] === phase
    //         ) {
    //             victory = true;
    //             return victory;
    //         }
    //         console.log('victory, phase: ', victory, phase);
    //     });

    //     console.log('end isVictory!');

    //     return victory;
    // },

    // move(index) {
    //     this.cells[index] = this.currentPlayer.phase;
    //     this.winner = this.isVictory();
    //     if (this.currentPlayer.isBot === true) {
    //         index = this.currentPlayer.chose();
    //         console.log('index:', index);
    //     }
    //     if (this.winner === false) {
    //         this.transferMove();
    //     }
    // },
};

const UIHandler = () => {
    let fieldArr = Array.from(document.getElementsByClassName('cell'));
    let winNode = document.querySelector('.win');
    let botNode = document.querySelector('.ai-btn');
    let newGameNode = document.querySelector('.new-game-btn');

    let side = Math.sqrt(fieldArr.length);
    let isBot = false;

    let audio = document.getElementById('tink');
    audio.volume = 0.2;

    gameController.init(side, isBot);
    console.log('1. gameController.init!');

    function getMoveEvent(e) {
        let fieldNode = e.currentTarget;
        let index = fieldArr.indexOf(fieldNode);

        createMark(fieldNode);
        gameController.currentPlayer.move(index);

        console.log('4. index:', index);
        console.log('5. gameController.cells[index]:', gameController.cells[index]);
        console.log('6. gameController.cells:', gameController.cells);

        if (gameController.currentPlayer.winner === true) {
            fieldArr.forEach(item => {
                item.removeEventListener('click', getMoveEvent);
            });
            console.log('fieldArr[i].removeEventListener!');
            let winner = gameController.currentPlayer === gameController.playerX ? 'X' : 'O';
            setTimeout(() => {
                winNode.innerText = `Victory of ${winner}!`;
            }, 1000);
        }

        // if (isBot) {
        //     aiMove();
        // }

    }

    function createMark(fieldNode) {

        audio.play();

        if (gameController.currentPlayer.phase > 0) {
            let line1 = fieldNode.querySelector('.line1');
            let line2 = fieldNode.querySelector('.line2');
            line1.classList.add('active');
            line2.classList.add('active');
        } else {
            let circle = fieldNode.querySelector('.circle');
            circle.classList.add('active');
        }

        fieldNode.removeEventListener('click', getMoveEvent);

    }

    fieldArr.forEach(item => {
        item.addEventListener('click', getMoveEvent);
        gameController.cells.push(null);
        console.log('2. gameController.cells.push(null):');
    });

    console.log('3. gameController:', gameController);

    botNode.addEventListener('click', () => {
        // isBot = true;
        gameController.currentPlayer.isBot = true;
        botNode.classList.add('botEnabled');
        console.log('gameController.currentPlayer.isBot:', gameController.currentPlayer.isBot);
    });

    // if (gameController.currentPlayer.isBot === true) {
    //     console.log('fieldArr[index]:', fieldArr[index]);
    //     let index = gameController.currentPlayer.chose();
    //     console.log('fieldArr[index]:', fieldArr[index]);
    //     let fieldNode = fieldArr[index];

    //     createMark(fieldNode);
    //     gameController.move(index);
    // };

    newGameNode.addEventListener('click', () => {
        location.reload();
    });

};

document.addEventListener('DOMContentLoaded', () => {
    UIHandler();
})