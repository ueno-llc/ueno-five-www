import React, { useRef, useEffect } from 'react';

// @ts-ignore
import subs from 'subs/subs.json';

interface ISubtitle {
  start: number;
  end: number;
  part: string;
}

export default () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

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
        {subs.map((segment: ISubtitle[], index: number) => {
          const first = segment[0];
          const last = segment[segment.length - 1];

          const inRange = currentTime >= first.start && currentTime <= last.end;

          if (!inRange) {
            return null;
          }

          return (
            <p key={index}>
              {segment.map(({ start, end, part}: ISubtitle, i: number) => {
                const isCurrent = currentTime >= start && currentTime <= end;

                return (
                  <span key={i} style={isCurrent ? { backgroundColor: 'pink' } : {}}>{part} </span>
                );
              })}
            </p>
          );
        })}
      </p>
    </>
  );
};
