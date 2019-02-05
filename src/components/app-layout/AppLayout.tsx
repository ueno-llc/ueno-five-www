import * as React from 'react';
import Helmet from 'react-helmet';
import shareImage from 'assets/images/share.jpg';

import { Devtools } from 'components/devtools/Devtools';

import s from './AppLayout.scss';

interface IProps {
  children: React.ReactNode;
}

const seoTitle = 'Tory Satins';
const seoDescription = 'Tory Satins - The flower of my youth.';

export default ({ children }: IProps) => (
  <div className={s.layout}>
    <Helmet
      title="Tory Satins"
      meta={[
        { property: 'og:title', content: seoTitle },
        { name: 'twitter:title', content: seoTitle },
        { name: 'description', content: seoDescription },
        { name: 'twitter:description', content: seoDescription },
        { name: 'keywords', content: 'Tory Satins, ueno' },
        { property: 'og:image', content: shareImage },
        { property: 'og:image:width', content: '1200px' },
        { property: 'og:image:height', content: '630px' },
        { property: 'og:image:alt', content: 'Troy Satins with guitar' },
        { name: 'twitter:image', content: shareImage },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@uenodotco' },
      ]}
    >
      <html lang="en" />
    </Helmet>

    {children}
    <Devtools />
  </div>
);
