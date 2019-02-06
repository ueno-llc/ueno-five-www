import * as React from 'react';

import { useResize } from 'hooks/use-resize';

import Logo from 'assets/svg/logo.svg';

import s from './Intro.scss';

interface IRight {
  color: string;
  imagePosition: string;
  image: string;
  image2x: string;
}

interface IProps {
  children: React.ReactNode;
  introRef: any;
  left?: string;
  right: IRight;
}

export const Intro = ({ children, introRef, left, right }: IProps) => {
  const [isMobile] = useResize();

  return (
    <div
      ref={introRef}
      className={s.intro}
    >
      <div className={s.intro__borders}>
        <div className={s.intro__top}>
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
          className={s(s.intro__imageRight, { isMobile })}
          style={{ backgroundColor: right.color }}
        >
          {!isMobile && (
            <img
              className={s(s.intro__source, right.imagePosition)}
              src={right.image}
              srcSet={`${right.image} 1x, ${right.image2x} 2x`}
            />
          )}
        </div>

        {left && (
          <img
            className={s.intro__imageLeft}
            src={left}
          />
        )}
      </div>
    </div>
  );
};
