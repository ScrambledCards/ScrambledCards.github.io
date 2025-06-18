function getAllMoves() {
    // Combine all moves from all categories
    return [...one_hand, ...two_hand, ...aerial].filter(m => m && m.move);
}
function displayCombo(combo) {
    const list = document.getElementById('combo-list');
    list.innerHTML = '';
    const maxPerRow = 4;
    const columns = Math.min(combo.length, maxPerRow);
    const rows = Math.ceil(combo.length / maxPerRow);
    list.style.display = 'grid';
    list.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    list.style.gap = '1em';
    list.style.justifyContent = 'center';
    list.style.paddingBottom = '1em';
    list.style.width = '100%';
    list.style.margin = '0';
    list.style.gridAutoRows = '4.5em'; // Hauteur fixe pour chaque ligne

    // Répartition spéciale pour 10 moves : centrer les 2 derniers
    let filled;
    if (combo.length === 10) {
        filled = Array(3 * maxPerRow).fill(null);
        for (let i = 0; i < 8; i++) filled[i] = combo[i];
        // Les deux derniers moves centrés sur la dernière ligne
        filled[8 + 1] = combo[8]; // colonne 2
        filled[8 + 2] = combo[9]; // colonne 3
    } else {
        filled = Array(rows * columns).fill(null);
        combo.forEach((move, i) => {
            filled[i] = move;
        });
    }
    filled.forEach((move, i) => {
        const li = document.createElement('li');
        li.className = 'combo-move';
        li.style.whiteSpace = 'normal';
        li.style.border = 'none';
        li.style.background = 'none';
        li.style.padding = '0 2%'; // padding en % pour responsivité
        li.style.height = '100%'; // Prend toute la hauteur de la cellule
        li.style.overflow = 'hidden';
        li.style.textOverflow = 'ellipsis';
        li.style.display = 'flex';
        li.style.flexDirection = 'column';
        li.style.justifyContent = 'center';
        li.style.alignItems = 'center';
        li.style.width = '100%'; // occupe toute la cellule de la grille
        li.style.overflowWrap = 'break-word';
        li.style.wordBreak = 'break-word';
        li.style.maxWidth = '100%';
        li.style.textAlign = 'center';
        li.title = move ? move.move : '';
        if (!move) {
            li.style.visibility = 'hidden';
            list.appendChild(li);
            return;
        }
        let isFavorite = false;
        if (typeof getFavoriteMoves === 'function') {
            const favs = getFavoriteMoves();
            isFavorite = favs && favs.includes(String(move.id));
        }
        const starChar = isFavorite ? '★' : '☆';
        const starTitle = isFavorite ? 'Remove from favorites' : 'Add to favorites';
        const starSpan = `<span style=\"cursor:pointer;color:gold;font-size:1.3em;vertical-align:middle;margin-top:0.2em;\" title=\"${starTitle}\" onclick=\"toggleFavorite(${move.id}, null, this)\">${starChar}</span>`;
        let moveLink = move.move;
        if (move.link) {
            moveLink = `<a href=\"https://www.youtube.com/watch?v=${move.link}\" target=\"_blank\">${move.move}</a>`;
        }
        li.innerHTML = `<span><strong>${i+1}.</strong> ${moveLink}</span>${starSpan}`;
        list.appendChild(li);
    });
}
function animateCombo(finalCombo) {
    const list = document.getElementById('combo-list');
    list.innerHTML = '';
    const maxPerRow = 4;
    const columns = Math.min(finalCombo.length, maxPerRow);
    const rows = Math.ceil(finalCombo.length / maxPerRow);
    list.style.display = 'grid';
    list.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    list.style.gap = '1em';
    list.style.justifyContent = 'center';
    list.style.paddingBottom = '1em';
    list.style.width = '100%';
    list.style.margin = '0';
    list.style.gridAutoRows = '4.5em';

    // Prépare les cases vides
    let filled;
    if (finalCombo.length === 10) {
        filled = Array(3 * maxPerRow).fill(null);
        for (let i = 0; i < 8; i++) filled[i] = finalCombo[i];
        filled[8 + 1] = finalCombo[8];
        filled[8 + 2] = finalCombo[9];
    } else {
        filled = Array(rows * columns).fill(null);
        finalCombo.forEach((move, i) => {
            filled[i] = move;
        });
    }
    // Crée les cases et lance l'animation
    const allMoves = getAllMoves();
    const liArray = [];
    filled.forEach((move, i) => {
        const li = document.createElement('li');
        li.className = 'combo-move';
        li.style.whiteSpace = 'normal';
        li.style.border = 'none';
        li.style.background = 'none';
        li.style.padding = '0 2%';
        li.style.display = 'flex';
        li.style.flexDirection = 'column';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'center';
        li.style.height = '100%';
        li.style.overflow = 'hidden';
        li.style.textOverflow = 'ellipsis';
        li.style.width = '100%';
        li.style.maxWidth = '100%';
        li.style.overflowWrap = 'break-word';
        li.style.wordBreak = 'break-word';
        li.style.textAlign = 'center';
        if (!move) {
            li.style.visibility = 'hidden';
            list.appendChild(li);
            liArray.push(null);
            return;
        }
        li.innerHTML = `<span style='opacity:0.7;'>...</span>`;
        list.appendChild(li);
        liArray.push(li);
    });
    // Animation slot machine
    let delay = 0;
    liArray.forEach((li, idx) => {
        if (!li) return;
        setTimeout(() => {
            let ticks = 0;
            const maxTicks = 15 + Math.floor(Math.random() * 10); // nombre de cycles
            const interval = setInterval(() => {
                const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
                li.innerHTML = `<span style='opacity:0.7;'>${randomMove.move}</span>`;
                ticks++;
                if (ticks >= maxTicks) {
                    clearInterval(interval);
                    // Affichage du move final avec étoile et lien
                    let move = filled[idx];
                    let isFavorite = false;
                    if (typeof getFavoriteMoves === 'function') {
                        const favs = getFavoriteMoves();
                        isFavorite = favs && favs.includes(String(move.id));
                    }
                    const starChar = isFavorite ? '★' : '☆';
                    const starTitle = isFavorite ? 'Remove from favorites' : 'Add to favorites';
                    const starSpan = `<span style=\"cursor:pointer;color:gold;font-size:1.3em;vertical-align:middle;margin-top:0.2em;\" title=\"${starTitle}\" onclick=\"toggleFavorite(${move.id}, null, this)\">${starChar}</span>`;
                    let moveLink = move.move;
                    if (move.link) {
                        moveLink = `<a href=\"https://www.youtube.com/watch?v=${move.link}\" target=\"_blank\">${move.move}</a>`;
                    }
                    li.innerHTML = `<span><strong>${idx+1}.</strong> ${moveLink}</span>${starSpan}`;
                }
            }, 40);
        }, delay);
        delay += 200; // chaque case s'arrête après la précédente
    });
}

