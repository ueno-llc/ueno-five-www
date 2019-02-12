import * as React from 'react';
import Helmet from 'react-helmet';
import { TimelineLite, Power4 } from 'gsap';

import { shareTwitter } from 'utils/share-twitter';
import { Intro } from 'components/intro/Intro';
import { Content } from 'components/content/Content';
import { Video } from 'components/video/Video';
import { ISubtitles } from 'components/subtitles/Subtitles';
import { useResize } from 'hooks/use-resize';

export default () => {
  const introRef = React.useRef<React.ReactNode>(null);
  const topRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [play, playVideo] = React.useState(false);
  const [screen, setScreen] = React.useState('opening');
  const [isMobile] = useResize();
  const timeline = new TimelineLite();
  const duration = 0.75;
  const ease = Power4.easeInOut;

  const onClick = () => {
    if (
      !introRef.current ||
      !topRef.current ||
      !bottomRef.current ||
      !leftRef.current ||
      !rightRef.current
    ) {
      return;
    }

    if (!isMobile) {
      timeline.to(
        topRef.current,
        duration,
        {
          y: -74,
          ease,
        },
      );

      timeline.to(
        bottomRef.current,
        duration,
        {
          y: 74,
          ease,
        },
        `-=${duration}`,
      );

      timeline.to(
        rightRef.current,
        duration,
        {
          x: 20,
          ease,
        },
        `-=${duration}`,
      );

      timeline.to(
        leftRef.current,
        duration,
        {
          x: -20,
          ease,
        },
        `-=${duration}`,
      );
    }

    timeline.to(
      introRef.current,
      duration,
      {
        autoAlpha: 0,
        ease,
      },
      isMobile ? 0 : `-=${duration / 1.5}`,
    );

    playVideo(true);
  };

  const onVideoEnd = () => {
    if (
      !introRef.current ||
      !topRef.current ||
      !bottomRef.current ||
      !leftRef.current ||
      !rightRef.current
    ) {
      return;
    }

    setScreen('closing');

    if (!isMobile) {
      timeline.set(
        [topRef.current, bottomRef.current],
        { y: 0 },
      );

      timeline.set(
        [rightRef.current, leftRef.current],
        { x: 0 },
      );
    }

    timeline.to(
      introRef.current,
      duration,
      {
        autoAlpha: 1,
        ease,
      },
    );

    timeline.call(() => {
      playVideo(false);
    });
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
  const refs = { introRef, topRef, rightRef, bottomRef, leftRef };

  const subtitles = require('subs/subs.json');
  const offset = -200;
  subtitles
    .filter((i: ISubtitles) => Boolean(i.part)) // remove empty words
    .map((i: ISubtitles) => ({ start: i.start + offset, end: i.end + offset, part: i.part }));

  return (
    <>
      <Helmet title="Tory Satins and friends" />

      <Intro
        left={active.leftSide.image}
        right={{ ...active.rightSide }}
        {...refs}
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
