import * as React from 'react';
import Helmet from 'react-helmet';
import { TimelineLite, Power4 } from 'gsap';

import { Intro } from 'components/intro/Intro';
import { Content } from 'components/intro/Content';
import { Video } from 'components/video/Video';

const Cover = () => (
  <img
    style={{ padding: 60 }}
    src={require('assets/images/cover.png')}
    srcSet={`${require('assets/images/cover.png')} 1x, ${require('assets/images/cover@2x.png')} 2x`}
  />
);

const Tory = () => (
  <img
    style={{ alignSelf: 'flex-end', height: '80%', objectFit: 'cover' }}
    src={require('assets/images/tory.png')}
    srcSet={`${require('assets/images/tory.png')} 1x, ${require('assets/images/tory@2x.png')} 2x`}
  />
);

export default () => {
  const introRef = React.useRef<React.ReactNode>(null);
  const [play, playVideo] = React.useState(false);
  const [screen, setScreen] = React.useState('opening');
  const timeline = new TimelineLite();

  const onClick = () => {
    if (!introRef.current) {
      return;
    }

    timeline.to(
      introRef.current,
      0.75,
      {
        autoAlpha: 0,
        ease: Power4.easeInOut,
      },
    );

    playVideo(true);
  };

  const onVideoEnd = () => {
    if (!introRef.current) {
      return;
    }

    setScreen('closing');
    playVideo(false);

    timeline.to(
      introRef.current,
      0.75,
      {
        autoAlpha: 1,
        ease: Power4.easeInOut,
      },
    );
  };

  const onReplay = () => {
    onClick();
  };

  const onTwitterShare = () => {
    const title = 'Introducing Tory Satins (and friends)';
    const description = 'Ueno is turning 5, we made a music for that special moment!';
    const href = 'https://5.ueno.co';
    const twitter = 'uenodotco';

    const popupConfig = 'left=0,top=0,width=626,height=436,personalbar=0,toolbar=0,scrollbars=0,resizable=0';
    const concat = `${title} — ${description} ${href}`;
    const res = `https://twitter.com/intent/tweet?text=${encodeURIComponent(concat)}&via=${encodeURIComponent(twitter)}`;

    return window.open(res, '', popupConfig);
  };

  const states = [
    {
      id: 'opening',
      background: {
        left: '#002430',
        right: '#4051b6',
      },
      image: <Cover />,
      heading: {
        text: 'Introducing',
        color: '#fff',
      },
      subheading: {
        text: 'Tory Satins (and friends)',
        color: '#abb4c2',
      },
      buttons: [
        { text: 'Show me!', action: onClick },
      ],
    },
    {
      id: 'closing',
      background: {
        left: '#c99d06',
        right: '#ffc600',
      },
      image: <Tory />,
      heading: {
        text: 'That was sort of fun?',
        color: '#4d4015',
      },
      subheading: {
        text: 'Right?',
        color: '#ffc600',
      },
      buttons: [
        { text: 'Watch again', action: onReplay, color: 'yellow' },
        { text: 'Share on Twitter', action: onTwitterShare, color: 'white' },
      ],
    },
  ];

  const active = states.find((s) => s.id === screen)!;

  return (
    <>
      <Helmet title="Tory Satins and friends" />

      <Intro
        introRef={introRef}
        image={active.image}
        background={active.background}
      >
        <Content
          heading={active.heading}
          subheading={active.subheading}
          buttons={active.buttons}
        />
      </Intro>

      {play && (
        <Video
          src={require('assets/videos/song.mp4')}
          poster={require('assets/images/poster.jpg')}
          onVideoEnd={onVideoEnd}
          subtitles={require('subs/subs.json')}
        />
      )}
    </>
  );
};
