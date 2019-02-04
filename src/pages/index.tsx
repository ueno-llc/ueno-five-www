import * as React from 'react';
import Helmet from 'react-helmet';
import { TimelineLite, Power4 } from 'gsap';

import { Header } from 'components/header/Header';
import { Intro } from 'components/intro/Intro';
import { Content } from 'components/intro/Content';
import { Video } from 'components/video/Video';

export default () => {
  const headerRef = React.useRef<React.ReactNode>(null);
  const introRef = React.useRef<React.ReactNode>(null);
  const [play, playVideo] = React.useState(false);

  const onClick = () => {
    if (!introRef.current || !headerRef.current) {
      return;
    }

    const timeline = new TimelineLite();
    const ease = Power4.easeInOut;

    timeline.to(
      introRef.current,
      0.75,
      {
        autoAlpha: 0,
        ease,
      },
    );

    timeline.to(
      headerRef.current,
      0.75,
      {
        autoAlpha: 0,
        ease,
      },
      '-=1',
    );

    playVideo(true);
  };

  return (
    <>
      <Helmet title="Home" />
      <Header headerRef={headerRef} />

      <Intro
        introRef={introRef}
        illustration={require('assets/images/illustration.png')}
        backgroundColor="#4051b6"
      >
        <Content
          heading="Introducing"
          subheading="Tory Satins (and friends)"
          button={{
            text: 'Show me!',
            action: onClick,
          }}
        />
      </Intro>

      <Video
        src={require('assets/videos/song.mp4')}
        poster={require('assets/images/poster.jpg')}
        play={play}
      />
    </>
  );
};
