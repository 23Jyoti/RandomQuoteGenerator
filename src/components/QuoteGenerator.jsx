import React, { useState, useEffect } from 'react';
import '../App.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = () => {
    setIsLoading(true);

    const apiURL = 'https://zenquotes.io/api/random';
    const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(apiURL)}`;

    fetch(proxyURL)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
      })
      .then(data => {
        try {
          const parsed = JSON.parse(data.contents);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].q && parsed[0].a) {
            setQuote(parsed[0].q);
            setAuthor(parsed[0].a);
          } else {
            throw new Error("Unexpected quote structure");
          }
        } catch (err) {
          console.error("Error parsing quote:", err);
          setQuote("Could not load quote.");
          setAuthor("");
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching quote:", error);
        setQuote("Failed to fetch quote.");
        setAuthor("");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
  };

  const handleSpeech = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);
    synth.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
  };

  const handleTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="wrapper">
      <header>Quote of the Day</header>
      <div className="content">
        <div className="quote-area">
          <i className="fas fa-quote-left"></i>
          <p className="quote">{quote}</p>
          <i className="fas fa-quote-right"></i>
        </div>
        <div className="author">
          <span>__</span>
          <span className="name">{author}</span>
        </div>
      </div>
      <div className="buttons">
        <div className="features">
          <ul>
            <li className="speech" onClick={handleSpeech}><i className="fas fa-volume-up"></i></li>
            <li className="copy" onClick={handleCopy}><i className="fas fa-copy"></i></li>
            <li cl
