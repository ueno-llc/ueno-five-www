import * as React from 'react';

import { Link } from 'components/link/Link';

import Logo from 'assets/svg/logo.svg';

import s from './Player.scss';

interface IProps {
  children?: React.ReactNode;
}

export const Player = ({ children }: IProps) => (
  <div className={s.player}>
    <header className={s.player__header}>
      <div className={s.player__container}>
        <div className={s.player__content}>
          <Link
            to="/"
            className={s.player__logo}
          >
            <Logo className={s.player__logoSvg} />
          </Link>
        </div>
      </div>
    </header>

    {children}

    <div className={s.player__bottom} />
  </div>
);
