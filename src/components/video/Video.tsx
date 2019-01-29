import * as React from 'react';

import s from './Video.scss';

export const Video = () => (
  <div className={s.video}>
    <img src={require('assets/images/video.png')} />
  </div>
);
