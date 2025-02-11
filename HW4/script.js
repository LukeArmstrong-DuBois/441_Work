let storyPart = 0;
let inventory = [];

function makeChoice() {
    const userInput = document.getElementById('user-input').value.toLowerCase();
    document.getElementById('user-input').value = '';

    switch (storyPart) {
        case 0:
            startAdventure();
            break;
        case 1:
            if (userInput.includes('food')) {
                updateStory("Bobert did feel a little peckish; he eats some vegetables and feels energized. What will he do next? (explore/nap)", "images/VegPic.jpg");
                storyPart++;
            } else if (userInput.includes('weapon')) {
                inventory.push('wooden weapon');
                updateStory("Bobert searches through the leaves and finds a sword made from a unicorn horn. What will he do next? (explore/nap)", "images/EpicSword.jpg");
                storyPart++;
            } else {
                invalidChoice();
            }
            break;
        case 2:
            if (userInput.includes('explore')) {
                updateStory("Bobert remembers his squirrel friends from the last story. He tries to find them, but they're gone from their house. Where will he search? (river/trees)", "images/NoDen.jpg");
                storyPart++;
            } else if (userInput.includes('nap')) {
                updateStory("Bobert takes a nap and feels refreshed. He remembers his squirrel friends from the last story. He should search for them! (river/trees)", "images/SleepingBob.jpg");
                storyPart++;
            } else {
                invalidChoice();
            }
            break;
        case 3:
            if (userInput.includes('river')) {
                updateStory("Bobert is a good swimmer and makes it to the other side of the river. He hears some faint squeaking. (follow sound/ignore it)", "images/RiverCross.jpg");
                storyPart++;
            } else if (userInput.includes('tree')) {
                updateStory("Bobert hears a subtle squeaking sound coming from high up a tree. What could it be? (follow sound/ignore it )", "images/UpTreePov.jpg");
                storyPart++;
            } else {
                invalidChoice();
            }
            break;
        case 4:
            if (userInput.includes('follow sound')) {
                inventory.push('forest animals');
                updateStory("The sound reveals itself to be the squirrel family. Good friends of Bobert. They decide to come for the journey. Only one thing to do next! (face dragon)", "images/SquirrelGroup.jpg");
                storyPart++;
            } else if (userInput.includes('ignore it')) {
                updateStory("The bunny decides to continue alone. Only one thing to do next! (face dragon)", "images/CastleRoad.jpg");
                storyPart++;
            } else {
                invalidChoice();
            }
            break;
        case 5:
            if (userInput.includes('face dragon')) {
                if (inventory.includes('forest animals')) {
                    updateStory("With the power of friendship, Bobert and the squirrel family easily subdue the dragon. Victory! (restart)", "images/SquirreBeatDragon.jpg");
                } else if (inventory.includes('wooden weapon')) {
                    updateStory("The terrifying beast is scared off after looking at Bobert's sword. The forest is safe. Victory! (restart)", "images/ScaryDragon.jpg");
                } else {
                    updateStory("The bunny bravely faces the dragon but realizes it doesn't have any weapons or companions. The dragon is too strong. (restart)", "images/CuteDragon.jpg");
                }
            }
            break;
                case 6:
                    if (userInput.includes('restart')) {
                        storyPart = 0;
                        inventory = [];
                        startAdventure();
                    } else {
                        invalidChoice();
                    }
                

function updateStory(text, image) {
    document.getElementById('story-text').textContent = text;
    const imgElement = document.getElementById('story-image');
    imgElement.src = image;
    imgElement.style.display = 'block';
}

function invalidChoice() {
    updateStory("That is not an option! Make sure you type one of the two possibilities!", "");
}

function startAdventure() {
    storyPart = 1;
    updateStory("Bobert is back at it again! He's on a quest to slay a dragon! What will he do first? (find food/find weapon)", "images/BobertStart.jpg");
}

}

}
