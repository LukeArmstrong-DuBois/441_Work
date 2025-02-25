document.getElementById('player-form').addEventListener('submit', startGame);

let attempts = 0;
let firstCard, secondCard;
let lockBoard = false;
let playerInfo = {};
let playerInfoJSON = ""

const tiles = [
    'images/KirbyPow1.png', 'images/KirbyPow2.png', 'images/KirbyPow3.png', 'images/KirbyPow4.png', 'images/KirbyPow5.png', 'images/KirbyPow6.png', 'images/KirbyPow1.png', 'images/KirbyPow2.png', 'images/KirbyPow3.png', 'images/KirbyPow4.png', 'images/KirbyPow5.png', 'images/KirbyPow6.png'
];

function startGame(event) {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const age = document.getElementById('age').value;
    playerInfo = {
        firstName,
        lastName,
        age,
        attempts: 0
    };

    playerInfoJSON = JSON.stringify(playerInfo);

    document.getElementById('player-form').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';

    shuffle(tiles);
    const gridContainer = document.querySelector('.grid-container');
    tiles.forEach(tile => {
        const card = document.createElement('div');
        card.classList.add('grid-item');
        card.dataset.tile = tile;
        card.style.backgroundImage = 'url("images/question mark icon.png")';
        card.addEventListener('click', flipCard);
        gridContainer.appendChild(card);
    });

    console.log('Player Info:', playerInfo);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.style.backgroundImage = `url(${this.dataset.tile})`;
    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    attempts++;
    document.getElementById('attempts').textContent = attempts;
    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.tile === secondCard.dataset.tile;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    if (document.querySelectorAll('.grid-item:not(.flipped)').length === 0) {
        setTimeout(() => alert(`${playerInfo.firstName} ${playerInfo.lastName}, age ${playerInfo.age}, took ${attempts} attempts.`), 500);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.style.backgroundImage = 'url("images/question mark icon.png")';
        secondCard.classList.remove('flipped');
        secondCard.style.backgroundImage = 'url("images/question mark icon.png")';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
