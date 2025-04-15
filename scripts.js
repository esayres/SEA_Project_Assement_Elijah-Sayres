/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

// current bugs:
// search results numbers dont update when using searchbar
// after favoriting a trail, then using search bar (doesnt remember what trail was favorited [THIS IS ONLY THE LIT ICON NOT THE ARRAY])


/*
WHAT NEEDS TO BE DONE:
deigin a basic page for (about, favorites, and contact) order of importance (favorites, about, contact)

make sure filters work and search bar bugs are fixed
clean up js code and make i know whats actually happening
make pages look even better later on


WHAT NEEDS TO BE DONE FIRST ARE
filters working correctly, and favorites page displaying the data correctly (TOP PROCITY)



MIGHT WANT TO WRITE SOME BASIC CODE TO HARD INPUT DATASET INTO JAVASCRIPT sO IF THEY DONT OPEN WEBSITE FROM A LIVE SERVER, IT WILL STILL RUN PERFECTLY WITH MANUAL SET ARRAY'S
I THINK A BASIC IF, ELSE WOULD WORK FOR THIS
depending on how many lines this takes, it might be better to have this run from a seperate js file and just send data here after words

*/


const trailNames = [];
const trailTypes = [];
const distance = [];
const highPoint = [];
const evelationGain = [];
const seasons = [];
const difficulty = [];
const familyFriendly = [];
const Backpackable = [];
const Crowded = [];


const favoriteTrailNames = [];
const favoriteTrailTypes = [];
const favoriteDistance = [];
const favoriteHighPoint = [];
const favoriteEvelationGain = [];
const favoriteSeasons = [];
const favoriteDifficulty = [];
const favoriteFamilyFriendly = [];
const favoriteBackpackable = [];
const favoriteCrowded = [];

// for infinite scrolling
let cardsPerLoad = 15;
let currentCardIndex = 0;
let isLoading = false;



// loading and parsing csv files (used Datasets)
fetch('data/HikingTrails_TheGorge.csv')
.then(response => response.text())
.then(hikingText => {
    const cleanedCSV = hikingText.replace(/(\d),(\d)/g, '$1$2'); // this fixes the inconsitant number format in the dataset (1,600 -> 1600)
    const lines = cleanedCSV.trim().split('\n');
    const headers = lines[0].split(','); // this is never used

    // goes through the entire database 
    for(let i = 1; i < lines.length; i++){
        // split line
        let individualHikeLine = lines[i].split(',');
        // append into array
        trailNames.push(individualHikeLine[0]);
        trailTypes.push(individualHikeLine[1]);
        distance.push(individualHikeLine[2]);
        highPoint.push(individualHikeLine[3]);
        evelationGain.push(individualHikeLine[4]);
        difficulty.push(individualHikeLine[5]);
        seasons.push(individualHikeLine[6]);
        familyFriendly.push(individualHikeLine[7]);
        Backpackable.push(individualHikeLine[8]);
        Crowded.push(individualHikeLine[9]);
        // move next line
    }
    //console.log("data", difficulty); // TESTER to see if arrays are working
})
.then(showCards)

// highpoint has empty entrys so make sure they are converted into zero for page



// basic js for search bar that probly doesnt work
/*const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('#cardContainer .card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  });
});

*/


// SEARCH BAR (real-time)



// ['Trail Name', 'Trail Type', 'Distance', 
//'High Point', 'Elevation Gain', 'Difficulty',
// 'Seasons', 'Family Friendly', 'Backpackable', 'Crowded\r']
const FRESH_PRINCE_URL =
  "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
const CURB_POSTER_URL =
  "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
const EAST_LOS_HIGH_POSTER_URL =
  "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
let titles = [
  "Fresh Prince of Bel Air",
  "Curb Your Enthusiasm",
  "East Los High",
  "Tester",
];

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.


//infinite scrolling

/*
let cardsPerLoad = 15;
let currentCardIndex = 0;
let isLoading = false;


function showCards() {
  const cardContainer = document.getElementById("card-container");
  const templateCard = document.querySelector(".card");

  const endIndex = Math.min(currentCardIndex + cardsPerLoad, trailNames.length);

  for (let i = currentCardIndex; i < endIndex; i++) {
    const nextCard = templateCard.cloneNode(true);
    editCardContent(nextCard, i);
    cardContainer.appendChild(nextCard);
  }

  currentCardIndex = endIndex;
  isLoading = false;
}

window.addEventListener('scroll', () => {
  if (isLoading) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 100;

  if (scrollPosition >= threshold && currentCardIndex < trailNames.length) {
    isLoading = true;
    setTimeout(showCards, 300); // delay for smoother feel
  }
});



.then(() => {
  showCards(); // load first 15 cards
});
*/


// farvoriting the cards (useless)
function favoriteCards(){
  document.getElementsByClassName('favorite-icon').src='data/favorite-button-lit.png'
}



// This function adds cards the page to display the data in the array
function showCards() {
  //console.log("WORKING!")
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  const endIndex = Math.min(currentCardIndex + cardsPerLoad, trailNames.length);
  console.log
  for (let i = 0; i < endIndex; i++) {
    let title = trailNames[i];
    //console.log("name of card: ", title);

    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, i); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
  currentCardIndex = endIndex;
  isLoading = false;
  
  // show results on the bottom of page
  const showResultsDiv = document.getElementById("results");
  showResultsDiv.textContent = 'Show Results: ' + ((currentCardIndex - endIndex) + 1) + ' - ' + currentCardIndex + ' of ' + trailNames.length;
  
}

