import Head from 'next/head';
import {useState} from 'react';

export default function Home () {
  const [imagePromptInput, setImagePromptInput,] = useState("");
  const [textPromptInput, setTextPromptInput,] = useState("");
  const [textResult, setTextResult,] = useState("");
  const [imageResult, setImageResult] = useState("");

  async function textOnSubmit (event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({prompt: textPromptInput}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        new Error(`Request failed with status ${response.status}`);
      }

      setTextResult(data.result);
      setTextPromptInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function imageOnSubmit (event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({prompt: imagePromptInput}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        new Error(`Request failed with status ${response.status}`);
      }

      setImageResult(data.result);
      setImagePromptInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (<div>
    <Head>
      <title>OpenAI API Playground</title>
      <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.2/css/bootstrap.min.css"
      />
    </Head>

    <main className="container">

      <h1 className="h2 mt-5 mb-3">Ask me anything</h1>
      <form onSubmit={textOnSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="prompt"
          placeholder="Enter your prompt"
          value={textPromptInput}
          onChange={(e) => setTextPromptInput(e.target.value)}
        />
        <input type="submit" className="btn btn-secondary" value="Submit"/>
      </form>
      <blockquote className="blockquote mt-5">{textResult}</blockquote>

      <hr className="m-5"/>

      <h1 className="h2 mt-5 mb-3">Generate an image</h1>
      <form onSubmit={imageOnSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="prompt"
          placeholder="Enter your prompt"
          value={imagePromptInput}
          onChange={(e) => setImagePromptInput(e.target.value)}
        />
        <input type="submit" className="btn btn-secondary" value="Submit"/>
      </form>
      <img alt="dall-e" className="my-5 mw-100" src={imageResult}/>

    </main>
  </div>);
}
