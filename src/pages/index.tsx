import * as React from 'react';
import Helmet from 'react-helmet';
import { TimelineLite, Power4 } from 'gsap';

import { shareTwitter } from 'utils/share-twitter';
import { useResize } from 'hooks/use-resize';
import { Intro } from 'components/intro/Intro';
import { Content } from 'components/content/Content';
import { Player } from 'components/player/Player';
import { Video } from 'components/video/Video';

const DURATION = 0.75;

export default () => {
  const introRef = React.useRef<React.ReactNode>(null);
  const topRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [play, playVideo] = React.useState(false);
  const [screen, setScreen] = React.useState('opening');
  const { isMobile } = useResize();
  const timeline = new TimelineLite();
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
        DURATION,
        {
          y: -74,
          ease,
        },
      );

      timeline.to(
        bottomRef.current,
        DURATION,
        {
          y: 74,
          ease,
        },
        `-=${DURATION}`,
      );

      timeline.to(
        rightRef.current,
        DURATION,
        {
          x: 20,
          ease,
        },
        `-=${DURATION}`,
      );

      timeline.to(
        leftRef.current,
        DURATION,
        {
          x: -20,
          ease,
        },
        `-=${DURATION}`,
      );
    }

    timeline.to(
      introRef.current,
      DURATION,
      {
        autoAlpha: 0,
        ease,
      },
      isMobile ? 0 : `-=${DURATION / 1.5}`,
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
      DURATION,
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
          { text: 'Share on Twitter', action: shareTwitter },
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
        <Player>
          <Video
            src="https://cdn.ueno.co/song.mp4"
            srcMobile="https://cdn.ueno.co/song_480.mp4"
            poster={require('assets/images/poster.jpg')}
            subtitles={require('subs/subs.json')}
            subtitlesMobile={require('subs/subs-mobile.json')}
            onVideoEnd={onVideoEnd}
            isMobile={isMobile}
          />
        </Player>
      )}
    </>
  );
};
