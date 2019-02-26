import * as React from 'react';
import Helmet from 'react-helmet';

import { helmet } from 'utils/helmet';
import { Devtools } from 'components/devtools/Devtools';

import s from './AppLayout.scss';

interface IProps {
  children: React.ReactNode;
}

export default ({ children }: IProps) => {
  /*
  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    document.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, []);
  */

  return (
    <div className={s.layout}>
      <Helmet {...helmet} />

      {children}

      {process.env.NODE_ENV === 'development' && (
        <Devtools />
      )}
    </div>
  );
};
