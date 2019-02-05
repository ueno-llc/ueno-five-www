import * as React from 'react';

import Logo from 'assets/svg/logo.svg';

import s from './Intro.scss';

interface IBackground {
  left: {
    color: string;
    image?: string;
  };

  right: {
    color: string;
    image?: string;
  };
}

interface IProps {
  children: React.ReactNode;
  introRef: any;
  background: IBackground;
  rightImage: React.ReactNode;
}

export const Intro = ({ children, introRef, background, rightImage }: IProps) => {
  return (
    <div
      ref={introRef}
      className={s.intro}
      style={{ backgroundColor: background.left.color }}
    >
      <div className={s.intro__borders}>
        <div
          className={s.intro__top}
          style={{ backgroundColor: background.left.color }}
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
          className={s.intro__imageRight}
          style={{ backgroundColor: background.right.color }}
        >
          {rightImage}
        </div>

        {background.left.image && (
          <img
            className={s.intro__imageLeft}
            src={background.left.image}
          />
        )}
      </div>
    </div>
  );
};
