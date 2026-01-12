/**
 * WorkflowAI - Client Page JavaScript
 * Functions specific to client pages (TechCorp, MediaPro, Acme, Internal)
 */

// ============ TAB SWITCHING ============
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('#contentTabs .tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');

            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Show selected tab content
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// ============ MEETINGS TAB FUNCTIONS ============
function viewTranscript(meetingTitle) {
    switchToTab('transcripts');
    showToast('info', 'Viewing Transcript', `Loading transcript for "${meetingTitle}"`);
}

function viewSummary(meetingTitle) {
    switchToTab('summaries');
    showToast('info', 'Viewing Summary', `Loading AI summary for "${meetingTitle}"`);
}

function viewActions(meetingTitle, count) {
    switchToTab('actions');
    showToast('info', 'Viewing Actions', `Showing ${count} action items from "${meetingTitle}"`);
}

function switchToTab(tabName) {
    document.querySelectorAll('#contentTabs .tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
}

// ============ TRANSCRIPTS TAB FUNCTIONS ============
function viewFullTranscript(title) {
    showToast('info', 'Opening Transcript', `Loading full transcript for "${title}"...`);
}

function downloadTranscript(title) {
    showToast('success', 'Downloading', `Downloading transcript for "${title}"...`);
    setTimeout(() => {
        showToast('success', 'Download Complete', 'Transcript has been downloaded successfully.');
    }, 1500);
}

function copyTranscript(title) {
    const sampleText = `Transcript for: ${title}\n\nBrad: "Let's start by reviewing the project scope..."\nClient: "We're looking for a complete redesign..."`;
    navigator.clipboard.writeText(sampleText).then(() => {
        showToast('success', 'Copied!', 'Transcript copied to clipboard.');
    }).catch(() => {
        showToast('success', 'Copied!', 'Transcript copied to clipboard.');
    });
}

// ============ SUMMARIES TAB FUNCTIONS ============
function editSummary(btn, title) {
    const card = btn.closest('.content-card');
    const preview = card.querySelector('.card-preview');

    if (btn.innerHTML.includes('Edit')) {
        preview.contentEditable = 'true';
        preview.style.border = '2px solid var(--primary)';
        preview.style.outline = 'none';
        preview.focus();
        btn.innerHTML = '<i class="fas fa-save"></i> Save';
        showToast('info', 'Edit Mode', 'You can now edit the summary. Click Save when done.');
    } else {
        preview.contentEditable = 'false';
        preview.style.border = 'none';
        btn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        showToast('success', 'Saved!', `Summary for "${title}" has been updated.`);
    }
}

function approveSummary(btn, title) {
    const card = btn.closest('.content-card');
    const badge = card.querySelector('.card-badge');

    badge.className = 'card-badge badge-approved';
    badge.innerHTML = 'Approved';

    const actions = card.querySelector('.card-actions');
    actions.innerHTML = '<button class="btn btn-secondary" onclick="viewEmail()"><i class="fas fa-envelope"></i> View Email Sent</button>';

    showToast('success', 'Approved!', `Summary approved. Email sent to client for "${title}".`);
}

function viewEmail() {
    showToast('info', 'Opening Email', 'Loading email preview...');
}

// ============ ACTION ITEMS TAB FUNCTIONS ============
function completeTask(btn, taskTitle) {
    const row = btn.closest('tr');
    const statusCell = row.querySelector('.card-badge');

    statusCell.className = 'card-badge badge-approved';
    statusCell.innerHTML = 'Done';

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-check"></i> Completed';

    showToast('success', 'Task Completed', `"${taskTitle}" has been marked as complete.`);
}
