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


// creating array's to seperate data
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


let favoriteTrailNames = [];
let favoriteTrailTypes = [];
let favoriteDistance = [];
let favoriteHighPoint = [];
let favoriteEvelationGain = [];
let favoriteSeasons = [];
let favoriteDifficulty = [];
let favoriteFamilyFriendly = [];
let favoriteBackpackable = [];
let favoriteCrowded = [];


// attempts to read any favorite trails that have been stored in localStorage
window.onload = () => {
  try {
    // Try to restore favorites from localStorage
     favoriteTrailNames = JSON.parse(localStorage.getItem("favoriteTrailNames")) || [];
     favoriteTrailTypes = JSON.parse(localStorage.getItem("favoriteTrailTypes")) || [];
     favoriteDistance = JSON.parse(localStorage.getItem("favoriteDistance")) || [];
     favoriteHighPoint = JSON.parse(localStorage.getItem("favoriteHighPoint")) || [];
     favoriteEvelationGain = JSON.parse(localStorage.getItem("favoriteEvelationGain")) || [];
     favoriteDifficulty = JSON.parse(localStorage.getItem("favoriteDifficulty")) || [];
     favoriteSeasons = JSON.parse(localStorage.getItem("favoriteSeasons")) || [];
     favoriteFamilyFriendly = JSON.parse(localStorage.getItem("favoriteFamilyFriendly")) || [];
     favoriteBackpackable = JSON.parse(localStorage.getItem("favoriteBackpackable")) || [];
     favoriteCrowded = JSON.parse(localStorage.getItem("favoriteCrowded")) || [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
};

// for infinite scrolling
let cardsPerLoad = 15;
let currentCardIndex = 0;




// loading and parsing csv files (used external Dataset from csv file)
// Loaded from data/hikingTrails_TheGorge.csv
fetch('data/HikingTrails_TheGorge.csv')
.then(response => response.text())
.then(hikingText => {
    const cleanedCSV = hikingText.replace(/(\d),(\d)/g, '$1$2'); // this fixes the inconsitant number format in the dataset (1,600 -> 1600)
    const lines = cleanedCSV.trim().split('\n');

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
    for (let i = 0; i < Crowded.length; i++){
      if(Crowded[i] == "Yes\r"){
        Crowded[i] = "Yes";
      } else if(Crowded[i] == "No\r"){
        Crowded[i] = "No";
      }
      if(highPoint[i] == "" || highPoint == " "){
        highPoint[i] = "0 feet";
      }
    }
})
.then(showCards)




// Displaying Cards System

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  const endIndex = Math.min(currentCardIndex + cardsPerLoad, trailNames.length);
  for (let i = 0; i < endIndex; i++) {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, i); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }

  currentCardIndex = endIndex;
  
  // show results on the bottom of page
  const showResultsDiv = document.getElementById("results");
  showResultsDiv.textContent = 'Show Results: ' + ((currentCardIndex - endIndex) + 1) + ' - ' + currentCardIndex + ' of ' + trailNames.length;
  
}


function editCardContent(card, index) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = trailNames[index];


  const bulletList = card.querySelector("ul");
  bulletList.innerHTML = ""; // clear any existing bullets


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


  // favoriting cards System below
  const favoriteButton = card.querySelector('.favorite-button');
  const favoriteIcon = card.querySelector('.favorite-icon');

  
  let storedFavorites = JSON.parse(localStorage.getItem("favoriteTrailNames")) || [];
  let islit = storedFavorites.includes(trailNames[index]) ? 1 : 0;
  favoriteIcon.src = islit === 1 ? 'data/favorite-button-lit.png' : 'data/favorite-button-unlit.png';

  favoriteButton.addEventListener('click', () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favoriteTrailNames")) || [];


    if (!favoriteTrailNames.includes(trailNames[index])) {
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
      favoriteIcon.src = 'data/favorite-button-lit.png';
      
      storedFavorites.push(trailNames[index]);
      localStorage.setItem("favoriteTrailNames", JSON.stringify(favoriteTrailNames));
      localStorage.setItem("favoriteTrailTypes", JSON.stringify(favoriteTrailTypes));
      localStorage.setItem("favoriteDistance", JSON.stringify(favoriteDistance));
      localStorage.setItem("favoriteHighPoint", JSON.stringify(favoriteHighPoint));
      localStorage.setItem("favoriteEvelationGain", JSON.stringify(favoriteEvelationGain));
      localStorage.setItem("favoriteDifficulty", JSON.stringify(favoriteDifficulty));
      localStorage.setItem("favoriteSeasons", JSON.stringify(favoriteSeasons));
      localStorage.setItem("favoriteFamilyFriendly", JSON.stringify(favoriteFamilyFriendly));
      localStorage.setItem("favoriteBackpackable", JSON.stringify(favoriteBackpackable));
      localStorage.setItem("favoriteCrowded", JSON.stringify(favoriteCrowded));
    
      // When removing a favorite card, this code runs
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
      favoriteIcon.src = 'data/favorite-button-unlit.png';

      storedFavorites = storedFavorites.filter(name => name !== trailNames[index]);
      localStorage.setItem("favoriteTrailNames", JSON.stringify(favoriteTrailNames));
      localStorage.setItem("favoriteTrailTypes", JSON.stringify(favoriteTrailTypes));
      localStorage.setItem("favoriteDistance", JSON.stringify(favoriteDistance));
      localStorage.setItem("favoriteHighPoint", JSON.stringify(favoriteHighPoint));
      localStorage.setItem("favoriteEvelationGain", JSON.stringify(favoriteEvelationGain));
      localStorage.setItem("favoriteDifficulty", JSON.stringify(favoriteDifficulty));
      localStorage.setItem("favoriteSeasons", JSON.stringify(favoriteSeasons));
      localStorage.setItem("favoriteFamilyFriendly", JSON.stringify(favoriteFamilyFriendly));
      localStorage.setItem("favoriteBackpackable", JSON.stringify(favoriteBackpackable));
      localStorage.setItem("favoriteCrowded", JSON.stringify(favoriteCrowded));
    }
  });
}



 // checks two different arrays if they have the same element and then returns the index of that element 
  // (assumes that we know where array2 duplicate element is and not array1)
  function indexFinder(array,array2, index){
    for(let i = 0; i < array.length; i++){
      if(array[i] == array2[index]){
        return i;
      }
    }
}




