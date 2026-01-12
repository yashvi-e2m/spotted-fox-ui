/**
 * WorkflowAI - Main JavaScript
 * Common functions used across all pages
 */

// ============ THEME MANAGEMENT ============
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// ============ MODAL MANAGEMENT ============
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking overlay
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
});

// ============ TOAST NOTIFICATIONS ============
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-circle';
    if (type === 'info') icon = 'fa-info-circle';

    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-content">
            <div class="title">${title}</div>
            <div class="message">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlide 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============ FATHOM IMPORT ============
function importFromFathom() {
    const urlInput = document.getElementById('fathomUrl');
    if (!urlInput) return;

    const url = urlInput.value;
    if (!url) {
        showToast('warning', 'URL Required', 'Please enter a Fathom meeting URL.');
        return;
    }
    if (!url.includes('fathom')) {
        showToast('warning', 'Invalid URL', 'Please enter a valid Fathom URL.');
        return;
    }
    closeModal('fathomImportModal');
    showToast('success', 'Importing...', 'Fetching meeting from Fathom. This may take a moment.');
    urlInput.value = '';
}
