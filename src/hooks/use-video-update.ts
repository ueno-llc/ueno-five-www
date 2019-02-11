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
    const video = ref.current;

    if (!video) {
      return;
    }

    video.addEventListener('timeupdate', onUpdate);
    video.addEventListener('pause', onUpdate);

    return () => {
      if (!video) {
        return;
      }

      video.removeEventListener('timeupdate', onUpdate);
      video.addEventListener('pause', onUpdate);
    };
  }, []);

  return {
    currentTime,
    duration,
    paused,
  };
};
