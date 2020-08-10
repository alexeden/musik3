import React, { useRef, } from 'react';
import { createUseStyles, } from 'react-jss';
import { Song, } from './types';

type Props = {
  onChange: (song: Song) => void;
};

export const UploadAudio: React.FC<Props> = ({
  onChange,
}) => {
  const styles = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileSelect = () => {
    const [ file, ] = inputRef.current?.files ?? [];

    file && onChange({
      name: file.name,
      artist: 'USER',
      path: URL.createObjectURL(file),
    });
  };

  return (
    <>
      <button className={styles.uploadButton} onClick={() => inputRef.current?.click()}>
        Or upload your own
      </button>
      <input
        accept="audio/*"
        className="hidden"
        id="upload-audio"
        multiple={false}
        name="upload-audio"
        onChange={onFileSelect}
        placeholder=""
        ref={inputRef}
        type="file"
        value=""
      />
    </>
  );
};

const useStyles = createUseStyles({
  uploadButton: {
    composes: [ 'p-2', ],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0px 0px 0.5rem 1px rgba(255, 255, 255, 0.2)',

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
