/* eslint-disable quotes */
import React from 'react';

type Props = {

};

const SONGS = [
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
    name: 'Lady Gaga ft. Elton John - Sine from Above',
    path: '/sine-from-above.mp3',
  },
  {
    name: 'Dua Lipa - Hallucinate',
    path: '/hallucinate.mp3',
  },
];

export const SelectSong: React.FC<Props> = ({

}) => (
  <div>
    <select>
      {
        SONGS.map(song => (
          <option key={song.path} value={song.path}>{song.name}</option>
        ))
      }
    </select>
  </div>
);
