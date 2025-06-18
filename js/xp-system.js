// js/xp-system.js
// Affiche une barre d'XP simple et sticky en bas de page, collée au footer
(function() {
    // --- Config ---
    const BASE_XP = 100;
    const XP_GROWTH = 1.15;
    const NB_LEVELS = 52;
    const STORAGE_KEY = 'xpSystemSimple';
    const STORAGE_QUESTS_DONE_DATE = 'questsDoneDate'; // Clé pour la date des quêtes faites
    // --- State ---
    let state = {
        totalXP: 0,
        level: 0,
        streak: 0, // Ajout du streak
    };
    // --- Utils ---
    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    function loadState() {
        const s = localStorage.getItem(STORAGE_KEY);
        if (s) {
            try { state = { ...state, ...JSON.parse(s) }; } catch {}
        }
    }
    function xpForLevel(idx) {
        return Math.round(BASE_XP * Math.pow(XP_GROWTH, idx));
    }
    function totalXpForLevel(idx) {
        let sum = 0;
        for(let i=0;i<idx;i++) sum += xpForLevel(i);
        return sum;
    }
    function getLevelFromXP(xp) {
        let sum = 0;
        for(let i=0;i<NB_LEVELS;i++) {
            sum += xpForLevel(i);
            if (xp < sum) return i;
        }
        return NB_LEVELS-1;
    }
    // --- Affichage ---
    window.renderXPBar = function() {
        const container = document.getElementById('xp-bar-container');
        if (!container) return;
        state.level = getLevelFromXP(state.totalXP);
        const nextXP = xpForLevel(state.level);
        const prevTotal = totalXpForLevel(state.level);
        const progress = Math.min(1, (state.totalXP - prevTotal) / nextXP);
        // Logo du palier (exemple : symbole carte + numéro ou lettre)
        const cardRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'As'];
        const cardSuits = ['♦', '♠', '♥', '♣'];
        const rank = cardRanks[state.level % 13];
        const suit = cardSuits[Math.floor(state.level / 13) % 4];
        // SVG dynamique : caractère centré dans le symbole
        function cardSVG(rank, suit) {
            let color = (suit === '♥' || suit === '♦') ? '#E63946' : '#eee';
            let symbolPath = '';
            if (suit === '♠') symbolPath = `
                <g transform="translate(7,-4) scale(1.35)">
                    <path d="M213.23 502.9
                        C17.92 702.44, 207.88 847.77, 362.29 752.5
                        C363.13 801.65, 324.6 847.53, 300.9 891.4
                        H467.63
                        C443.22 848.76, 402.46 801.79, 400.97 752.5
                        C558.63 843.07, 726.3 685.13, 551.36 502.9
                        C460.14 402.82, 403.12 324.95, 381.63 298.48
                        C362.03 324.29, 309.81 400.18, 213.23 502.9
                        Z"
                        fill="${color}" stroke="${color}" stroke-width="1.3691"
                        transform="scale(0.045) translate(-68.547241, -122.68109)" fill-rule="evenodd"/>
                </g>
            `;
            if (suit === '♥') symbolPath = `<path d="M 65,29 C 59,19 49,12 37,12 20,12 7,25 7,42 7,75 25,80 65,118 105,80 123,75 123,42 123,25 110,12 93,12 81,12 71,19 65,29 z" fill="${color}" transform="scale(0.38) translate(-5,-5)"/>`;
            if (suit === '♦') symbolPath = '<polygon points="25,7 43,25 25,43 7,25" fill="'+color+'"/>';
            if (suit === '♣') symbolPath = '<g transform="scale(1.18) translate(-4,-3)"><circle cx="25" cy="18" r="8" fill="'+color+'"/><circle cx="17" cy="28" r="7" fill="'+color+'"/><circle cx="33" cy="28" r="7" fill="'+color+'"/><rect x="22" y="28" width="6" height="12" rx="2" fill="'+color+'"/></g>';
            // Texte par-dessus, centré
            return `<svg width="2.2em" height="2.2em" viewBox="0 0 50 50" style="vertical-align:middle;">
                ${symbolPath}
                <text x="25" y="25" text-anchor="middle" alignment-baseline="middle" dominant-baseline="middle" font-size="18" font-family="inherit" fill="#23272b" font-weight="bold">${rank}</text>
            </svg>`;
        }
        const logo = cardSVG(rank, suit);
        // Flamme SVG
        const flame = `<svg width="1.5em" height="1.5em" viewBox="0 0 32 32" style="vertical-align:middle;"><path d="M16 2C16 2 8 10 12 18C14 22 16 22 16 28C16 22 18 22 20 18C24 10 16 2 16 2Z" fill="#FFA726"/><ellipse cx="16" cy="24" rx="4" ry="6" fill="#FFD580"/></svg>`;
        // Ajout d'une indication graphique de progression des niveaux (carreau, flèche, pique, flèche, coeur, flèche, trèfle)
        function getProgressionIcons(level) {
            // Ordre : carreau, flèche, pique, flèche, coeur, flèche, trèfle
            const icons = [
                '<span style="color:#E63946;font-size:1.3em;vertical-align:middle;">♦</span>',
                '<span style="color:#888;font-size:1.1em;vertical-align:middle;">→</span>',
                '<span style="color:#eee;font-size:1.3em;vertical-align:middle;">♠</span>',
                '<span style="color:#888;font-size:1.1em;vertical-align:middle;">→</span>',
                '<span style="color:#E63946;font-size:1.3em;vertical-align:middle;">♥</span>',
                '<span style="color:#888;font-size:1.1em;vertical-align:middle;">→</span>',
                '<span style="color:#eee;font-size:1.3em;vertical-align:middle;">♣</span>'
            ];
            // On met en surbrillance l'icône correspondant à la "famille" du niveau
            const suitIdx = Math.floor(level / 13);
            let out = '';
            for (let i = 0; i < icons.length; i++) {
                if (i % 2 === 0) {
                    // Si c'est une famille
                    if (i/2 === suitIdx) {
                        out += icons[i].replace('font-size:1.3em;', 'font-size:1.5em;text-shadow:0 0 6px #FFD580;');
                    } else {
                        out += icons[i];
                    }
                } else {
                    out += icons[i];
                }
            }
            return out;
        }
        container.innerHTML = `
        <div class="xp-bar-sticky" style="display:flex;align-items:center;gap:1em;">
            <div class="xp-bar-logo">${logo}</div>
            <div style="flex:1;">
                <div class="xp-bar-label" style="display:flex;align-items:center;justify-content:space-between;gap:1em;">
                    <span>XP : ${state.totalXP} / ${prevTotal+nextXP} &nbsp; | &nbsp; Level : ${state.level+1} / ${NB_LEVELS}
                        <span style="margin-left:1em;">${getProgressionIcons(state.level)}</span>
                    </span>
                    <span class="xp-bar-streak" style="font-size:1.1em;display:flex;align-items:center;gap:0.3em;"><span aria-label="streak" title="Streak">🔥</span><span style="font-weight:bold;">${state.streak}</span></span>
                </div>
                <div class="xp-bar-track">
                    <div class="xp-bar-fill" style="width:${progress*100}%"></div>
                </div>
            </div>
        </div>`;
    }
    // --- Gestion streak : reset si aucune quête faite dans les dernières 24h ---
    window.checkStreakReset = function() {
        function getTodayStr() {
            const d = new Date();
            return d.getFullYear() + '-' + (d.getMonth()+1).toString().padStart(2,'0') + '-' + d.getDate().toString().padStart(2,'0');
        }
        function getYesterdayStr() {
            const d = new Date();
            d.setDate(d.getDate() - 1);
            return d.getFullYear() + '-' + (d.getMonth()+1).toString().padStart(2,'0') + '-' + d.getDate().toString().padStart(2,'0');
        }
        const today = getTodayStr();
        const yesterday = getYesterdayStr();
        if (state.streak > 0 && !localStorage.getItem('questsDone-' + yesterday)) {
            state.streak = 0;
            state.totalXP = Math.max(0, state.totalXP - 25);
            saveState();
            renderXPBar();
        }
    };
    // Pénalité : -25 XP cumulés par jour sans quêtes faites, si absence >= 2 jours
    function applyMissedDaysPenalty() {
        const lastDone = localStorage.getItem(STORAGE_QUESTS_DONE_DATE);
        if (!lastDone) return;
        const last = new Date(lastDone);
        const today = new Date();
        // On ignore l'heure pour le calcul du nombre de jours
        last.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        const diffDays = Math.floor((today - last) / (1000*60*60*24));
        if (diffDays >= 2) {
            let cumul = loadCumulXP();
            let penalty = 25 * (diffDays - 1); // -1 car le 1er jour sans quêtes n'est pas pénalisé
            cumul = Math.max(0, cumul - penalty);
            saveCumulXP(cumul);
        }
    }
    // Correction : déclaration explicite de loadCumulXP pour la pénalité et le calcul XP
    function loadCumulXP() {
        return Number(localStorage.getItem('xpSystemSimpleCumul')) || 0;
    }
    // Correction : déclaration explicite de saveCumulXP pour la pénalité et le calcul XP
    function saveCumulXP(xp) {
        localStorage.setItem('xpSystemSimpleCumul', xp);
    }
    // Appliquer la pénalité au chargement de la page (avant calcul XP)
    applyMissedDaysPenalty();
    // --- Initialisation ---
    loadState();
    window.addEventListener('DOMContentLoaded', function() {
        window.checkStreakReset();
        renderXPBar();
    });
    // Pour test manuel : window.gainXP = function(x) { state.totalXP += x; saveState(); renderXPBar(); }
    window.gainXP = function(xp) {
        state.totalXP += xp;
        saveState();
        renderXPBar();
    };
    // Pour debug : reset complet de l'XP (non documenté)
    window._resetXP = function() {
        state = { totalXP: 0, level: 0, streak: 0 };
        saveState();
        renderXPBar();
    };
    // Incrémentation de la streak (appelée depuis le panneau de quêtes)
    window.incrementStreak = function() {
        state.streak += 1;
        saveState();
        renderXPBar();
    };
    // Annulation de la streak du jour (si toutes les quêtes sont décochées)
    window.resetStreakToday = function() {
        if (state.streak > 0) {
            state.streak -= 1;
            saveState();
            renderXPBar();
        }
    };
    function getMoveNames() {
        if (window.allMoveNames && Array.isArray(window.allMoveNames) && window.allMoveNames.length > 0) {
            return window.allMoveNames;
        }
        // fallback
        return ["Charlier Cut", "Sybil", "Revolution Cut"];
    }
    // Génère 3 quêtes du jour dynamiques (2 learn, 1 combo 2-4 moves), XP entre 20 et 70
    window.getDailyQuests = function() {
        const d = new Date();
        const seed = d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
        let x = seed ^ 0xDEADBEEF;
        function rand() {
            x ^= x << 13; x ^= x >> 17; x ^= x << 5;
            return Math.abs(x) / 0x7FFFFFFF;
        }
        const MOVE_LIST = getMoveNames();
        function pickMove(usedMoves = new Set()) {
            let m;
            do {
                m = MOVE_LIST[Math.floor(rand() * MOVE_LIST.length)];
            } while (usedMoves.has(m));
            usedMoves.add(m);
            return m;
        }
        // Génère 2 quêtes "learn"
        let used = new Set();
        const learn1 = pickMove(used);
        const learn2 = pickMove(used);
        // Génère une quête combo de 2 à 4 moves
        const comboLength = 2 + Math.floor(rand() * 3); // 2, 3 ou 4
        const comboMoves = [];
        for (let i = 0; i < comboLength; i++) comboMoves.push(pickMove(used));
        function randomXP() { return 20 + Math.floor(rand() * 51); } // 20 à 70 inclus
        return [
            { text: `Learn the move: ${learn1}`, xp: randomXP() },
            { text: `Learn the move: ${learn2}`, xp: randomXP() },
            { text: `Do a combo with: ${comboMoves.join(', ')}`, xp: randomXP() }
        ];
    };
    // --- Pomodoro morphing panel (bottom left) ---
    document.addEventListener('DOMContentLoaded', function () {
        // FAB (bouton flottant)
        if (!document.getElementById('pomodoro-fab')) {
            const fab = document.createElement('div');
            fab.id = 'pomodoro-fab';
            fab.innerHTML = '<span class="pomodoro-fab-icon" style="font-size:1.7em;">🍅</span>';
            fab.style.position = 'fixed';
            fab.style.left = '32px';
            fab.style.bottom = '32px';
            fab.style.width = '56px';
            fab.style.height = '56px';
            fab.style.background = '#23272b';
            fab.style.color = '#fff';
            fab.style.borderRadius = '50%';
            fab.style.boxShadow = '0 2px 12px #0006';
            fab.style.display = 'flex';
            fab.style.alignItems = 'center';
            fab.style.justifyContent = 'center';
            fab.style.zIndex = 9999;
            fab.style.cursor = 'pointer';
            fab.style.userSelect = 'none';
            fab.style.transition = 'all 0.35s cubic-bezier(.4,2,.6,1)';
            document.body.appendChild(fab);
        }
        const fab = document.getElementById('pomodoro-fab');
        function showPomodoroPanel() {
            if (document.getElementById('pomodoro-panel')) return;
            const panel = document.createElement('div');
            panel.id = 'pomodoro-panel';
            panel.innerHTML = `
                <div id="pomodoro-header" style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:bold;">🍅 Pomodoro</span>
                    <button id="pomodoro-close" style="background:none;border:none;font-size:1.2em;cursor:pointer;">✕</button>
                </div>
                <div id="pomodoro-timer" style="font-size:2em;text-align:center;margin:0.3em 0;">25:00</div>
                <div style="display:flex;gap:0.5em;justify-content:center;">
                    <button id="pomodoro-startpause" class="btn btn-success btn-sm" type="button">Start</button>
                    <button id="pomodoro-reset" class="btn btn-danger btn-sm" type="button">Reset</button>
                </div>
            `;
            panel.style.position = 'fixed';
            panel.style.left = '32px';
            panel.style.bottom = '32px';
            panel.style.background = '#23272b';
            panel.style.color = '#fff';
            panel.style.borderRadius = '14px';
            panel.style.boxShadow = '0 2px 12px #0006';
            panel.style.padding = '1em 1.2em 1em 1.2em';
            panel.style.zIndex = 9999;
            panel.style.minWidth = '180px';
            panel.style.userSelect = 'none';
            panel.style.fontFamily = 'inherit';
            panel.style.transition = 'all 0.35s cubic-bezier(.4,2,.6,1)';
            document.body.appendChild(panel);
            fab.style.opacity = '0';
            setTimeout(() => { fab.style.display = 'none'; }, 350);

            // Pomodoro timer logic (refactored, only 2 buttons)
            const DURATION = 25 * 60; // 25 min
            let interval = null;
            function getState() {
                return JSON.parse(localStorage.getItem('pomodoroState') || '{}');
            }
            function saveState(state) {
                localStorage.setItem('pomodoroState', JSON.stringify(state));
            }
            function clearState() {
                localStorage.removeItem('pomodoroState');
            }
            function updateDisplay(secs) {
                const m = Math.floor(secs / 60).toString().padStart(2, '0');
                const s = (secs % 60).toString().padStart(2, '0');
                document.getElementById('pomodoro-timer').textContent = `${m}:${s}`;
            }
            function updateStartPauseButton(state) {
                const btn = document.getElementById('pomodoro-startpause');
                if (!state.startTime) {
                    btn.textContent = 'Start';
                    btn.classList.remove('btn-warning');
                    btn.classList.add('btn-success');
                } else if (state.paused) {
                    btn.textContent = 'Play';
                    btn.classList.remove('btn-warning');
                    btn.classList.add('btn-success');
                } else {
                    btn.textContent = 'Pause';
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-warning');
                }
            }
            function startTimer() {
                let state = getState();
                if (!state.startTime) {
                    // Premier démarrage
                    state.startTime = Date.now();
                    state.paused = false;
                    state.elapsed = 0;
                } else if (state.paused) {
                    // Reprise après pause
                    state.startTime = Date.now() - (state.elapsed * 1000);
                    state.paused = false;
                }
                saveState(state);
                updateStartPauseButton(state);
                if (interval) clearInterval(interval);
                let st = getState();
                let elapsed = Math.floor((Date.now() - st.startTime) / 1000);
                updateDisplay(Math.max(0, DURATION - elapsed));
                interval = setInterval(() => {
                    let st = getState();
                    let elapsed = Math.floor((Date.now() - st.startTime) / 1000);
                    if (elapsed >= DURATION) {
                        updateDisplay(0);
                        clearInterval(interval);
                        clearState();
                        alert('Pomodoro finished!');
                        updateStartPauseButton({});
                    } else {
                        updateDisplay(DURATION - elapsed);
                        st.elapsed = elapsed;
                        saveState(st);
                    }
                }, 1000);
                panel._pomodoroInterval = interval;
            }
            function pauseTimer() {
                let state = getState();
                if (!state.paused) {
                    state.paused = true;
                    state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
                    saveState(state);
                    // Sauvegarde la date et l'heure de la pause
                    localStorage.setItem('pomodoroPauseInfo', JSON.stringify({
                        pausedAt: Date.now(),
                        elapsed: state.elapsed,
                        startTime: state.startTime
                    }));
                }
                updateStartPauseButton(state);
                if (interval) clearInterval(interval);
            }
            // Restore state on load
            (function restore() {
                let state = getState();
                let pauseInfo = null;
                try { pauseInfo = JSON.parse(localStorage.getItem('pomodoroPauseInfo') || 'null'); } catch {}
                let now = Date.now();
                if (pauseInfo && pauseInfo.pausedAt && (now - pauseInfo.pausedAt < 3600 * 1000)) {
                    // Pause récente (<1h) : priorité à la pause
                    let elapsed = pauseInfo.elapsed || 0;
                    updateDisplay(DURATION - elapsed);
                    updateStartPauseButton({paused:true,startTime:pauseInfo.startTime});
                    // On restaure l'état de pause
                    saveState({startTime:pauseInfo.startTime, paused:true, elapsed:elapsed});
                    return;
                } else {
                    // Si la pause date de plus d'une heure, on l'efface
                    localStorage.removeItem('pomodoroPauseInfo');
                }
                if (state.startTime) {
                    let elapsed = state.paused
                        ? (state.elapsed || 0)
                        : Math.floor((Date.now() - state.startTime) / 1000);
                    if (elapsed < DURATION) {
                        updateDisplay(DURATION - elapsed);
                        updateStartPauseButton(state);
                        if (!state.paused) startTimer();
                    } else {
                        updateDisplay(DURATION);
                        clearState();
                        updateStartPauseButton({});
                    }
                } else {
                    updateDisplay(DURATION);
                    updateStartPauseButton({});
                }
            })();
            // Nettoyage de la pause si on relance ou reset
            function clearPauseInfo() {
                localStorage.removeItem('pomodoroPauseInfo');
            }
            document.getElementById('pomodoro-startpause').addEventListener('click', function() {
                let state = getState();
                let pauseInfo = null;
                try { pauseInfo = JSON.parse(localStorage.getItem('pomodoroPauseInfo') || 'null'); } catch {}
                if (!state.startTime) {
                    clearPauseInfo();
                    startTimer();
                } else if (state.paused) {
                    // Reprise après pause : recalculer startTime à partir de elapsed
                    let elapsed = state.elapsed || (pauseInfo && pauseInfo.elapsed) || 0;
                    let startTime = Date.now() - (elapsed * 1000);
                    let newState = {startTime: startTime, paused: false, elapsed: elapsed};
                    saveState(newState);
                    clearPauseInfo();
                    updateStartPauseButton(newState);
                    if (interval) clearInterval(interval);
                    // Redémarre le timer à la bonne valeur
                    interval = setInterval(() => {
                        let st = getState();
                        let elapsed = Math.floor((Date.now() - st.startTime) / 1000);
                        if (elapsed >= DURATION) {
                            updateDisplay(0);
                            clearInterval(interval);
                            clearState();
                            updateStartPauseButton({});
                        } else {
                            updateDisplay(DURATION - elapsed);
                            st.elapsed = elapsed;
                            saveState(st);
                        }
                    }, 1000);
                    panel._pomodoroInterval = interval;
                } else {
                    pauseTimer();
                }
            });
            // Ajout : fonction resetTimer bien définie dans le scope du panneau
            function resetTimer() {
                if (interval) clearInterval(interval);
                clearState();
                clearPauseInfo();
                updateDisplay(DURATION);
                updateStartPauseButton({});
            }
            document.getElementById('pomodoro-reset').addEventListener('click', resetTimer);
            document.getElementById('pomodoro-close').addEventListener('click', function() {
                if (panel._pomodoroInterval) clearInterval(panel._pomodoroInterval);
                panel.remove();
                fab.style.display = 'flex';
                setTimeout(() => { fab.style.opacity = '1'; }, 10);
            });
        }
        fab.onclick = showPomodoroPanel;
        // Si le timer était déjà lancé, affiche le panneau au chargement
        if (localStorage.getItem('pomodoroState')) {
            showPomodoroPanel();
        }
    });
})();
