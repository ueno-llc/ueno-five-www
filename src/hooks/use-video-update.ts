import * as React from 'react';

export const useVideoUpdate = (ref: React.RefObject<HTMLVideoElement>) => {
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [paused, setPaused] = React.useState<boolean>(true);
  const [end, setEnd] = React.useState<boolean>(false);

  const onUpdate = () => {
    if (!ref.current) {
      return;
    }

    setCurrentTime(ref.current.currentTime);
    setDuration(ref.current.duration);
    setPaused(ref.current.paused);
  };

  const onEnd = () => {
    if (!ref.current) {
      return;
    }

    setEnd(true);
  };

  React.useEffect(() => {
    const video = ref.current;

    if (!video) {
      return;
    }

    video.addEventListener('timeupdate', onUpdate);
    video.addEventListener('pause', onUpdate);
    video.addEventListener('ended', onEnd);

    return () => {
      if (!video) {
        return;
      }

      video.removeEventListener('timeupdate', onUpdate);
      video.addEventListener('pause', onUpdate);
      video.removeEventListener('ended', onEnd);
    };
  }, []);

  return {
    currentTime,
    duration,
    paused,
    end,
  };
};
