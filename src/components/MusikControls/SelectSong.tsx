/* eslint-disable quotes */
import React, { useRef, useMemo, } from 'react';
import { createUseStyles, } from 'react-jss';
import { Song, } from './types';
import { SONGS, } from './constants';

type Props = {
  onChange: (song: Song) => void;
  value: Song;
};

export const SelectSong: React.FC<Props> = ({ onChange, value, }) => {
  const styles = useStyles();
  const selectRef = useRef<HTMLSelectElement | null>(null);
  ((window as any).selectRef = selectRef);

  const options = useMemo(() => {
    const songNames = SONGS.map(s => s.name);
    // If the selected song isn't in `SONGS`, then it's a user upload and needs to be added
    // to the list of song options
    const songIsUserAdded = !songNames.includes(value.name);
    const songs = songIsUserAdded ? [ value, ...SONGS, ] : SONGS;
    return songs.map(s => (
      <option key={s.name} value={s.name} >
        {songIsUserAdded ? s.name : `${s.artist} - ${s.name}`}
      </option>
    ));
  }, [ value, ]);

  return (
    <>
      <label htmlFor="select-song">Select a song</label>
      <select
        className={styles.selectInput}
        id="select-song"
        name="select-song"
        onChange={e => onChange(SONGS.find(s => s.name === e.currentTarget.value)!)}
        placeholder={value.name}
        ref={selectRef}
        value={value.name}
        // value="2"
      >
        {options}
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
    maxWidth: 'calc(100vw - 8rem)',
    width: '300px',

    '&:hover': {
      backdropFilter: 'saturate(50) hue-rotate(-20deg)',
      boxShadow: '0px 0px 1rem 1px rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },

    '&:active': {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  },
});
