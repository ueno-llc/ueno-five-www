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

interface IIntroProps {
  children: React.ReactNode;
  left?: string;
  right: IRight;
  introRef: React.RefObject<any>;
  topRef: React.RefObject<any>;
  rightRef: React.RefObject<any>;
  bottomRef: React.RefObject<any>;
  leftRef: React.RefObject<any>;
}

export const Intro = ({ children, left, right, introRef, topRef, rightRef, bottomRef, leftRef }: IIntroProps) => {
  const { isMobile } = useResize();
  const buttonCount = children ? (children as any).props.buttons.length : 0;

  return (
    <div
      ref={introRef}
      className={s(s.intro, { ['hasTwoButtons']: buttonCount > 1 })}
    >
      <div className={s.intro__top} ref={topRef}>
        <div className={s.intro__topContainer}>
          <a href="https://ueno.co/" className={s.intro__link}>
            <Logo className={s.intro__logo} />
          </a>
        </div>
      </div>

      <div className={s.intro__right} ref={rightRef} />
      <div className={s.intro__bottom} ref={bottomRef} />
      <div className={s.intro__left} ref={leftRef} />

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
