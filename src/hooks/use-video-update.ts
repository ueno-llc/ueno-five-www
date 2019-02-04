import * as React from 'react';

export const useVideoUpdate = (ref: React.RefObject<HTMLVideoElement>) => {
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);

  const onUpdate = () => {
    if (!ref.current) {
      return;
    }

    setCurrentTime(ref.current.currentTime);
    setDuration(ref.current.duration);
  };

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener('timeupdate', onUpdate);

    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.removeEventListener('timeupdate', onUpdate);
    };
  }, []);

  return {
    currentTime,
    duration,
  };
};
