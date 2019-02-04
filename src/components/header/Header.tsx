import * as React from 'react';

import { Link } from 'components/link/Link';

import Logo from 'assets/svg/logo.svg';

import s from './Header.scss';

interface IProps {
  headerRef: any;
}

export const Header = ({ headerRef }: IProps) => (
  <header
    ref={headerRef}
    className={s.header}
  >
    <div className={s.header__container}>
      <Link
        to="/"
        className={s.header__logo}
      >
        <Logo className={s.header__logoSvg} />
      </Link>
    </div>
  </header>
);
