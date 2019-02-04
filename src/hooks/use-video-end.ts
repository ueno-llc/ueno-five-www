import * as React from 'react';

export const useVideoEnd = (ref: React.RefObject<HTMLVideoElement>) => {
  const [end, setEnd] = React.useState<boolean>(false);

  const onEnd = () => {
    if (!ref.current) {
      return;
    }

    setEnd(true);
  };

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener('ended', onEnd);

    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.removeEventListener('ended', onEnd);
    };
  });

  return end;
};
