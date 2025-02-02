function checkAge(age) {
    if (age >= 18) {
        document.getElementById("message").textContent = "You're allowed to enter, but be warned, this story is not for the faint of heart...";
    } else {
        document.getElementById("message").textContent = "Sorry, kid, this story'sfor grown-ups. Go eat some candy and enjoy your childhood!";
    }
}
function chooseForest() {
    document.getElementById("story-text").textContent = "Robert makes it to the center of the forest. Suddenly, rustling can be heard nearby.  Do you want to investigate the noise, hide, or run?";
    updateButtons("Investigate", "Hide", "BOOK It!", investigate, hide, bookit);
}

function chooseField() {
    document.getElementById("story-text").textContent = "Bobert makes it across the open field but finds himself in the middle of a road. A car's coming right for him!";
    updateButtons("Run", "Hide", "Dig", run, hide, digHole);
}

function updateButtons(text1, text2, text3, func1, func2, func3) {
    let buttons = document.querySelectorAll("button");
    buttons[0].textContent = text1;
    buttons[0].onclick = func1;
    buttons[1].textContent = text2;
    buttons[1].onclick = func2;
    let button3 = document.createElement("button");
    button3.textContent = text3;
    button3.onclick = func3;
    buttons[1].parentNode.appendChild(button3);
}

function investigate() {
    document.getElementById("story-text").textContent = "Bobert looks behind the foliage and sees a family of squirrels that offer to let him join their family. You Win!";
}

function hide() {
    document.getElementById("story-text").textContent = "Bobert hides behind a rock, and it protects him for a moment, but the danger is still there!";
}

function bookit() {
    document.getElementById("story-text").textContent = "Bobert hopped away but couldn't help but imagine the creature in the bush being nice. You win, but Bobert is sad...";
}

function run() {
    document.getElementById("story-text").textContent = "Bobert dodges the car quickly and gets to the other side of the road. It's a bunny sanctuary. You win!";
}

function digHole() {
    document.getElementById("story-text").textContent = "Unfortunately, it's a paved road, so you're unable to dig. You lose!";
}