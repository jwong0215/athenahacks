// Example: Function to call the backend for AI-generated study summaries
async function getStudySummary(sessionData) {
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

  export async function getSessions(search = '', visibility = 'all') {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (visibility !== 'all') params.append('visibility', visibility);

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

export async function joinSession(sessionId, userId) {
  const res = await fetch(`/api/sessions/${sessionId}/join`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  return res.json();
}