$(document).ready(function() {
    const elements = [
        { type: 'image', src: 'imeges/CatPic1.jpg' },
        { type: 'image', src: 'imeges/CatPic2.jpg' },
        { type: 'image', src: 'imeges/CatPic3.jpg' },
        { type: 'text', value: 'Youre doing a great job!' },
        { type: 'text', value: 'Appreciate yourself!' },
        { type: 'text', value: 'You look like a million bucks!' }
    ];
    let currentIndex = 0;

    function rotateElements() {
        const currentElement = elements[currentIndex];
        if (currentElement.type === 'image') {
            $('#image').fadeOut(1000, function() {
                $(this)
                    .attr('src', currentElement.src)
                    .fadeIn(1000);
            });
        } else {
            $('#text').fadeOut(1000, function() {
                $(this).text(currentElement.value).fadeIn(200);
            });
        }
        currentIndex = (currentIndex + 1) % elements.length;
    }
    setInterval(rotateElements, 3000);

    function moveShapes() {
        const shapes = ['circle', 'square', 'triangle'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const shape = $('<div>')
            .addClass(`shape ${randomShape}`)
            .appendTo('#shapes-container');

        const startX = Math.random() * $(window).width();
        const startY = Math.random() * $(window).height();
        const endX = Math.random() * $(window).width();
        const endY = Math.random() * $(window).height();

        shape.css({ top: startY, left: startX });

        shape.animate(
            { top: endY, left: endX },
            5000,
            function() {
                $(this).remove();
            }
        );
    }
    setInterval(moveShapes, 2000);

    const movingImages = ['imeges/CatPic1.jpg', 'imeges/CatPic2.jpg', 'imeges/CatPic3.jpg'];
    let movingImageIndex = 0;

    function moveImages() {
        const movingImage = $('<img>')
            .attr('src', movingImages[movingImageIndex])
            .addClass('moving-image')
            .addClass('spinning')
            .appendTo('#container');

        movingImageIndex = (movingImageIndex + 1) % movingImages.length;

        const startX = Math.random() * $(window).width();
        const startY = Math.random() * $(window).height();
        const endX = Math.random() * $(window).width();
        const endY = Math.random() * $(window).height();

        movingImage.css({ top: startY, left: startX });

        movingImage.animate(
            { top: endY, left: endX },
            5000,
            function() {
                $(this).remove();
            }
        );
    }
    setInterval(moveImages, 3000);

    function moveText() {
        const movingTexts = elements.filter(e => e.type === 'text');
        const randomText = movingTexts[Math.floor(Math.random() * movingTexts.length)];
        const textElement = $('<div>')
            .addClass('moving-text')
            .text(randomText.value)
            .appendTo('#container');

        const startX = Math.random() * $(window).width();
        const startY = Math.random() * $(window).height();
        const endX = Math.random() * $(window).width();
        const endY = Math.random() * $(window).height();

        textElement.css({ top: startY, left: startX, position: 'absolute' });

        textElement.animate(
            { top: endY, left: endX },
            5000,
            function() {
                $(this).remove();
            }
        );
    }
    setInterval(moveText, 4000);
});
