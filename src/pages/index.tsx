import * as React from 'react';
import Helmet from 'react-helmet';
import { TimelineLite, Power4 } from 'gsap';

import { shareTwitter } from 'utils/share-twitter';
import { Intro } from 'components/intro/Intro';
import { Content } from 'components/content/Content';
import { Video } from 'components/video/Video';

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

  const states = [
    {
      id: 'opening',

      leftSide: {
        heading: 'Introducing',
        subheading: 'Tory Satins (and friends)',
        image: require('assets/images/flower.jpg'),

        buttons: [
          { text: 'Show me!', action: onClick },
        ],
      },

      rightSide: {
        color: '#ed8781',
        imagePosition: 'center',
        image: require('assets/images/cover.jpg'),
        image2x: require('assets/images/cover@2x.jpg'),
      },
    },
    {
      id: 'closing',

      leftSide: {
        heading: 'You have been Satined',
        subheading: 'Hope you liked it',

        buttons: [
          { text: 'Watch again', action: onClick, color: 'pink' },
          { text: 'Share on Twitter', action: () => shareTwitter() },
        ],
      },

      rightSide: {
        color: '#eb6a64',
        imagePosition: 'bottom',
        image: require('assets/images/tory.jpg'),
        image2x: require('assets/images/tory@2x.jpg'),
      },
    },
  ];

  const active = states.find((s) => s.id === screen)!;

  return (
    <>
      <Helmet title="Tory Satins and friends" />

      <Intro
        introRef={introRef}
        left={active.leftSide.image}
        right={{ ...active.rightSide }}
      >
        <Content
          heading={active.leftSide.heading}
          subheading={active.leftSide.subheading}
          buttons={active.leftSide.buttons}
        />
      </Intro>

      {play && (
        <Video
          // src={require('assets/videos/song.mp4')}
          src="https://cdn.ueno.co/song.mp4"
          // srcMobile={require('assets/videos/song_480.mp4')}
          srcMobile="https://cdn.ueno.co/song_480.mp4"
          poster={require('assets/images/poster.jpg')}
          subtitles={require('subs/subs.json')}
          subtitlesMobile={require('subs/subs-mobile.json')}
          onVideoEnd={onVideoEnd}
        />
      )}
    </>
  );
};
