// ProtCardCarousel.tsx
import React from 'react';
import { Protein } from './types';
import './styles/protcardcarrousel.css';
import ProtCard from './protcard';

interface ProtCardCarouselProps {
    proteins: Protein[];
}

const ProtCardCarousel: React.FC<ProtCardCarouselProps> = ({ proteins }) => {
    return (
        <div className="carousel-container">
            <div className="carousel-slide">
                {proteins.map((protein, index) => (
                    <div key={index} className="prot-card-container">
                        <div className="prot-card-number">{index + 1}</div> {/* Display the index number */}
                        <ProtCard
                            name={protein.name}
                            function_shortened={protein.function_shortened}
                            mondo_annotations={protein.mondo_annotations}
                            entry_id={protein.entry_id}
                            entity_id={protein.entity_id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProtCardCarousel;