function editCardContent(card, index) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = trailNames[index];

  const cardImage = card.querySelector("img");
  cardImage.alt = trailNames[index] + " Poster";

  const bulletList = card.querySelector("ul");
  bulletList.innerHTML = ""; // clear any existing bullets

  //let islit = 0;

  const bulletPoints = [
    `Trail Type: ${trailTypes[index]}`,
    `Distance: ${distance[index]}`,
    `High Point: ${highPoint[index]}`,
    `Elevation Gain: ${evelationGain[index]}`,
    `Difficulty: ${difficulty[index]}`,
    `Seasons: ${seasons[index]}`,
    `Family Friendly: ${familyFriendly[index]}`,
    `Backpackable: ${Backpackable[index]}`,
    `Crowded: ${Crowded[index]}`
  ];

  for (let text of bulletPoints) {
    const li = document.createElement("li");
    li.textContent = text;
    bulletList.appendChild(li);
  }


  // for favoriting
  const favoriteButton = card.querySelector('.favorite-button');
  const favoriteIcon = card.querySelector('.favorite-icon');

  
  let storedFavorites = JSON.parse(localStorage.getItem("favoriteTrailNames")) || [];

  let islit = storedFavorites.includes(trailNames[index]) ? 1 : 0;
  favoriteIcon.src = islit === 1 ? 'data/favorite-button-lit.png' : 'data/favorite-button-unlit.png';

  favoriteButton.addEventListener('click', () => {
    if(islit == 0){
      favoriteTrailNames.push(trailNames[index]);
      favoriteTrailTypes.push(trailTypes[index]);
      favoriteDistance.push(distance[index]);
      favoriteHighPoint.push(highPoint[index]);
      favoriteEvelationGain.push(evelationGain[index]);
      favoriteDifficulty.push(difficulty[index]);
      favoriteSeasons.push(seasons[index]);
      favoriteFamilyFriendly.push(familyFriendly[index]);
      favoriteBackpackable.push(Backpackable[index]);
      favoriteCrowded.push(Crowded[index]);
      islit = 1
      console.log("FAVORITE TRAILS (WITH ITEM LIT)", favoriteTrailNames)
      favoriteIcon.src = 'data/favorite-button-lit.png';

      
      storedFavorites.push(trailNames[index]);
      localStorage.setItem("favoriteTrailNames", JSON.stringify(storedFavorites));
      // add code that takes this into favorites page/list
    } else if(islit == 1){

      let removeIndex = indexFinder(favoriteTrailNames, trailNames, index);

      favoriteTrailNames.splice(removeIndex, 1);
      favoriteTrailTypes.splice(removeIndex, 1);
      favoriteDistance.splice(removeIndex, 1);
      favoriteHighPoint.splice(removeIndex, 1);
      favoriteEvelationGain.splice(removeIndex, 1);
      favoriteDifficulty.splice(removeIndex, 1);
      favoriteSeasons.splice(removeIndex, 1);
      favoriteFamilyFriendly.splice(removeIndex, 1);
      favoriteBackpackable.splice(removeIndex, 1);
      favoriteCrowded.splice(removeIndex, 1);
      islit = 0
      console.log("FAVORITE TRAILS (UNLIT REMOVED ITEM)", favoriteTrailNames)
      favoriteIcon.src = 'data/favorite-button-unlit.png';


      storedFavorites = storedFavorites.filter(name => name !== trailNames[index]);
      localStorage.setItem("favoriteTrailNames", JSON.stringify(storedFavorites));
      // add code that removes this from favorites page/list
    }

    

  });

  // checks two different arrays if they have the same element and then returns the index of that element 
  // (assumes that we know where array2 duplicate element is and not array1)
  function indexFinder(array,array2, index){
      for(let i = 0; i < array.length; i++){
        if(array[i] == array2[index]){
          return i;
        }
      }
  }

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  //console.log("new card:", index, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
//document.addEventListener("DOMContentLoaded", showCards);


// SEARCH BAR (real-time)
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) {
    console.error("Search input not found!");
    return;
  }

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    if (query === "") {
      currentCardIndex = 0;
      showCards(); // reload default cards
      return;
    }

    // Filter through the trailNames array instead of the displayed cards
    const filteredIndexes = trailNames
      .map((name, index) => ({ name: name.toLowerCase(), index }))
      .filter((obj) => obj.name.includes(query))
      .map((obj) => obj.index);

    // Replace current cards with filtered ones
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // Clear current cards

    filteredIndexes.forEach((i) => {
      const nextCard = document.querySelector(".card").cloneNode(true);
      editCardContent(nextCard, i);
      cardContainer.appendChild(nextCard);
    });
  });
});



function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  trailNames.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}

/*window.addEventListener('scroll', () => {
  if (isLoading) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 100;

  if (scrollPosition >= threshold && currentCardIndex < trailNames.length) {
    isLoading = true;
    setTimeout(showCards, 300); // delay for smoother feel
  }
});
*/