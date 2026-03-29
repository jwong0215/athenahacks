// Example: Function to call the backend for AI-generated study summaries
export async function getStudySummary(sessionData) {
    try {
      const response = await fetch('/api/ai/study-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch study summary');
      }
  
      const data = await response.json();
      return data.summary; // Return the AI-generated summary
    } catch (error) {
      console.error('Error fetching study summary:', error);
    }
  }
  
  // Example usage
  // getStudySummary({ timeStudied: 120 }).then(summary => console.log(summary));

  export async function getSessions(search = '') {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  const res = await fetch(`/api/sessions?${params}`);
  return res.json();
}

export async function createSession(data) {
  const res = await fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function joinSession(sessionId) {
  const res = await fetch(`/api/sessions/${sessionId}/join`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

export async function getUserSubjects(userId) {
  const res = await fetch(`/api/users/${userId}/subjects`);
  return res.json();    // returns ['#linguistics', '#history']
}