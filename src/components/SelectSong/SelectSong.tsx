/* eslint-disable quotes */
import React from 'react';

type Props = {
  onChange: (song: Song) => void;
  song: Song;
};

type Song = {
  name: string;
  path: string;
};

export const SONGS: Song[] = [
  {
    name: 'Lady Gaga ft. Elton John - Sine from Above',
    path: '/sine-from-above.mp3',
  },
  {
    name: `CamelPhat - Rabbit Hole`,
    path: '/rabbit-hole.mp3',
  },
  {
    name: 'Habstrakt & Marten Hørger - Ya Think',
    path: '/ya-think.mp3',
  },
  {
    name: `Clean Bandit - Mozart's House`,
    path: '/mozarts-house.mp3',
  },
  {
    name: 'Sleepy Tom - Pusher',
    path: '/pusher.mp3',
  },
  {
    name: 'Matroda - You Can',
    path: '/you-can.mp3',
  },
  {
    name: 'Baauer - MAGIC',
    path: '/magic.mp3',
  },
  {
    name: 'Dua Lipa - Hallucinate',
    path: '/hallucinate.mp3',
  },
];

export const SelectSong: React.FC<Props> = ({ onChange, song, }) => (
  <div className="flex flex-col items-center space-y-3">
    <label htmlFor="select-song">Select a song</label>
    <select
      id="select-song"
      className="bg-transparent p-3 text-center"
      style={{
        appearance: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
      }}
      onChange={e => onChange(SONGS.find(s => s.path === e.currentTarget.value)!)}
      placeholder={song.name}
    >
      { SONGS.map(opt => (<option key={opt.path} value={opt.path}>{opt.name}</option>)) }
    </select>
  </div>
);
