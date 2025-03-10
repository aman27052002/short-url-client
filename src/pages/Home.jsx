import { useState } from "react";

const Home = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortId, setShortId] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://shorturl-821n.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setShortId(data.shortID); // Store the shortID correctly
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg w-full max-w-md"
      >
        <input
          type="url"
          placeholder="Enter a URL..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Generate Short URL
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {shortId && (
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded">
          <p className="text-lg font-semibold">Shortened URL:</p>
          <a
            href={`https://shorturl-821n.onrender.com/${shortId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://shorturl-821n.onrender.com/{shortId}
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
