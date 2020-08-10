import React, { useRef, } from 'react';

type Props = {
  onChange: (audioEl: HTMLAudioElement) => void;
};

export const UploadAudio: React.FC<Props> = ({
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileSelect = (path: string) => {
    const [ file, ] = inputRef.current?.files ?? [];
    const audioEl = document.createElement('audio');
    audioEl.src = URL.createObjectURL(file);
    onChange(audioEl);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <label htmlFor="upload-audio">Upload your own audio</label>
      <input
        accept="audio/*"
        ref={inputRef}
        type="file"
        id="upload-audio"
        name="upload-audio"
        className="bg-transparent p-3"
        multiple={false}
        onChange={e => onFileSelect(e.currentTarget.value)}
        style={{
          appearance: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};
