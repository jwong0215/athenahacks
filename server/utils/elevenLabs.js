const axios = require('axios');

const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;

// Function to generate a voice nudge
async function generateVoiceNudge(message, tone) {
  const voiceId = tone === 'strict' ? 'VOICE_ID_STRICT' : 'VOICE_ID_NICE'; // Replace with actual voice IDs

  const response = await axios.post(
    'https://api.elevenlabs.io/v1/text-to-speech',
    {
      text: message,
      voice_id: voiceId,
    },
    {
      headers: {
        'Authorization': `Bearer ${ELEVEN_LABS_API_KEY}`,
      }
    }
  );

  return response.data.audio_url; // Return the generated audio URL
}

module.exports = { generateVoiceNudge };