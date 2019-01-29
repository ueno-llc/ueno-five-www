import * as React from 'react';

import { Link } from 'components/link/Link';

import Logo from 'assets/svg/logo.svg';

import s from './Wrapper.scss';

interface IProps {
  children?: React.ReactNode;
}

export const Wrapper = ({ children }: IProps) => (
  <div className={s.wrapper}>
    <header className={s.wrapper__header}>
      <div className={s.wrapper__container}>
        <div className={s.wrapper__content}>
          <Link
            to="/"
            className={s.wrapper__logo}
          >
            <Logo className={s.wrapper__logoSvg} />
          </Link>

          <div className={s.wrapper__navigation}>
            {children}
          </div>
        </div>
      </div>
    </header>

    <div className={s.wrapper__bottom} />
  </div>
);
