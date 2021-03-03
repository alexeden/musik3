import React from 'react';
import MusikCanvas from './components/MusikCanvas';
import MusikControls from './components/MusikControls';

export const App: React.FC = () => (
  <>
    <MusikControls />
    <MusikCanvas />
  </>
);
