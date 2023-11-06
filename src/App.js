import React, {useEffect, useState} from 'react';
import './App.css';

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const limit = 15;

  useEffect(() => {
    if (quotes.length >= limit){
      return;
    }
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setQuotes(prevPosts => [...prevPosts, ...data]);
      })
      .catch((err) => {
        console.log(err.message);
      }, [quotes, limit])
  }, [quotes])

  const quote = quotes[Math.floor(Math.random()*limit)];

  const quoteText = quote ? quote.text : '';
  const quoteAuthor = quote ? quote.author.slice(0, -10) : '';
   
  return(
    <div className='container'>
      <h1 className='title'>Quote Generator</h1>
      <p className='quoteText'>{quoteText}</p>
      <p className='quoteAuthor'>{quoteAuthor}</p>
      <button
      className='button' 
      onClick={() => setQuotes([])}>Get New Quote</button>
    </div>
  )
}

