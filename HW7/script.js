class ImageObject {
    constructor(title, image, description, author, year) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.year = year;
    }
}


const imagesArray = [
    new ImageObject("Stonewall Rebellion", "imeges/Pic1-Sylvia-and-Martha.jpg", "Marsha P Johnson and Sylvia Rivera, two trans women who fought  for queer liberation. Their actions, paired up with many others, led to one of the first pride parades in 1970.", "National Park Service", 1969),
    new ImageObject("women's suffrage movement", "imeges/Pic2-Emmelin-Pankhurst.jpg", "Emmeline Pankhurst, Leader of the British suffragette movement. She contributed a lot in giving women the right to vote.", "imperial war museum", 1914),
    new ImageObject("BLM Movement", "imeges/Pic3-BLM-movement.jpg", "People celebrating in George Floyd Square after his murderer was found guilty", "Stephen Maturen", 2021),
    new ImageObject("Civil Rights Movement", "imeges/Pic4-Civil-rights-movement.jpg", "Martin Luther King Jr. delivered his now-famous I Have a Dream speech in front of 250,000 people at Washington Monument.", "Warren K. Leffler", 1963),
    new ImageObject("Environmental Activism", "imeges/Pic5-Julia-Hill.jpg", "To stop a 1000-year-old redwood tree from being cut down, Julia Butterfly Hill lived atop it for over two years.", "Trees Foundation’s archives", 1998)
];

function showRandomImage() {
    console.log("You just clicked a button! WOW!");
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    const selectedImage = imagesArray[randomIndex];
    console.log("Selected image:", selectedImage);

    document.getElementById('title').textContent = selectedImage.title;
    document.getElementById('image').src = selectedImage.image;
    document.getElementById('image').alt = selectedImage.title;
    document.getElementById('description').textContent = selectedImage.description;
    document.getElementById('author').textContent = `Author: ${selectedImage.author}`;
    document.getElementById('year').textContent = `Year: ${selectedImage.year}`;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMloaded");
    showRandomImage();
    document.querySelector("button").addEventListener("click", showRandomImage);
});
