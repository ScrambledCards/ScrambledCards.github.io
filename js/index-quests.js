// js/index-quests.js
// Gère l'injection et la logique des quêtes du jour sur la page d'accueil

document.addEventListener('DOMContentLoaded', function () {
  // Floating panel logic
  var fab = document.getElementById('floating-panel-fab');
  var panel = document.getElementById('floating-panel');
  if (fab && panel) {
    fab.addEventListener('click', function (e) {
      if (!fab.classList.contains('morphing')) {
        fab.classList.add('morphing');
      }
    });
    window.closeFloatingPanel = function (e) {
      e.stopPropagation();
      fab.classList.remove('morphing');
    };
    panel.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
  // Injection des quêtes du jour dans le panneau morphing
  if (window.getDailyQuests) {
    var quests = window.getDailyQuests();
    var panelContent = document.getElementById('daily-quests-panel');
    var todayKey = 'questsDone-' + (new Date().getFullYear() + '-' + (new Date().getMonth()+1).toString().padStart(2,'0') + '-' + new Date().getDate().toString().padStart(2,'0'));
    var doneArr = JSON.parse(localStorage.getItem(todayKey) || '[false,false,false]');
    if (panelContent && Array.isArray(quests)) {
      panelContent.innerHTML = '<strong>Quests of the day</strong><ul style="margin-top:0.7em;margin-bottom:0.7em;text-align:left;list-style:none;padding-left:0;">' +
        quests.map((q, i) => `<li style=\"margin-bottom:0.5em;\"><label style=\"cursor:pointer;\"><input type=\"checkbox\" class=\"quest-checkbox\" data-idx=\"${i}\" ${doneArr[i] ? 'checked' : ''}> <span>${q.text}</span> <span style=\"color:#FFA726;font-weight:bold;\">+${q.xp} XP</span></label></li>`).join('') +
        '</ul>';
    }
    // Gestion des cases à cocher
    var checkboxes = panelContent.querySelectorAll('.quest-checkbox');
    checkboxes.forEach(function(cb, idx) {
      cb.addEventListener('change', function() {
        var doneArr = JSON.parse(localStorage.getItem(todayKey) || '[false,false,false]');
        if (cb.checked) {
          if (!doneArr[idx]) {
            window.gainXP(quests[idx].xp);
            doneArr[idx] = true;
          }
        } else {
          if (doneArr[idx]) {
            window.gainXP(-quests[idx].xp);
            doneArr[idx] = false;
          }
        }
        localStorage.setItem(todayKey, JSON.stringify(doneArr));
        // Gestion du streak : si au moins une quête cochée aujourd'hui, streak +1 (une seule fois)
        var streakKey = todayKey + '-streaked';
        if (doneArr.some(Boolean) && !localStorage.getItem(streakKey)) {
          window.incrementStreak();
          localStorage.setItem(streakKey, '1');
        }
        // Si plus aucune quête cochée, on retire le streak du jour
        if (!doneArr.some(Boolean) && localStorage.getItem(streakKey)) {
          window.resetStreakToday();
          localStorage.removeItem(streakKey);
        }
      });
    });
  }
});
