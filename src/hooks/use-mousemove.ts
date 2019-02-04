import * as React from 'react';

export const useMouseMove = (ref: React.RefObject<HTMLDivElement>) => {
  const [move, setMove] = React.useState<boolean>(false);
  let moveTimer: any;

  const onMove = () => {
    clearTimeout(moveTimer);

    moveTimer = setTimeout(() => {
      setMove(false);
    }, 400);

    setTimeout(() => {
      setMove(true);
    }, 100);
  };

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener('mousemove', onMove);

    return () => {
      if (!ref.current) {
        return;
      }

      clearTimeout(moveTimer);
      ref.current.removeEventListener('mousemove', onMove);
    };
  }, []);

  return move;
};
