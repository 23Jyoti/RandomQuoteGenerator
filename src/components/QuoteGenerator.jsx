import React, { useState, useEffect } from 'react';
import '../App.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quotesArray, setQuotesArray] = useState([]);

  const fetchQuotes = () => {
    setIsLoading(true);
    fetch('https://quotes.rest/qod') 
  .then(res => res.json())
  .then(data => {
    console.log(data.contents.quotes[0].quote);
    console.log(data.contents.quotes[0].author);
  })
  .catch(console.error);
  };

  const handleNewQuote = () => {
    if (quotesArray.length > 0) {
      const random = quotesArray[Math.floor(Math.random() * quotesArray.length)];
      setQuote(random.text);
      setAuthor(random.author || "Unknown");
    }
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

  useEffect(() => {
    fetchQuotes();
  }, []);

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
            <li className="twitter" onClick={handleTwitter}><i className="fab fa-twitter"></i></li>
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
