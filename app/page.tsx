'use client';
import { useState, useEffect } from 'react'; // Corrected import
import Head from 'next/head';
import './styles/page.css';
import ProtCard from './protcard'; // Make sure the path matches your file structure

interface Protein {
  name: string;
  sequence: string;
  function_details: string;
  binding_sites: string;
  link: string;
  // Include any other properties that match your backend response
}

const Page = () => {
  const [inputValue, setInputValue] = useState('');
  const [numberValue, setNumberValue] = useState(''); // Consider starting as a string for consistency with input handling
  const [proteins, setProteins] = useState<Protein[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Directly store the value without converting to number here
    setNumberValue(value);
  };
  

  const handleExploreClick = async () => {
    if (inputValue.trim() === '') {
      alert('Please enter a protein name or sequence.');
      return;
    }
  
    // Assume numberValue is 10 if empty, and validate the range if not empty
    const numberToSend = !numberValue ? 10 : Math.min(Math.max(parseInt(numberValue, 10), 1), 50);
  
    try {
      const response = await fetch('/api/explore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          protein: inputValue,
          number: numberToSend, // Use the computed value here
        }),
      });
  
      const data = await response.json();
      setProteins(data.proteins);
      setCurrentCardIndex(0);
    } catch (error) {
      console.error('There was an error sending the protein data:', error);
    }
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % proteins.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [proteins]);

  return (
    <div className="page-container">
      <Head>
        <title>Protein Explorer</title>
        <meta name="description" content="Explore proteins and their structures" />
      </Head>
      <main className="page-main">
        <h1 className="page-title">
          Protein Explorer
        </h1>
        <p className="page-subtitle">
          Welcome to Protein Explorer. Enter the name or sequence of the protein you want to explore and how many similar proteins you would like to see below.
        </p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter protein name or sequence"
            className="page-input"
            value={inputValue}
            onChange={handleInputChange}
          />
          <input
            type="text" // Change to text to remove the native number input functionality
            placeholder="10"
            inputMode="numeric" // This will still bring up the numeric keypad on mobile devices
            pattern="[0-9]*" // This pattern restricts the input to numbers only
            className="number-input"
            value={numberValue}
            onChange={handleNumberChange}
            min="1"
            max="50"
          />
          <button className="explore-button" onClick={handleExploreClick}>
            Explore
          </button>
        </div>
        <div className="prot-cards-container">
          {proteins.length > 0 && (
            <ProtCard
              name={proteins[currentCardIndex].name}
              sequence={proteins[currentCardIndex].sequence}
              function_details={proteins[currentCardIndex].function_details}
              binding_sites={proteins[currentCardIndex].binding_sites}
              link={proteins[currentCardIndex].link}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
