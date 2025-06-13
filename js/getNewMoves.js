// Function to display a move in a specific section
function displayMove(sectionId, move) {
    const moveContainer = document.getElementById(sectionId + '-move');
    const favorites = getFavoriteMoves();
    const isFavorite = favorites.includes(String(move.id));
    const starChar = isFavorite ? '★' : '☆';

    moveContainer.innerHTML = `
        <span class="move-name-text">${move.move}</span>
        <div class="fav-btn-row">
            <span 
                id="${sectionId}-star"
                style="cursor:pointer;color:gold;font-size:1.5em;" 
                title="Add to favorites"
                onclick="toggleFavorite(${move.id}, '${sectionId}-star')"
            >${starChar}</span>
        </div>
    `;

    const videoContainer = document.getElementById(sectionId + '-video');
    videoContainer.innerHTML = '';
    if (move.link) {
        const iframe = document.createElement('iframe');
        iframe.width = '360';
        iframe.height = '180';
        iframe.src = `https://www.youtube.com/embed/${move.link}`;
        iframe.style.border = '0';
        iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
    }
}

// Function to get and display new random moves
function getNewMoves() {
    displayMove('one-handed', randomOhMove());
    displayMove('two-handed', randomThMove());
    displayMove('aerial', randomAerial());
}

// Initial load of moves on page load
getNewMoves();