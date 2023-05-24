import Head from 'next/head';
import {useState} from 'react';

export default function Home () {
  const [promptInput, setpromptInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit (event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/generate', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({prompt: promptInput}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setpromptInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (<div>
    <Head>
      <title>OpenAI API Playground</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"/>
    </Head>

    <main className="container">
      <h1 className="h2 mt-5 mb-3">Ask me anything</h1>
      <form onSubmit={onSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="prompt"
          placeholder="Enter your prompt"
          value={promptInput}
          onChange={(e) => setpromptInput(e.target.value)}
        />
        <input type="submit" className="btn btn-secondary" value="Submit"/>
      </form>
      <blockquote className="blockquote mt-5" style={{whiteSpace: 'pre-line'}}>{result}</blockquote>
    </main>
  </div>);
}
