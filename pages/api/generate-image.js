import {Configuration, OpenAIApi} from 'openai';

const openai = new OpenAIApi(new Configuration({apiKey: process.env.OPENAI_API_KEY}));

export default async function (req, res) {
  let prompt = req.body.prompt || '';

  if (prompt.trim().length === 0) {
    res.status(400).json({error: {message: 'Prompt cannot be empty'}});
    return;
  }

  const request = {
    model: "dall-e-2",
    prompt,
    n: 1,
    size: "320x320",
  };

  try {
    const image = await openai.createImage(request);
    res.status(200).json({result: image.data.data[0].url});
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
