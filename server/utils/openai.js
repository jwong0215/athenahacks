const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Load API key from .env
});
const openai = new OpenAIApi(configuration);

// Function to generate a study summary
async function generateStudySummary(timeStudied) {
  const prompt = `Summarize a study session where the user studied for ${timeStudied} minutes.`;
  
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
  });

  return response.data.choices[0].text.trim();
}

module.exports = { generateStudySummary };