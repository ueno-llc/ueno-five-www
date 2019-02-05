import * as React from 'react';

export const useResize = () => {
  const [windowWidth, setWidth] = React.useState<number>(0);
  const [windowHeight, setHeight] = React.useState<number>(0);
  const [mobile, setMobile] = React.useState<boolean>(false);

  const onResize = () => {
    if (typeof window === undefined) {
      return;
    }

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setMobile(window.matchMedia('(max-width: 767px)').matches);
  };

  React.useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return [
    mobile,
    windowWidth,
    windowHeight,
  ];
};
