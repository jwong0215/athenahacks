import { getSessions, createSession, joinSession, getUserSubjects } from './api.js';

const TEMP_USER_ID = 'temp-user'; // Replace with real user ID from auth system

async function loadSessions() {
  const search = document.getElementById('search-input').value;
  const sessions = await getSessions(search, visibility);
  renderSessions(sessions);
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
      <span class="tag">${session.subject} </span>
      <span class="tag">#${session.intent}</span>
      <span class="tag">${session.goal}</span>
      <p>${session.participantCount} studying</p>
      <button onclick="handleJoin('${session._id}')">Join</button>
    `;
    container.appendChild(card);
  });
}

window.handleJoin = async function(sessionId) {
  await joinSession(sessionId);
  alert('Joined!');
  loadSessions();
};

async function loadSubjectOptions() {
  const subjects = await getUserSubjects(TEMP_USER_ID);
  const select = document.getElementById('session-subject');
  select.innerHTML = '<option value="">Select a subject</option>';
  subjects.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    select.appendChild(option);
  });
}

function setupCreateForm() {
  const form = document.getElementById('create-session-form');
  const toggleBtn = document.getElementById('toggle-create-form');
  const formContainer = document.getElementById('create-form-container');

  toggleBtn.addEventListener('click', () => {
    const isHidden = formContainer.style.display === 'none';
    formContainer.style.display = isHidden ? 'block' : 'none';
    if (isHidden) loadSubjectOptions(); // Load subjects when showing form
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      title: document.getElementById('session-title').value,
      subject: document.getElementById('session-subject').value,
      intent: document.getElementById('session-intent').value,
      goal: document.getElementById('session-goal').value,
      host: TEMP_USER_ID,
      participantCount: 1
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
}

// Kick everything off
document.addEventListener('DOMContentLoaded', () => {
  loadSessions();
  setupCreateForm();
  setupSearch();
});