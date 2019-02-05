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
        { name: 'theme-color', content: '#000' },
        { name: 'msapplication-navbutton-color', content: '#000' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
      ]}
    >
      <html lang="en" />
    </Helmet>

    {children}
    <Devtools />
  </div>
);
