import * as React from 'react';

export const useVideoUpdate = (ref: React.RefObject<HTMLVideoElement>) => {
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [paused, setPaused] = React.useState<boolean>(true);

  const onUpdate = () => {
    if (!ref.current) {
      return;
    }

    setCurrentTime(ref.current.currentTime);
    setDuration(ref.current.duration);
    setPaused(ref.current.paused);
  };

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener('timeupdate', onUpdate);
    ref.current.addEventListener('pause', onUpdate);

    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.removeEventListener('timeupdate', onUpdate);
      ref.current.addEventListener('pause', onUpdate);
    };
  }, []);

  return {
    currentTime,
    duration,
    paused,
  };
};
