const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

var firstCard = null;        // tracks the first card clicked
var secondCard = null;       // tracks the second card clicked
var noClick = false;         // flag for if the user is allowed to click another card

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");   // card class, found it easier to group up the front and back this way

    // front and back
    const frontDiv = document.createElement("div"); 
    frontDiv.classList.add("front");

    const backDiv = document.createElement("div");
    backDiv.classList.add("back");
    backDiv.classList.add(color); //color will matter for the back, color doesn't matter for front
    backDiv.style.backgroundColor = color;  // set the background color for the back

    // append backDiv and frontDiv as children to newDiv
    newDiv.appendChild(frontDiv);
    newDiv.appendChild(backDiv);
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);


    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClick) return;

  const clickedCard = event.target.parentElement;  // ensuring we were targeting the whole card, just having event.target caused problems
  if (clickedCard === firstCard) return; // can't click the same card twice check

  clickedCard.classList.add("flipped"); // flipped class allows the css to start the flipping animations

  if (!firstCard) { // if first card is null, the clicked card is the firstcard
    firstCard = clickedCard;
  } else if (!secondCard) { // already a first card, no second card, second card should be the clicked card
    secondCard = clickedCard;
    noClick = true; // both card slots are filled up, user shouldn't be able to click

    const firstColor = firstCard.querySelector(".back").style.backgroundColor; // variable for the first color from the first card
    const secondColor = secondCard.querySelector(".back").style.backgroundColor; //variable for the second color from second card

    if (firstColor === secondColor) {
      firstCard = null; // reset first and second card slots
      secondCard = null;
      noClick = false; //user can click again
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped"); // turn both cards over
        secondCard.classList.remove("flipped");
        firstCard = null;
        secondCard = null; 
        noClick = false; 
      }, 1000); // ensures user can see the colors for a second before flipping back
    }
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
