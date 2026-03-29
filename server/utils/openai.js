const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to generate a study summary
async function generateStudySummary(timeStudied) {
  const prompt = `Summarize a study session where the user studied for ${timeStudied} minutes.`;
  
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
  });

  return response.choices[0].text.trim();
}

module.exports = { generateStudySummary };