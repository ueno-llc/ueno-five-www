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
    };
  });

  return (
    <>
      <video controls src={require('assets/videos/song.mp4')} ref={audioRef} />
      <p>
        {subs.map((segment: Array<ISubtitle>) => {
          const first = segment[0];
          const last = segment[segment.length - 1];

          const inRange = currentTime >= first.start && currentTime <= last.end;

          if (!inRange) {
            return null;
          }

          return (
            <p>
              {segment.map(({ start, end, part}: ISubtitle) => {
                const isCurrent = currentTime >= start && currentTime <= end;

                return (
                  <span style={isCurrent ? { backgroundColor: 'pink' } : {}}>{part} </span>
                );
              })}
            </p>
          );
        })}
      </p>
    </>
  );
};
