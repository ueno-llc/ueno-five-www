import React from 'react';
import Helmet from 'react-helmet';

import { Devtools } from 'components/devtools/Devtools';

import s from './AppLayout.scss';

interface IProps {
  children: React.ReactNode;
}

export default ({ children }: IProps) => (
  <div className={s.layout}>
    <Helmet
      title="Ueno starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <html lang="en" />
    </Helmet>

    {children}
    <Devtools />
  </div>
);
