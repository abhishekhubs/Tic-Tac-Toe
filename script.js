
let boxes = [...document.querySelectorAll('.box')];
let shape = 'circle';
let original = shape;
let count = 0;
let p1Score = 0, p2Score = 0;

const p1ScoreDiv = document.querySelector('.p1Score');
const p2ScoreDiv = document.querySelector('.p2Score');
const winnerDiv = document.querySelector('.winner');
const p1NameSpan = document.querySelector('.p1Name');
const p2NameSpan = document.querySelector('.p2Name');

// Player name setup
const playerSetup = document.querySelector('.player-setup');
const board = document.querySelector('.board');
const score = document.querySelector('.score');
const startBtn = document.getElementById('startGame');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

let player1Name = 'circle';
let player2Name = 'cross';

startBtn.addEventListener('click', () => {
    player1Name = player1Input.value.trim() || 'circle';
    player2Name = player2Input.value.trim() || 'cross';
    p1NameSpan.textContent = player1Name;
    p2NameSpan.textContent = player2Name;
    playerSetup.style.display = 'none';
    board.style.display = '';
    score.style.display = '';
});

function addBoxListeners() {
    boxes.forEach((box) => {
        box.addEventListener('click', updateBoard);
    });
}

function updateBoard(e) {
    const box = e.target;
    if (box.firstChild) return;
    const element = document.createElement('div');
    element.classList.add(shape);
    box.appendChild(element);
    // Add fade-out animation
    box.classList.add('fade-out');
    setTimeout(() => {
        box.classList.remove('fade-out');
    }, 500);
    shape = (shape === 'circle') ? 'cross' : 'circle';
    box.removeEventListener('click', updateBoard);
    processResult();
}

addBoxListeners();

const processResult = () => {
    const boxes = [...document.querySelectorAll('.box')]
    count++

    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(combo => {
        const color = new Array(3)
        const circleWins = combo.every(index => {
            if(boxes[index].firstChild?.classList.contains('circle')) {
                color.push(boxes[index])
            }
            return boxes[index].firstChild?.classList.contains('circle')
        })

        if(circleWins) {
            colorBoxes(color)
            p1ScoreDiv.innerText = `${++p1Score}`

            winnerDiv.innerText = `${player1Name} wins`

            setTimeout(() => {
                eraseBoard(boxes, color)
            }, 800);
            count = 0
            shape = (original === 'circle') ? 'cross' : 'circle'
            original = shape
            return
        }

        color.splice(0, color.length)
        const crossWins = combo.every(index => {
            if(boxes[index].firstChild?.classList.contains('cross')) {
                color.push(boxes[index])
            }
            return boxes[index].firstChild?.classList.contains('cross')
        })

        if(crossWins) {
            colorBoxes(color)
            p2ScoreDiv.innerText = `${++p2Score}`

            winnerDiv.innerText = `${player2Name} wins`

            setTimeout(() => {
                eraseBoard(boxes, color)
            }, 800);
            count = 0
            shape = (original === 'circle') ? 'cross' : 'circle'
            original = shape
            return
        }
    })
    
    // console.log(count)
    if(count == 9) {
        setTimeout(() => {
            eraseBoard(boxes)
        }, 800)
    winnerDiv.innerText = 'draw'
        count = 0
        console.log(shape)
        shape = (original === 'circle') ? 'cross' : 'circle'
        console.log(shape)
        original = shape
    }
}

const colorBoxes = (boxes) => {
    boxes.forEach(box => {
        box.style.backgroundColor = 'rgb(157, 199, 255)'
    })
}

const eraseBoard = (boxes, color) => {
    if(color) {
        color.forEach(box => {
            box.style.backgroundColor = 'rgb(36, 36, 36)'
        })
    }
    boxes.forEach(box => {
        if(box.firstChild) {
            box.firstChild.remove();
            box.addEventListener('click', updateBoard);
        }
    });
}
