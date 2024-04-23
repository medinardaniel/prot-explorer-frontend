import React from 'react';
import Plot from 'react-plotly.js';

// Assuming the props type has been defined as follows:
// (Make sure the type definition matches your actual data structure)
type Embedding = Array<[number, number] | number[]>;

interface UmapVisualizationProps {
  protBertEmbeddings: Embedding;
  gistEmbeddings: Embedding;
  esmEmbeddings: Embedding;
}

const UmapVisualization: React.FC<UmapVisualizationProps> = ({
  protBertEmbeddings,
  gistEmbeddings,
  esmEmbeddings
}) => {
  return (
    <Plot
      data={[
        {
          x: protBertEmbeddings.map(point => point[0]), // UMAP 1st dimension
          y: protBertEmbeddings.map(point => point[1]), // UMAP 2nd dimension
          type: 'scattergl', // Use WebGL rendering for performance improvement
          mode: 'markers',
          name: 'ProtBert Embeddings',
          marker: { size: 8, opacity: 0.8, line: { width: 0.5, color: 'DarkSlateGrey' } },
        },
        {
          x: gistEmbeddings.map(point => point[0]), // UMAP 1st dimension
          y: gistEmbeddings.map(point => point[1]), // UMAP 2nd dimension
          type: 'scattergl',
          mode: 'markers',
          name: 'GIST Embeddings',
          marker: { size: 8, opacity: 0.8, line: { width: 0.5, color: 'DarkSlateGrey' } },
        },
        {
          x: esmEmbeddings.map(point => point[0]), // UMAP 1st dimension
          y: esmEmbeddings.map(point => point[1]), // UMAP 2nd dimension
          type: 'scattergl',
          mode: 'markers',
          name: 'ESM Embeddings',
          marker: { size: 8, opacity: 0.8, line: { width: 0.5, color: 'DarkSlateGrey' } },
        }
      ]}
      layout={{
        title: 'UMAP Projection of Protein Embeddings',
        xaxis: { title: 'UMAP Dimension 1' },
        yaxis: { title: 'UMAP Dimension 2' },
        legend: { yanchor: "top", y: 0.99, xanchor: "left", x: 0.01 }
      }}
    />
  );
};

export default UmapVisualization;
