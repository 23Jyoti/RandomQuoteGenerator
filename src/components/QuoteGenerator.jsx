import React, { useState, useEffect } from 'react';
import '../App.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(''); // State to store the selected theme

  const fetchQuote = (theme = '') => {
    setIsLoading(true);
    const url = theme ? `https://api.quotable.io/random?tags=${theme}` : 'https://api.quotable.io/random';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setQuote(data.content);
        setAuthor(data.author);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote(theme);
  };

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
    fetchQuote(newTheme);
  };

  const handleSpeech = () => {
    const synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);
    synth.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
  };

  const handleTwitter = () => {
    let tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
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
            <li className="twitter" onClick={handleTwitter}><i className="fab fa-twitter"></i></li>
            <li className="filter">
              <select onChange={handleThemeChange} value={theme}>
                <option value="">All</option>
                <option value="inspirational">Inspirational</option>
                <option value="wisdom">Wisdom</option>
                <option value="love">Love</option>
                {/* Add more themes as needed */}
              </select>
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
