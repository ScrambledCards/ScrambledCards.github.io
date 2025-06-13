// Function to display a move in a specific section
function displayMove(sectionId, move, difficulty) {
    const moveContainer = document.getElementById(sectionId + '-move');
    const favorites = getFavoriteMoves();
    const isFavorite = move && move.id && favorites.includes(String(move.id));
    const starChar = isFavorite ? '★' : '☆';

    if (!move) {
        if (sectionId === 'aerial' && difficulty === 'advanced') {
            moveContainer.innerHTML = `<span class="move-name-text">No advanced aerials right now.<br>Feel free to submit some on our <a href='https://discord.gg/R2FzpY6' target='_blank'>discord</a>!</span>`;
            document.getElementById(sectionId + '-video').innerHTML = '';
            return;
        }
        moveContainer.innerHTML = `<span class="move-name-text">No move found.</span>`;
        document.getElementById(sectionId + '-video').innerHTML = '';
        return;
    }

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

function getFilteredRandomMove(list, difficulty) {
    if (difficulty === 'all') return list[Math.floor(Math.random() * list.length)];
    const filtered = list.filter(move => move.move.toLowerCase().includes(difficulty));
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
}

function getNewMovesFiltered() {
    const difficulty = document.getElementById('difficultyFilter').value;
    displayMove('one-handed', getFilteredRandomMove(one_hand, difficulty), difficulty);
    displayMove('two-handed', getFilteredRandomMove(two_hand, difficulty), difficulty);
    displayMove('aerial', getFilteredRandomMove(aerial, difficulty), difficulty);
}