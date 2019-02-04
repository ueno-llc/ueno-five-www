import React, { useRef, useEffect } from 'react';
import subs from 'subs/subs.json';

interface ISubtitle {
  start: number;
  end: number;
  part: string;
}

export default () => {
  const audioRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = React.useState(0);

  useEffect(() => {
    const audioEl = audioRef.current;

    const update = () => {
      if (audioEl) {
        setCurrentTime(audioEl.currentTime * 1000);
      }
    };

    if (audioEl) {
      audioEl.addEventListener('timeupdate', update);
    }

    return function cleanup() {
      if (audioEl) {
        audioEl.removeEventListener('timeupdate', update);
      }
    }
  });

  console.log(subs);

  const limit = 3000;

  return (
    <>
      <video controls src={require('assets/videos/song.mp4')} ref={audioRef} />
      <p>{currentTime}</p>
      <p>
        Current:
        {subs.map(({ start, end, part }: ISubtitle) => {
          const inRange = currentTime >= start - limit && currentTime <= end + limit;

          if (!inRange) {
            return null;
          }

          const isCurrent = currentTime >= start && currentTime <= end;

          return (
            <span style={isCurrent ? { backgroundColor: 'pink' } : {}}>{part} </span>
          );
        })}
      </p>
      <ul>
        {subs.map(({ start, end, part }: ISubtitle) => {
          const isCurrent = currentTime >= start && currentTime <= end;
          return (
            <li style={isCurrent ? { backgroundColor: 'pink' } : {}}>{start}–{end}: {part}</li>
          );
        })}
      </ul>
    </>
  );
}
