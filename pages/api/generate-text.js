import {Configuration, OpenAIApi} from 'openai';

const openai = new OpenAIApi(new Configuration({apiKey: process.env.OPENAI_API_KEY}));

export default async function (req, res) {
  let prompt = req.body.prompt || '';

  if (prompt.trim().length === 0) {
    res.status(400).json({error: {message: 'Prompt cannot be empty'}});
    return;
  }

  const request = {
    model: 'text-davinci-003',
    prompt,
    temperature: .6,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  try {
    const completion = await openai.createCompletion(request);
    res.status(200).json({result: completion.data.choices[0].text});
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({error: {message: 'An error occurred during your request.'}});
    }
  }
}
