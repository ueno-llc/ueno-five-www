import * as React from 'react';

import s from './Intro.scss';

interface IProps {
  children: React.ReactNode;
  cover: string;
  cover2x: string;
  backgroundColor: string;
  introRef: any;
}

export const Intro = ({ children, cover, cover2x, backgroundColor, introRef }: IProps) => {
  const srcSet = cover2x && `${cover} 1x, ${cover2x} 2x`;

  return (
    <div
      ref={introRef}
      className={s.intro}
    >
      <div className={s.intro__borders}>
        <div className={s.intro__bottom} />
      </div>

      <div className={s.intro__container}>
        <div className={s.intro__row}>
          {children}
        </div>

        <div
          className={s.intro__illustration}
          style={{ backgroundColor }}
        >
          <img
            src={cover}
            srcSet={srcSet}
          />
        </div>
      </div>
    </div>
  );
}
