'use client';
import { useState, useEffect } from 'react'; // Corrected import
import Head from 'next/head';
import './styles/page.css';
import ProtCardCarousel from './protcardCarrousel';
import { Protein } from './types';
import funcEmbeddings from './data/func_embeddings_reduced.json';
import seqEmbeddings from './data/seq_embeddings_reduced.json';
import dynamic from 'next/dynamic';

// Dynamically import UmapVisualization with SSR turned off
const UmapVisualization = dynamic(() => import('./umap'), {
  ssr: false  // Disable server-side rendering for this component
});

const Page = () => {
  const [inputValue, setInputValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [proteins, setProteins] = useState<Protein[]>([]);
  const [exploreUniqueEntryIds, setExploreUniqueEntryIds] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    setInputValue(textarea.value);
  
    // Reset the height to 'auto' to calculate the scrollHeight correctly
    textarea.style.height = 'auto';
  
    // Only adjust the height if the scrollHeight is greater than the clientHeight
    if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberValue(e.target.value);
  };

  const handleNumberBlur = () => {
    const numValue = parseInt(numberValue, 10);
    if (isNaN(numValue) || numValue < 10 || numValue > 50) {
      alert('Out of range input. Please enter a number between 10 and 50.');
      setNumberValue('');
    }
  };

  const handleExploreClick = async () => {
    if (inputValue.trim() === '') {
      alert('Please enter a protein name or sequence.');
      return;
    }
  
    const numberToSend = parseInt(numberValue, 10);
    if (isNaN(numberToSend) || numberToSend < 10 || numberToSend > 50) {
      alert('Out of range input. Please enter a valid number between 10 and 50.');
      return;
    }
  
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('http://127.0.0.1:5000/process_input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function: inputValue,
          number: numberToSend,
          exploreUniqueEntryIds: exploreUniqueEntryIds,
        }),
      });
  
      const data = await response.json();
      setTags(data.tags);
      setProteins(data.similar_proteins);
    } catch (error) {
      console.error('There was an error sending the protein data:', error);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };  

  return (
    <div className="page-container">
      <Head>
        <title>Protein Explorer</title>
        <meta name="description" content="Explore proteins and their structures" />
      </Head>
      <main className="page-main">
        <div className="explore-section">
          <h1 className="page-title">Protein Explorer</h1>
          <p className="page-subtitle">
            Welcome to Protein Explorer. Enter the function description of the protein you want to explore below.
          </p>

          <div className="input-container">
            <textarea
              placeholder="Enter protein function description"
              className="page-input"
              value={inputValue}
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="10"
              className="number-input"
              value={numberValue}
              onChange={handleNumberChange}
              onBlur={handleNumberBlur}
              min="10"
              max="50"
            />
            <button
              className="explore-button"
              onClick={handleExploreClick}
              disabled={isLoading} // The button will be disabled when isLoading is true
            >
              Explore
            </button>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="explore-same-entry-ids-checkbox"
              className="explore-same-entry-ids-checkbox"
              checked={exploreUniqueEntryIds}
              onChange={() => setExploreUniqueEntryIds(!exploreUniqueEntryIds)}
            />
            <label htmlFor="explore-same-entry-ids-checkbox">Explore unique entry IDs</label>
            <div className="info-icon" tabIndex={0}>
              <img src="info-2.svg" alt="Info" width="18" height="18" />
              <span className="tooltip-text">Select to receive a list of distinct protein structures. Deselect to include multiple components or variations of the same protein.</span>
            </div>
          </div>
          {isLoading && (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          )}
          {tags.length > 0 && (
          <div className="section-subtitle">
            <p className="section-subtitle-text">Predicted MONDO Annotations</p>
          </div>
          )}
          <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          {proteins.length > 0 && (
            <div className="section-subtitle">
              <p className="section-subtitle-text">Similar Proteins</p>
            </div>
          )}
          <div className="carousel">
            {proteins.length > 0 && (
              <ProtCardCarousel proteins={proteins} />
            )}
          </div>
        </div>
        <div className="embeddings-section">
        <div className="section-subtitle">
              <p className="section-subtitle-text">Protein Embeddings</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <UmapVisualization
            embedding1={funcEmbeddings}
            embedding2={seqEmbeddings}
          />
        </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
