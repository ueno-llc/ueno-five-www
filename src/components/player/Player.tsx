import 'styles/range.css';

import * as React from 'react';
import InputRange from 'react-input-range';
import { TimelineLite, Power4 } from 'gsap';

import Logo from 'assets/svg/logo.svg';

import { useVideoUpdate } from 'hooks/use-video-update';
import { useMouseMove } from 'hooks/use-mousemove';
import { useKeyDown } from 'hooks/use-keydown';

import s from './Player.scss';

interface IPlayerProps {
  children: React.ReactNode;
}

const DURATION = 0.7;

export const Player = ({ children }: IPlayerProps) => {
  const playerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const topEl = React.useRef<HTMLDivElement>(null);
  const rightEl = React.useRef<HTMLDivElement>(null);
  const leftEl = React.useRef<HTMLDivElement>(null);
  const bottomEl = React.useRef<HTMLDivElement>(null);
  const [rangeValue, setRangeValue] = React.useState(0);
  const { currentTime, duration: videoDuration } = useVideoUpdate(videoRef);
  const isMouseMoving = useMouseMove(playerRef);
  const keys = useKeyDown();
  const timeline = new TimelineLite();

  const animateOut = () => {
    if (
      !topEl.current ||
      !bottomEl.current ||
      !leftEl.current ||
      !rightEl.current
    ) {
      return;
    }

    timeline.to(
      topEl.current,
      DURATION,
      {
        y: 0,
        ease: Power4.easeInOut,
      },
    );

    timeline.to(
      bottomEl.current,
      DURATION,
      {
        y: 0,
        ease: Power4.easeInOut,
      },
      `-=${DURATION}`,
    );

    timeline.to(
      [rightEl.current, leftEl.current],
      DURATION,
      {
        x: 0,
        ease: Power4.easeInOut,
      },
      `-=${DURATION}`,
    );
  };

  const animateIn = () => {
    if (
      !topEl.current ||
      !bottomEl.current ||
      !leftEl.current ||
      !rightEl.current
    ) {
      return;
    }

    timeline.to(
      topEl.current,
      DURATION,
      {
        y: 74,
        ease: Power4.easeInOut,
      },
    );

    timeline.to(
      bottomEl.current,
      DURATION,
      {
        y: -74,
        ease: Power4.easeInOut,
      },
      `-=${DURATION}`,
    );

    timeline.to(
      rightEl.current,
      DURATION,
      {
        x: -20,
        ease: Power4.easeInOut,
      },
      `-=${DURATION}`,
    );

    timeline.to(
      leftEl.current,
      DURATION,
      {
        x: 20,
        ease: Power4.easeInOut,
      },
      `-=${DURATION}`,
    );
  };

  const onClick = () => {
    const video = videoRef.current;

    if (video) {
      video.paused ? video.play() : video.pause();
    }
  };

  const onChange = (value: any) => {
    const video = videoRef.current;

    if (video) {
      video.pause();

      const time = (value * videoDuration) / 100;

      video.currentTime = time;
      setRangeValue(value);
    }
  };

  React.useEffect(() => {
    if (isMouseMoving) {
      animateIn();
    } else {
      animateOut();
    }
  }, [isMouseMoving]);

  React.useEffect(() => {
    const progress = (currentTime / videoDuration) * 100;

    if (isNaN(progress) || progress > 100) {
      return;
    }

    setRangeValue(progress);
  }, [currentTime]);

  React.useEffect(() => {
    if (keys.includes(32)) {
      onClick();
    }
  }, [keys]);

  return (
    <div
      ref={playerRef}
      className={s.player}
      onClick={onClick}
    >
      {React.Children.map(children, (c: any) => React.cloneElement(c, {
        ref: videoRef,
      }))}

      <div className={s.player__hover}>
        <div className={s.player__header} ref={topEl}>
          <div className={s.player__container}>
            <a href="https://ueno.co" className={s.player__link}>
              <Logo className={s.player__logo} />
            </a>
          </div>
        </div>

        <div className={s.player__right} ref={rightEl} />
        <div className={s.player__left} ref={leftEl} />

        <div className={s.player__controls} ref={bottomEl} >
          <InputRange
            maxValue={100}
            step={0.01}
            value={rangeValue}
            onChange={onChange}
            formatLabel={() => ''}
          />
        </div>
      </div>
    </div>
  );
};