// SEARCHBAR in real-time System below 
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






// filtering system

// Helper function to determine distance category
function getDistanceCategory(value) {
  const miles = parseFloat(value);
  if (isNaN(miles)) return "";
  if (miles <= 5) return "Short";
  if (miles <= 9) return "Medium";
  return "Long";
}

function getBackpackableValue(backpack, crowded, family) {
  let vals = [];
  if (backpack === 'Yes') vals.push("Yes");
  if (backpack === 'No') vals.push("No");
  if (crowded === 'Yes') vals.push("YesCrowded");
  if (crowded === 'No') vals.push("NoCrowded");
  if (family === 'Yes') vals.push("YesFamilyFriendly");
  if (family === 'No') vals.push("NoFamilyFriendly");
  return vals;
}

function applyFilters() {
  const distanceFilter = document.getElementById("distanceFilter").value;
  const difficultyFilter = document.getElementById("difficultyFilter").value;
  const backpackableFilter = document.getElementById("backpackableFilter").value;
  const searchInput = document.getElementById("searchInput").value.toLowerCase();

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  let resultsCount = 0;
  let matches = [];

  for (let i = 0; i < trailNames.length; i++) {
    const distanceCategory = getDistanceCategory(distance[i]);
    const backpackableVals = getBackpackableValue(Backpackable[i], Crowded[i], familyFriendly[i]);

    const matchesDistance = !distanceFilter || distanceFilter === distanceCategory;
    const matchesDifficulty = !difficultyFilter || difficultyFilter === difficulty[i];
    const matchesBackpack = !backpackableFilter || backpackableVals.includes(backpackableFilter);
    const matchesSearch = trailNames[i].toLowerCase().includes(searchInput);

    if (matchesDistance && matchesDifficulty && matchesBackpack && matchesSearch) {
      matches.push(i);
    }
  }

  // If all filters are default and search is empty, only show first 15 cards
  const allFiltersDefault = !distanceFilter && !difficultyFilter && !backpackableFilter && !searchInput;
  const maxToShow = allFiltersDefault ? 15 : matches.length;

  for (let i = 0; i < Math.min(matches.length, maxToShow); i++) {
    const nextCard = templateCard.cloneNode(true);
    editCardContent(nextCard, matches[i]);
    cardContainer.appendChild(nextCard);
    resultsCount++;
  }

  const showResultsDiv = document.getElementById("results");
  showResultsDiv.textContent = 'Showing Results: 1 - ' + resultsCount + ' of ' + trailNames.length;

  // Toggle "Show More" button when filtering
  const showMoreBtn = document.getElementById("show-more-button");
  if (showMoreBtn) {
    showMoreBtn.style.display = allFiltersDefault ? "block" : "none";
  }
}

// Attach change listeners to filters
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("distanceFilter").addEventListener("change", applyFilters);
  document.getElementById("difficultyFilter").addEventListener("change", applyFilters);
  document.getElementById("backpackableFilter").addEventListener("change", applyFilters);
  document.getElementById("searchInput").addEventListener("input", applyFilters);
});