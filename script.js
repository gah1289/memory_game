const gameContainer = document.getElementById('game');

const COLORS = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple'
];

let flippedCards = 0;
let firstCard, secondCard;
let hasFlippedCard = false;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
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
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// if (hasFlippedCard) return;
	if (event.target.classList.contains('flipped')) return;
	// you can use event.target to see which element was clicked
	let currentCard = event.target;
	let color = currentCard.className;
	currentCard.style.backgroundColor = color;
	// Clicking a card should change the background color to be the color of the class it has.
	currentCard.classList.add('flipped');
	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;
	hasFlippedCard = false;
	checkForMatch();
}

function checkForMatch() {
	if (firstCard.className === secondCard.className) {
		disableCards();
		if (flippedCards === COLORS.length) {
			alert('Game Over!');
		}
	}
	else {
		unflipCards();
	}
}

function disableCards() {
	flippedCards += 2;
	firstCard.removeEventListener('click', handleCardClick);
	secondCard.removeEventListener('click', handleCardClick);
	firstCard = null;
	secondCard = null;
}

function unflipCards() {
	setTimeout(function() {
		firstCard.style.backgroundColor = '';
		secondCard.style.backgroundColor = '';
		firstCard.classList.remove('flipped');
		secondCard.classList.remove('flipped');
		firstCard = null;
		secondCard - null;
		hasFlippedCard = false;
	}, 1000);
}

// when the DOM loads
createDivsForColors(shuffledColors);

// Notes for Joseph/TA: When I click the divs too fast, the code does not work as it should. I.e. when I click 3 divs within 1 second, the first div stays "flipped over". Can you tell me why this happens?
