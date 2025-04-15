// This function will be called to render the favorites on the favorites page. (pretty similar to showCards in scripts.js)
function showFavorites() {
    // Ensure the container for favorite cards is empty
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
  
    // Loop through the favorite trails
    for (let i = 0; i < favoriteTrailNames.length; i++) {
      const nextCard = templateCard.cloneNode(true); // Clone the template card
      editCardContent(nextCard, i); // Edit content with favorite trail data
      cardContainer.appendChild(nextCard); // Add the card to the container
    }
  
    // Show how many favorite cards are loaded
    const showResultsDiv = document.getElementById("results");
    showResultsDiv.textContent = 'Show Favorites: ' + favoriteTrailNames.length;
}

// Adjust the editCardContent function to work with favorite trails data
function editCardContent(card, index) {
    card.style.display = "block";
  
    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = favoriteTrailNames[index];
  
    const cardImage = card.querySelector("img");
    cardImage.alt = favoriteTrailNames[index] + " Poster";  // You can customize the image URL
  
    const bulletList = card.querySelector("ul");
    bulletList.innerHTML = ""; // clear any existing bullets
  
    const bulletPoints = [
      `Trail Type: ${favoriteTrailTypes[index]}`,
      `Distance: ${favoriteDistance[index]}`,
      `High Point: ${favoriteHighPoint[index]}`,
      `Elevation Gain: ${favoriteEvelationGain[index]}`,
      `Difficulty: ${favoriteDifficulty[index]}`,
      `Seasons: ${favoriteSeasons[index]}`,
      `Family Friendly: ${favoriteFamilyFriendly[index]}`,
      `Backpackable: ${favoriteBackpackable[index]}`,
      `Crowded: ${favoriteCrowded[index]}`
    ];
  
    for (let text of bulletPoints) {
      const li = document.createElement("li");
      li.textContent = text;
      bulletList.appendChild(li);
    }
  
    // Add an 'unfavorite' button to the card
    const favoriteIcon = card.querySelector('.favorite-icon');
    favoriteIcon.src = 'data/favorite-button-lit.png';  // This will show as lit for all favorites

    // Add an event listener to remove the card from favorites
    const unfavoriteButton = card.querySelector('.favorite-button'); // Assuming there is an unfavorite button
    unfavoriteButton.addEventListener('click', () => {
        removeFavorite(index);
    });
}

// Function to remove a favorite trail from the list and localStorage
function removeFavorite(index) {
    // Remove the trail data from the arrays
    favoriteTrailNames.splice(index, 1);
    favoriteTrailTypes.splice(index, 1);
    favoriteDistance.splice(index, 1);
    favoriteHighPoint.splice(index, 1);
    favoriteEvelationGain.splice(index, 1);
    favoriteDifficulty.splice(index, 1);
    favoriteSeasons.splice(index, 1);
    favoriteFamilyFriendly.splice(index, 1);
    favoriteBackpackable.splice(index, 1);
    favoriteCrowded.splice(index, 1);

    // Update the localStorage with the new arrays
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

    // Re-render the favorites page after removal
    showFavorites();
}

// Call this function when the favorites page loads
window.onload = () => {
    try {
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

    // Render the favorite cards on the page
    showFavorites();
};


// Helper function to determine distance category (same as before)
function getDistanceCategory(value) {
    const miles = parseFloat(value);
    if (isNaN(miles)) return "";
    if (miles <= 5) return "Short";
    if (miles <= 9) return "Medium";
    return "Long";
  }
  
  function getBackpackableValue(backpack, crowded, family) {
    //console.log("crowded values: " + favoriteCrowded)
    let vals = [];
    if (backpack === 'Yes') vals.push("Yes");
    if (backpack === 'No') vals.push("No");
    if (crowded === 'Yes') vals.push("YesCrowded");
    if (crowded === 'No') vals.push("NoCrowded");
    
    if (family === 'Yes') vals.push("YesFamilyFriendly");
    if (family === 'No') vals.push("NoFamilyFriendly");
    console.log("crowded values (actuall val): " + vals)
    return vals;
  }
  
  // Apply filters to the favorites
  function applyFavoritesFilters() {
    const distanceFilter = document.getElementById("distanceFilter").value;
    const difficultyFilter = document.getElementById("difficultyFilter").value;
    const backpackableFilter = document.getElementById("backpackableFilter").value;
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
  
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // Clear current cards
    const templateCard = document.querySelector(".card");
  
    let resultsCount = 0;
    let matches = [];
  
    for (let i = 0; i < favoriteTrailNames.length; i++) {
      const distanceCategory = getDistanceCategory(favoriteDistance[i]);
      const backpackableVals = getBackpackableValue(favoriteBackpackable[i], favoriteCrowded[i], favoriteFamilyFriendly[i]);
  
      const matchesDistance = !distanceFilter || distanceFilter === distanceCategory;
      const matchesDifficulty = !difficultyFilter || difficultyFilter === favoriteDifficulty[i];
      const matchesBackpack = !backpackableFilter || backpackableVals.includes(backpackableFilter);
      const matchesSearch = favoriteTrailNames[i].toLowerCase().includes(searchInput);
  
      if (matchesDistance && matchesDifficulty && matchesBackpack && matchesSearch) {
        matches.push(i);
      }
    }
  
    // If all filters are default and search is empty, only show first 15 cards
    const allFiltersDefault = !distanceFilter && !difficultyFilter && !backpackableFilter && !searchInput;
    const maxToShow = allFiltersDefault ? 15 : matches.length;
  
    for (let i = 0; i < Math.min(matches.length, maxToShow); i++) {
      const nextCard = templateCard.cloneNode(true);
      editCardContent(nextCard, matches[i]); // This will be your existing editCardContent function
      cardContainer.appendChild(nextCard);
      resultsCount++;
    }
  
    const showResultsDiv = document.getElementById("results");
    showResultsDiv.textContent = 'Showing Results: 1 - ' + resultsCount + ' of ' + favoriteTrailNames.length;
  
    // Toggle "Show More" button
    const showMoreBtn = document.getElementById("show-more-button");
    if (showMoreBtn) {
      showMoreBtn.style.display = allFiltersDefault ? "block" : "none";
    }
  }
  
  // Attach change listeners to filters
  window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("distanceFilter").addEventListener("change", applyFavoritesFilters);
    document.getElementById("difficultyFilter").addEventListener("change", applyFavoritesFilters);
    document.getElementById("backpackableFilter").addEventListener("change", applyFavoritesFilters);
    document.getElementById("searchInput").addEventListener("input", applyFavoritesFilters);
  });
  
  // Search bar filtering for the favorites page (real-time)
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) {
      console.error("Search input not found!");
      return;
    }
  
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
  
      if (query === "") {
        showFavorites(); // reload default favorites
        return;
      }
  
      // Filter through the favoriteTrailNames array instead of the displayed cards
      const filteredIndexes = favoriteTrailNames
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