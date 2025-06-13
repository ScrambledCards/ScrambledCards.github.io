const favoritesKey = 'favoriteMoves';

// Function to add a move to favorites
function addToFavorites(moveId) {
    let favorites = JSON.parse(localStorage.getItem(favoritesKey)) ?? [];
    moveId = String(moveId);
    if (!favorites.includes(moveId)) {
        favorites.push(moveId);
        localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }
}

// Function to remove a move from favorites
function removeFromFavorites(moveId) {
    let favorites = JSON.parse(localStorage.getItem(favoritesKey)) ?? [];
    moveId = String(moveId);
    favorites = favorites.filter(id => id != moveId);
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}

// Function to get favorite moves
function getFavoriteMoves() {
    return (JSON.parse(localStorage.getItem(favoritesKey)) ?? []).map(String);
}

// Function to display favorite moves on the favorites page
function displayFavoriteMoves() {
    const favoriteMoves = getFavoriteMoves();
    const favoritesContainer = document.getElementById('favorites-list');
    favoritesContainer.innerHTML = ''; // Clear previous list

    favoriteMoves.forEach(moveId => {
        const move = one_hand.find(m => String(m.id) == moveId) ?? two_hand.find(m => String(m.id) == moveId) ?? aerial.find(m => String(m.id) == moveId);
        if (move) {
            const listItem = document.createElement('li');
            listItem.style.margin = "10px";
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";

            const link = document.createElement('a');
            link.href = `https://www.youtube.com/watch?v=${move.link}`;
            link.textContent = move.move;
            link.target = "_blank";

            // Create the cross button
            const removeBtn = document.createElement('span');
            removeBtn.textContent = '✖';
            removeBtn.title = "Remove from favorites";
            removeBtn.style.cursor = "pointer";
            removeBtn.style.color = "crimson";
            removeBtn.style.fontSize = "1.2em";
            removeBtn.onclick = function() {
                removeFromFavorites(moveId);
                displayFavoriteMoves(); // Refresh the list
            };

            listItem.appendChild(link);
            listItem.appendChild(removeBtn);
            favoritesContainer.appendChild(listItem);
        }
    });
}
function toggleFavorite(moveId, starElementId) {
    let favorites = getFavoriteMoves();
    moveId = String(moveId);
    const index = favorites.indexOf(moveId);
    if (index === -1) {
        addToFavorites(moveId);
        document.getElementById(starElementId).textContent = '★';
    } else {
        removeFromFavorites(moveId);
        document.getElementById(starElementId).textContent = '☆';
    }
}
// Call displayFavoriteMoves when the document is ready
document.addEventListener("DOMContentLoaded", displayFavoriteMoves);