import { getSession, getMessages, postMessage } from './api.js';

const TEMP_USER = { id: 'temp-user', name: 'You' }; // replace when auth is ready

// gets the session ID from the URL
const params = new URLSearchParams(window.location.search);
const SESSION_ID = params.get('id');

let socket;

window.switchTab = function(tab) {
  const userPanel = document.getElementById('user-chat-panel');
  const aiPanel = document.getElementById('ai-chat-panel');
  const buttons = document.querySelectorAll('.tab-btn');

  if (tab === 'user') {
    userPanel.style.display = 'flex';
    aiPanel.style.display = 'none';
  } else {
    userPanel.style.display = 'none';
    aiPanel.style.display = 'flex';
  }


  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
};

async function init() {
  if (!SESSION_ID) {
    alert('No session ID found.');
    return;
  }

  // load session info
  const session = await getSession(SESSION_ID);
  document.getElementById('session-title').textContent = session.title;
  document.getElementById('session-tags').textContent =
    `${session.subject} · #${session.intent} · #${session.goal}`;

  // load existing messages
  const messages = await getMessages(SESSION_ID);
  messages.forEach(msg => renderMessage(msg, msg.type));

  setupSocket();

  // set up both chats
  setupUserChat();
  setupAIChat();

  // render the participant board/list
  renderParticipants(session.participantCount);
}
// socket stuff
function setupSocket() {
  socket = io(); // connects to  server automatically
  socket.emit('join-session', SESSION_ID); // tells server which room to join

  // when a new message comes from someone else
  socket.on('receive-message', (data) => {
    renderMessage(data, 'user');
  });
}

// people stuff
// shows user icons + # of participants
function renderParticipants(count) {
  const board = document.getElementById('user-board');
  const list = document.getElementById('participants-list');
  board.innerHTML = '';
  list.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const name = i === 0 ? TEMP_USER.name : `Student ${i + 1}`;

    // pf icons
    const icon = document.createElement('div');
    icon.className = 'user-icon';
    icon.textContent = name.charAt(0).toUpperCase(); // first letter as automatic/default icon
    board.appendChild(icon);

    const item = document.createElement('div');
    item.className = 'participant-item';
    item.textContent = name;
    list.appendChild(item);
  }
}

// user chat stuff
function setupUserChat() {
  const form = document.getElementById('user-chat-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('user-chat-input');
    const text = input.value.trim();
    if (!text) return;

    const data = {
      sessionId: SESSION_ID,
      sender: TEMP_USER.name,
      text,
      type: 'user'
    };

    // save to mongo, broadcast to others irt
    await postMessage(data);
    socket.emit('send-message', data);

    // show your own message immediately
    renderMessage(data, 'user');
    input.value = '';
  });
}


// AI chat stuff
function setupAIChat() {
  const form = document.getElementById('ai-chat-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('ai-chat-input');
    const text = input.value.trim();
    if (!text) return;

    // show user's question in AI chat panel
    renderMessage({ sender: TEMP_USER.name, text }, 'ai');
    input.value = '';

    // send to AI route + show the response
    const res = await fetch('/api/ai/study-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text })
    });
    const data = await res.json();
    const aiReply = data.summary || 'No response.';

    // save AI reply to mongo, render it
    const aiMessage = {
      sessionId: SESSION_ID,
      sender: 'AI',
      text: aiReply,
      type: 'ai'
    };
    await postMessage(aiMessage);
    renderMessage(aiMessage, 'ai');
  });
}


// render stuff
function renderMessage(msg, panel) {
  // 'user' messages go in user chat, 'ai' messages go in AI chat
  const containerId = panel === 'ai' ? 'ai-chat-messages' : 'user-chat-messages';
  const container = document.getElementById(containerId);

  const bubble = document.createElement('div');
  bubble.className = `message-bubble ${msg.sender === 'AI' ? 'ai-bubble' : 'user-bubble'}`;
  bubble.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
  container.appendChild(bubble);

  // auto scroll to bottom
  container.scrollTop = container.scrollHeight;
}

document.addEventListener('DOMContentLoaded', init);