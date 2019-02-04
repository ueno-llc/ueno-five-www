import * as React from 'react';

import s from './Intro.scss';

interface IProps {
  children: React.ReactNode;
  illustration: string;
  backgroundColor: string;
  introRef: any;
}

export const Intro = ({ children, illustration, backgroundColor, introRef }: IProps) => (
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
        <img src={illustration} />
      </div>
    </div>
  </div>
);
