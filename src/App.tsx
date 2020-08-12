import React from 'react';
import MusikCanvas from './components/MusikCanvas';
import MusikControls from './components/MusikControls';
import Waveform from './components/Waveform';

export const App: React.FC = () => (
  <>
    <MusikControls />
    <MusikCanvas />
    <Waveform />
  </>
);
