/* eslint-disable quotes */
import React from 'react';
import { createUseStyles, } from 'react-jss';
import { Song, } from './types';
import { SONGS, } from './constants';

type Props = {
  onChange: (song: Song) => void;
  song: Song;
};

export const SelectSong: React.FC<Props> = ({ onChange, song, }) => {
  const styles = useStyles();

  return (
    <>
      <label htmlFor="select-song">Select a song</label>
      <select
        className={styles.selectInput}
        id="select-song"
        name="select-song"
        onChange={e => onChange(SONGS.find(s => s.path === e.currentTarget.value)!)}
        placeholder={song.name}
      >
        {SONGS.map(opt => (
          <option key={opt.path} value={opt.path}>{opt.artist} - {opt.name}</option>
        ))}
      </select>
    </>
  );
};

const useStyles = createUseStyles({
  selectInput: {
    composes: [ 'p-2', ],
    appearance: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0px 0px 0.5rem 1px rgba(255, 255, 255, 0.2)',

    '&:hover': {
      backdropFilter: 'saturate(5000) hue-rotate(-20deg)',
      boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },

    '&:active': {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  },
});