// Remplace l'appel à displayCombo par animateCombo
function getRandomCombo(length) {
    const allMoves = getAllMoves();
    const combo = [];
    const usedIndexes = new Set();
    while (combo.length < length && usedIndexes.size < allMoves.length) {
        const idx = Math.floor(Math.random() * allMoves.length);
        if (!usedIndexes.has(idx)) {
            combo.push(allMoves[idx]);
            usedIndexes.add(idx);
        }
    }
    return combo;
}
document.getElementById('generate-combo').onclick = function() {
    const length = Math.max(2, Math.min(10, parseInt(document.getElementById('combo-length').value) || 3));
    const combo = getRandomCombo(length);
    animateCombo(combo);
};
// Génère un combo au chargement
if (document.getElementById('generate-combo')) {
    document.getElementById('generate-combo').click();
}
// Ajout d'une version compatible de toggleFavorite pour ce contexte
if (typeof toggleFavorite !== 'function') {
    function toggleFavorite(moveId, starId, el) {
        let favs = [];
        try {
            favs = JSON.parse(localStorage.getItem('favoriteMoves')) || [];
        } catch {}
        moveId = String(moveId);
        const idx = favs.indexOf(moveId);
        if (idx === -1) {
            favs.push(moveId);
            if (el) el.textContent = '★';
        } else {
            favs.splice(idx, 1);
            if (el) el.textContent = '☆';
        }
        localStorage.setItem('favoriteMoves', JSON.stringify(favs));
    }
    function getFavoriteMoves() {
        try {
            return JSON.parse(localStorage.getItem('favoriteMoves')) || [];
        } catch {
            return [];
        }
    }
}
