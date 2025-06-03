import React, { useState, useEffect } from 'react';
import quotesData from '../quotes.json';
import '../App.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    const getRandomLocalQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    return quotesData[randomIndex];
  };
    const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/quote'); 
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (data && data.length > 0) {
        setQuote(data[0].q || 'No quote content');
        setAuthor(data[0].a || 'Unknown');
      } else {
        const fallbackQuote = getRandomLocalQuote();
        setQuote(fallbackQuote.q);
        setAuthor(fallbackQuote.a);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      const fallbackQuote = getRandomLocalQuote();
      setQuote(fallbackQuote.q);
      setAuthor(fallbackQuote.a);
    } finally {
      setIsLoading(false);
    }
  };


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
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${quote} - ${author}`
    )}`;
    window.open(tweetUrl, "_blank");
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="wrapper">
      <header>Quote of the Day</header>
      <div className="content">
        <div className="quote-area">
          <i className="fas fa-quote-left"></i>
          <p style={{ wordBreak: "keep-all", whiteSpace: "normal", overflowWrap: "break-word" }}>{quote}</p>
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
            <li className="speech" onClick={handleSpeech}>
              <i className="fas fa-volume-up"></i>
            </li>
            <li className="copy" onClick={handleCopy}>
              <i className="fas fa-copy"></i>
            </li>
            <li className="twitter" onClick={handleTwitter}>
              <i className="fab fa-twitter"></i>
            </li>
          </ul>
          <button onClick={handleNewQuote} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'New Quote'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
