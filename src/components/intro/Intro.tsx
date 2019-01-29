import * as React from 'react';

import s from './Intro.scss';

interface IProps {
  children: React.ReactNode;
  illustration: string;
  backgroundColor: string;
}

export const Intro = ({ children, illustration, backgroundColor }: IProps) => (
  <div className={s.intro}>
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
);
