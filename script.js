//Ryan Hutchings
//Unit 15: Fruit Search Bar Project

//DOM Manupliations
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const suggestionsDiv = document.querySelector('.suggestions');

//All Fruits Array
const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

//searches in fruit array for the specific words the user typed
function search(str) {
	let results;

	//keep the whole list from appearing in atuocomplete menu 
	if (str !== '') {
		//searches for words that contain the letters from the input
		results = fruit.filter((info) => {
			return info.toLowerCase().includes(str.toLowerCase());
		});
	}
	//console.log(results);
	return results; //saved words get returned
}

//searches for fruit words based on what the users types
function searchHandler(e) {
	//console.log(e.key);
	//console.log(input);
	const searchResults = search(input.value);
	showSuggestions(searchResults, input.value);
}

//displays the results found onto the dropdown menu
function showSuggestions(results, inputVal) {
	//console.log(results);
	let fiveSugeestions = 5;
	suggestions.innerText = ''; //removes old results from html

	menuAppearance(results); //show the dropdown menu
	//for no results - prevents error from showing in the console
	if (results === undefined) {
		results = [];
	}

	for (let fruit of results) {
		let lowerInputVal = inputVal.toLowerCase();

		//highlight characters from input
		let htmlValue = ''; //saves the string with HTML elements for innerHTML
		let boldedChars = ''; //saves characters that need to be bolded

		//saves the nonbolded characters
		let vals1 = '';
		let vals2 = '';

		//displays only 5 suggestions
		if (fiveSugeestions > 0) {
			let inputLength = lowerInputVal.length; //counts number of bolded characters/words needed
			const indexInput = fruit.toLowerCase().indexOf(lowerInputVal); //index of where the bolded characters/words starts
			const charArr = [...fruit]; //separate each character from the word

			//separate the characters from the input
			charArr.forEach((val, idx, arr) => {
				//separate the characters from where the index starts
				if (idx >= indexInput) {
					if (inputLength > 0) {
						boldedChars += val; //added to bolded characters
						inputLength--; //subtract one until the end of characters in input
					} else {
						vals2 += val; //add other characters after the bolded characters
					}
				} else {
					vals1 += val; //add other characters before the bolded characters
				}
			});

			//combines the all characters (bolded and nonbolded) into one string for innerHTML
			//the 'if' statement saves the spaces between the words
			if (vals1.includes(' ') || vals2.includes(' ') || boldedChars.includes(' ')) {
				htmlValue += `<p class='dontHighlight'>${vals1}<b class='dontHighlight'>${boldedChars}</b>${vals2}</p>`;
			} else {
				htmlValue += `${vals1}<b class='dontHighlight'>${boldedChars}</b>${vals2}`;
			}
			//console.log(htmlValue);

			//create a new list item 
			const newLi = document.createElement('li');
			newLi.innerHTML = htmlValue; //adds the html string to the list item

			//adds the special events
			newLi.addEventListener('mouseover', highlightSuggestion); //highlights word in menu
			newLi.addEventListener('mouseout', unhighlightSuggestion); //unhighlights word in menu

			suggestions.appendChild(newLi);//add the list item onto the dropdown menu

			fiveSugeestions--;//subtract for each sugguestion added

			//for unit testing only
			// return newLi.innerHTML;
		}
	}
}

//makes menu box disappear oncreen when theres nothing in the search bar
function menuAppearance(fruitItems) {
	if (fruitItems === undefined || fruitItems.length === 0) {
		suggestionsDiv.classList.remove('dropdownAppearance');
	} else {
		suggestionsDiv.classList.add('dropdownAppearance');
	}
}

//selects what word the user picks and adds it to the search bar
function useSuggestion(e) {
	//console.log(e.target.innerText);
	input.value = e.target.innerText; //saves the chosen word to the search bar
	suggestions.innerText = ''; //emptys all words from the dropdown menu
	suggestionsDiv.classList.remove('dropdownAppearance'); //makes menu disappear
}

//highlights the word the mouse is on
function highlightSuggestion(e) {
	// console.log("Result:", e.target.innerText);
	// console.log("target", e.target);
	// console.log(e.target.classList.contains('dontHighlight'));

	//keeps from highlighting the <p> and <b> elements and messing with the list element's background
	if (e.target.tagName !== 'P' && e.target.tagName !== 'B') {
		e.target.style.backgroundColor = 'rgb(255, 155, 172)';
	} else {
		highlightListRecursive(e);
	}
}

//unhighlights the word once the mouse is off the word
function unhighlightSuggestion(e) {
	// console.log("Result2:", e.target.innerText);
	// console.log("target2", e.target);
	// console.log(e.target.classList.contains('dontHighlight'));
	if (!e.target.classList.contains('dontHighlight')) {
		e.target.style.backgroundColor = '';
	}
}

//prevents the bolded and paragraph elements from changing the list element's background
function highlightListRecursive(event) {
	//makes it where we work with the list element
	if (!event.target) {
		if (!event.classList.contains('dontHighlight')) {
			event.style.backgroundColor = 'rgb(255, 155, 172)';
		} else {
			event.parentElement.style.backgroundColor = 'rgb(255, 155, 172)';
		}
	}
	//gets to the list element from the event
	else {
		if (event.target.classList.contains('dontHighlight')) {
			event = event.target.parentElement;
			highlightListRecursive(event);
		} else {
			event.target.style.backgroundColor = 'rgb(255, 155, 172)';
		}
	}
}

//event listeners:
//detects when a key is pressed
input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);