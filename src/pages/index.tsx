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
    src={require('assets/images/tory.jpg')}
    srcSet={`${require('assets/images/tory.jpg')} 1x, ${require('assets/images/tory@2x.jpg')} 2x`}
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

      leftSide: {
        background: {
          color: '#fea7a2',
          image: require('assets/images/flower.jpg'),
        },

        heading: {
          text: 'Introducing',
          color: '#f8faf0',
        },

        subheading: {
          text: 'Tory Satins (and friends)',
          color: '#f8faf0',
        },

        buttons: [
          { text: 'Show me!', action: onClick, color: 'white' },
        ],
      },

      rightSide: {
        background: {
          color: '#ed8781',
        },

        image: <Cover />,
      },
    },
    {
      id: 'closing',

      leftSide: {
        background: {
          color: '#fda8a3',
        },

        heading: {
          text: 'That was sort of fun?',
          color: '#f8faf0',
        },

        subheading: {
          text: 'Right?',
          color: '#f8faf0',
        },

        buttons: [
          { text: 'Watch again', action: onReplay, color: 'pink' },
          { text: 'Share on Twitter', action: onTwitterShare, color: 'white' },
        ],
      },

      rightSide: {
        background: {
          color: '#eb6a64',
        },

        image: <Tory />,
      },
    },
  ];

  const active = states.find((s) => s.id === screen)!;

  const background = {
    left: active.leftSide.background,
    right: active.rightSide.background,
  };

  return (
    <>
      <Helmet title="Tory Satins and friends" />

      <Intro
        introRef={introRef}
        rightImage={active.rightSide.image}
        background={background}
      >
        <Content
          heading={active.leftSide.heading}
          subheading={active.leftSide.subheading}
          buttons={active.leftSide.buttons}
        />
      </Intro>

      {play && (
        <Video
          src={require('assets/videos/song.mp4')}
          poster={require('assets/images/poster.jpg')}
          subtitles={require('subs/subs.json')}
          onVideoEnd={onVideoEnd}
        />
      )}
    </>
  );
};
