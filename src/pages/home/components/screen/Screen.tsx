import * as React from 'react';

import s from './Screen.scss';

interface IProps {
  children: React.ReactNode;
  illustration: string;
  backgroundColor: string;
}

export const Screen = ({ children, illustration, backgroundColor }: IProps) => (
  <div className={s.screen}>
    <div className={s.screen__row}>
      {children}
    </div>

    <div
      className={s.screen__illustration}
      style={{ backgroundColor }}
    >
      <img src={illustration} />
    </div>
  </div>
);
