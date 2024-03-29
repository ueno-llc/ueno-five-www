import * as React from 'react';
import Helmet from 'react-helmet';

import { helmet } from 'utils/helmet';
import { Devtools } from 'components/devtools/Devtools';

import s from './AppLayout.scss';

interface IAppLayoutProps {
  children: React.ReactNode;
}

const isDev = process.env.NODE_ENV === 'development';

export default ({ children }: IAppLayoutProps) => {
  const onTouchMove = (e: TouchEvent) => e.preventDefault();

  React.useEffect(() => {
    document.addEventListener('touchmove', onTouchMove);
    return () => document.removeEventListener('touchmove', onTouchMove);
  }, []);

  return (
    <div className={s.layout}>
      <Helmet {...helmet} />
      {children}
      {isDev && <Devtools />}
    </div>
  );
}
