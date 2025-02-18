document.addEventListener("DOMContentLoaded", function() {
    const CoverImage = 'images/question mark icon.png';
    const images = ['images/Frog Green 1.png','images/Frog Light Blue 2.png','images/Frog Maganta 3.png',
        'images/Frog Orange 4.png','images/Frog Dark Blue 5.png','images/Frog Red 6.png'];

    let FrogImages = [...images, ...images];

    FrogImages.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('game-board');

    FrogImages.forEach((image, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        
        let img = document.createElement('img');
        img.src = CoverImage;
        img.dataset.actualSrc = image; 
        card.appendChild(img);
        card.addEventListener('click', () => {
            img.src = img.dataset.actualSrc;
        });

        gameBoard.appendChild(card);
    });
});
