// Function to display a move in a specific section
function displayMove(sectionId, move) {
    document.getElementById(sectionId + '-move').innerText = move.move;

    const videoContainer = document.getElementById(sectionId + '-video');
    videoContainer.innerHTML = ''; // Clear previous video if any
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