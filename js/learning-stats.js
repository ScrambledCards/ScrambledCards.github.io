// js/learning-stats.js
// Affiche le temps consacré à l'apprentissage/entraînement par jour (via Pomodoro)

// --- Délai différé pour le rendu des stats (priorité à l'UI XP/Pomodoro) ---
const STATS_RENDER_DELAY_MS = 100; // Peut être augmenté si besoin

function getPomodoroStats() {
    // Récupère l'historique du localStorage
    const stats = JSON.parse(localStorage.getItem('pomodoroHistory') || '{}');
    return stats; // { '18-06-2025': 3, ... } (nombre de minutes par jour)
}

function formatMinutes(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) return `${h}h ${m}min`;
    return `${m}min`;
}

function parseDateKey(key) {
    // key format: JJ-MM-YYYY
    const [d, m, y] = key.split('-').map(Number);
    return new Date(y, m - 1, d);
}

function toDisplayDate(key) {
    // key format: JJ-MM-YYYY
    return key.slice(0, 5); // JJ-MM uniquement
}

// --- Affichage graphique : tableau à colonnes (bar chart) ---
function renderStats() {
    const stats = getPomodoroStats();
    // Trie toutes les dates par ordre croissant (plus ancien à gauche, plus récent à droite)
    const allDays = Object.keys(stats)
        .map(key => ({ key, date: parseDateKey(key) }))
        .filter(obj => !isNaN(obj.date))
        .sort((a, b) => a.date - b.date); // plus ancien à gauche, plus récent à droite
    // Prend les 20 plus récentes (mais dans l'ordre croissant)
    const days = allDays.slice(-20);
    let html = '';
    if (days.length === 0) {
        html = '<div class="alert alert-warning">No learning/practice sessions recorded yet.</div>';
    } else {
        // Bar chart SVG centré
        const maxMin = Math.max(...days.map(d => stats[d.key]));
        const barW = 32, barGap = 8, chartH = 180;
        html += `<div style="overflow-x:auto; display:flex; justify-content:center;">`;
        html += `<svg width="${days.length*(barW+barGap)+barGap}" height="${chartH+40}">`;
        days.forEach((obj, i) => {
            const min = stats[obj.key];
            const h = Math.round((min/maxMin)*chartH);
            html += `<rect x="${barGap+i*(barW+barGap)}" y="${chartH-h+20}" width="${barW}" height="${h}" fill="#5A9" rx="6"/>`;
            html += `<text x="${barGap+i*(barW+barGap)+barW/2}" y="${chartH+35}" text-anchor="middle" font-size="12" fill="#aaa">${toDisplayDate(obj.key)}</text>`;
            html += `<text x="${barGap+i*(barW+barGap)+barW/2}" y="${chartH-h+12}" text-anchor="middle" font-size="13" fill="#fff">${min}m</text>`;
        });
        html += `</svg></div>`;
    }
    document.getElementById('stats-content').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    // Affiche d'abord le reste de l'UI (barre d'XP, timer, etc.)
    // On laisse le navigateur afficher la page, puis on charge les stats après un court délai
    setTimeout(renderStats, STATS_RENDER_DELAY_MS);
});

// --- Pomodoro : enregistrement du temps ---
(function hookPomodoroHistory() {
    window._savePomodoroTime = function() {
        const state = JSON.parse(localStorage.getItem('pomodoroState') || '{}');
        if (!state.startTime) return;
        const d = new Date();
        const key = String(d.getDate()).padStart(2,'0') + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + d.getFullYear();
        const stats = JSON.parse(localStorage.getItem('pomodoroHistory') || '{}');
        let minutes = 0;
        if (state.paused && state.elapsed) {
            minutes = Math.round(state.elapsed / 60);
        } else if (state.startTime) {
            const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
            minutes = Math.round(elapsed / 60);
        }
        if (minutes > 0) {
            stats[key] = (stats[key] || 0) + minutes;
            localStorage.setItem('pomodoroHistory', JSON.stringify(stats));
        }
        localStorage.removeItem('pomodoroState');
    };
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'pomodoro-startpause') {
            const btn = e.target;
            if (btn.textContent === 'Play') {
                window._savePomodoroTime();
            }
        }
        if (e.target && e.target.id === 'pomodoro-reset') window._savePomodoroTime();
        if (e.target && e.target.id === 'pomodoro-close') window._savePomodoroTime();
    });
    const origAlert = window.alert;
    window.alert = function(msg) {
        if (msg && msg.toLowerCase().includes('pomodoro finished')) {
            window._savePomodoroTime();
        }
        origAlert.apply(window, arguments);
    };
})();
