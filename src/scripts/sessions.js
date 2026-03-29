import { getSessions, createSession, joinSession } from './api.js';

let allSessions = [];

async function loadSessions() {
  const search = document.getElementById('search-input').value;
  const visibility = document.getElementById('visibility-filter').value;
  allSessions = await getSessions(search, visibility);
  renderSessions(allSessions);
}

function renderSessions(sessions) {
  const container = document.getElementById('sessions-list');
  container.innerHTML = '';

  if (sessions.length === 0) {
    container.innerHTML = '<p>No sessions found.</p>';
    return;
  }

  sessions.forEach(session => {
    const card = document.createElement('div');
    card.className = 'session-card';
    card.innerHTML = `
      <h3>${session.title}</h3>
      <p>${session.subject} ${session.course ? '· ' + session.course : ''}</p>
      <span class="tag">#${session.intent}</span>
      <span class="tag">${session.visibility}</span>
      <p>${session.participants.length} studying</p>
      <button onclick="handleJoin('${session._id}')">Join</button>
    `;
    container.appendChild(card);
  });
}

window.handleJoin = async function(sessionId) {
  const userId = 'temp-user'; // replace with real user ID once you have auth
  await joinSession(sessionId, userId);
  alert('Joined!');
  loadSessions();
};

function setupCreateForm() {
  const form = document.getElementById('create-session-form');
  const toggleBtn = document.getElementById('toggle-create-form');
  const formContainer = document.getElementById('create-form-container');

  toggleBtn.addEventListener('click', () => {
    formContainer.style.display =
      formContainer.style.display === 'none' ? 'block' : 'none';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      title: document.getElementById('session-title').value,
      subject: document.getElementById('session-subject').value,
      course: document.getElementById('session-course').value,
      intent: document.getElementById('session-intent').value,
      visibility: document.getElementById('session-visibility').value,
      host: 'temp-user', // replace with real user ID
      participants: ['temp-user']
    };
    await createSession(data);
    formContainer.style.display = 'none';
    form.reset();
    loadSessions();
  });
}

function setupSearch() {
  document.getElementById('search-input')
    .addEventListener('input', loadSessions);
  document.getElementById('visibility-filter')
    .addEventListener('change', loadSessions);
}

// Kick everything off
document.addEventListener('DOMContentLoaded', () => {
  loadSessions();
  setupCreateForm();
  setupSearch();
});