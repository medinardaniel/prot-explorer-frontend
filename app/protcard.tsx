// protcard.tsx
import React, { useRef, useEffect } from 'react';
import './styles/protcard.css';
import { ProtCardProps } from './types';

const ProtCard: React.FC<ProtCardProps> = ({ name, function_shortened, mondo_annotations, entry_id, entity_id }) => {
    const cardRef = useRef<HTMLDivElement>(null);  // Typing the ref correctly

    useEffect(() => {
      const checkOverflow = () => {
        const current = cardRef.current;
        if (current) {
          const isOverflowing = current.scrollHeight > current.clientHeight;
          if (isOverflowing) {
            current.classList.add('has-overflow');
          } else {
            current.classList.remove('has-overflow');
          }
        }
      };
    
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
    }, [mondo_annotations]); // Recheck when annotations or other dependent data changes    

    return (
        <div ref={cardRef} className="prot-card">
          <div className="prot-title">
            <h3><a href={`https://www.rcsb.org/structure/${entry_id}`} target="_blank" rel="noopener noreferrer">{name}</a></h3>
          </div>
          <div className="prot-contents">
            <div className="prot-func">
              <p>{function_shortened}</p>
            </div>
            {mondo_annotations && mondo_annotations.length > 0 && (
              <div className="prot-mondo-title">
                <p>MONDO Annotations</p>
              </div>
            )}
            <div className="prot-annotations">
              {mondo_annotations.map((annotation, index) => (
                <span key={index} className="annotation-tag">{annotation}</span>
              ))}
            </div>
          </div>
        </div>
    );
};

export default ProtCard;
