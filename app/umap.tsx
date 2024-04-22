import React from 'react';
import Plot from 'react-plotly.js';

// Assuming the props type has been defined as follows:
// (Make sure the type definition matches your actual data structure)
type Embedding = Array<[number, number] | number[]>;

interface UmapVisualizationProps {
  embedding1: Embedding;
  embedding2: Embedding;
}

const UmapVisualization: React.FC<UmapVisualizationProps> = ({ embedding1, embedding2 }) => {
  return (
    <Plot
      data={[
        {
          x: embedding1.map(point => point[0]), // UMAP 1st dimension
          y: embedding1.map(point => point[1]), // UMAP 2nd dimension
          type: 'scattergl', // Use WebGL rendering for performance improvement
          mode: 'markers',
          name: 'Function Embeddings',
          marker: { size: 8, opacity: 0.8, line: { width: 0.5, color: 'DarkSlateGrey' } },
        },
        {
          x: embedding2.map(point => point[0]), // UMAP 1st dimension
          y: embedding2.map(point => point[1]), // UMAP 2nd dimension
          type: 'scattergl', // Use WebGL rendering for performance improvement
          mode: 'markers',
          name: 'Sequence Embeddings',
          marker: { size: 8, opacity: 0.8, line: { width: 0.5, color: 'DarkSlateGrey' } },
        }
      ]}
      layout={{
        title: 'UMAP Projection of Function and Sequence Embeddings',
        xaxis: { title: 'UMAP Dimension 1' },
        yaxis: { title: 'UMAP Dimension 2' },
        legend: { yanchor: "top", y: 0.99, xanchor: "left", x: 0.01 }
      }}
    />
  );
};

export default UmapVisualization;
