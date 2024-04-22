// src/types.ts
export interface Protein {
    entry_id: string;
    entity_id: string;
    name: string;
    function_shortened: string; // make sure to align the property names across your application
    mondo_annotations: string[];
  }

export interface ProtCardProps {
    name: string;
    function_shortened: string; // Change this to function_shortened if you decide to use that property name
    mondo_annotations: string[];
    entry_id: string;
    entity_id: string;
  }
  