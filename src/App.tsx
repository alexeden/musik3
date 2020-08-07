import React from 'react';
import './App.css';
import MusikControls from './components/MusikControls';
import MusikCanvas from './components/MusikCanvas';

export const App: React.FC = () => (
  <>
    <MusikControls />
    <MusikCanvas />
  </>
);
