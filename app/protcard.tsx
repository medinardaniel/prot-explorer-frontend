// components/ProtCard.tsx
import React from 'react';
import './styles/protcard.css';

interface ProtCardProps {
  name: string;
  sequence: string;
  function_details: string;
  binding_sites: string;
  link: string;
  // Include any other props you expect from the backend
}

const ProtCard: React.FC<ProtCardProps> = ({ name, sequence, function_details, binding_sites, link }) => {
  return (
    <div className="prot-card">
      <h3>{name}</h3>
      <p>{sequence}</p>
      <p>{function_details}</p>
      <p>{binding_sites}</p>
      <p>{link}</p>
    </div>
  );
};

export default ProtCard;
