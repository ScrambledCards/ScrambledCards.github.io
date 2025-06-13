// js/version.js
// Dynamically updates version and date on all pages

// Extract version from changelog filename (format: changelog-YYYY-MM-DD.txt)
function getVersionFromChangelog() {
    // You can update this if the changelog filename changes
    const changelogFile = 'changelog-2025-06-13.txt';
    const match = changelogFile.match(/changelog-(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : 'unknown';
}

function updateVersionAndDate() {
    const version = getVersionFromChangelog();
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    // Update all elements with class 'site-version' and 'site-date'
    document.querySelectorAll('.site-version').forEach(el => {
        el.textContent = version;
    });
    document.querySelectorAll('.site-date').forEach(el => {
        el.textContent = dateStr;
    });
}

document.addEventListener('DOMContentLoaded', updateVersionAndDate);
