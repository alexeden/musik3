import React from 'react';
import './App.css';
import MusikCanvas from './components/MusikCanvas';
import MusikControls from './components/MusikControls';

export const App: React.FC = () => (
  <>
    <div style={{
      position: 'fixed', height: '100%', width: '100%', top: 0, left: 0,
    }}
    >
      <MusikCanvas />
    <MusikControls />
    </div>
  </>
);
