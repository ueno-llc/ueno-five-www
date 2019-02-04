import * as React from 'react';

import Logo from 'assets/svg/logo.svg';

import s from './Intro.scss';

interface IBackground {
  left: string;
  right: string;
}

interface IProps {
  children: React.ReactNode;
  introRef: any;
  background: IBackground;
  image: React.ReactNode;
}

export const Intro = ({ children, introRef, background, image }: IProps) => {
  return (
    <div
      ref={introRef}
      className={s.intro}
      style={{ backgroundColor: background.left }}
    >
      <div className={s.intro__borders}>
        <div
          className={s.intro__top}
          style={{ backgroundColor: background.left }}
        >
          <div className={s.intro__topContainer}>
            <Logo className={s.intro__logo} />
          </div>
        </div>

        <div className={s.intro__bottom} />
      </div>

      <div className={s.intro__container}>
        <div className={s.intro__row}>
          {children}
        </div>

        <div
          className={s.intro__illustration}
          style={{ backgroundColor: background.right }}
        >
          {image}
        </div>
      </div>
    </div>
  );
};
