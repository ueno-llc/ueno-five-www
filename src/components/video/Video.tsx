import 'styles/range.css';

import * as React from 'react';
import Helmet from 'react-helmet';
import InputRange from 'react-input-range';
import { TimelineLite, Power4 } from 'gsap';

import Logo from 'assets/svg/logo.svg';

import { useVideoUpdate } from 'hooks/use-video-update';
import { useVideoEnd } from 'hooks/use-video-end';
import { useMouseMove } from 'hooks/use-mousemove';
import { useResize } from 'hooks/use-resize';
import { useKeyDown } from 'hooks/use-keydown';
import { Subtitles, ISubtitles } from 'components/subtitles/Subtitles';

import s from './Video.scss';

interface IProps {
  src: string;
  srcMobile: string;
  poster: string;
  subtitles: ISubtitles[][];
  subtitlesMobile: ISubtitles[][];
  onVideoEnd(): void;
}

export const Video = ({ src, srcMobile, poster, subtitles, subtitlesMobile, onVideoEnd }: IProps) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const videoSrcRef = React.useRef<HTMLVideoElement>(null);
  const topEl = React.useRef<HTMLDivElement>(null);
  const rightEl = React.useRef<HTMLDivElement>(null);
  const leftEl = React.useRef<HTMLDivElement>(null);
  const bottomEl = React.useRef<HTMLDivElement>(null);
  const [rangeValue, setRangeValue] = React.useState(0);
  const { currentTime, duration, paused } = useVideoUpdate(videoSrcRef);
  const isVideoEnd = useVideoEnd(videoSrcRef);
  const isMouseMoving = useMouseMove(videoRef);
  const [isMobile] = useResize();
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

    const time = 0.7;

    timeline.to(
      topEl.current,
      time,
      {
        y: 0,
        ease: Power4.easeInOut,
      },
    ).to(
      bottomEl.current,
      time,
      {
        y: 0,
        ease: Power4.easeInOut,
      },
      `-=${time}`,
    ).to(
      rightEl.current,
      time,
      {
        x: 0,
        ease: Power4.easeInOut,
      },
      `-=${time}`,
    ).to(
      leftEl.current,
      time,
      {
        x: 0,
        ease: Power4.easeInOut,
      },
      `-=${time}`,
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

    const time = 0.7;

    timeline.to(
      topEl.current,
      time,
      {
        y: 74,
        ease: Power4.easeInOut,
      },
    ).to(
      bottomEl.current,
      time,
      {
        y: -74,
        ease: Power4.easeInOut,
      },
      `-=${time}`,
    ).to(
      rightEl.current,
      time,
      {
        x: -20,
        ease: Power4.easeInOut,
      },
      `-=${time}`,
    ).to(
      leftEl.current,
      time,
      {
        x: 20,
        ease: Power4.easeInOut,
      },
      `-=${time}`,
    );
  };

  const onClick = () => {
    const video = videoSrcRef.current;

    if (video) {
      video.paused ? video.play() : video.pause();
    }
  };

  const onChange = (value: any) => {
    const video = videoSrcRef.current;

    if (video) {
      video.pause();

      const time = (value * duration) / 100;

      video.currentTime = time;
      setRangeValue(value);
    }
  };

  React.useEffect(() => {
    if (isVideoEnd) {
      onVideoEnd();
    }
  }, [isVideoEnd]);

  React.useEffect(() => {
    if (isMouseMoving) {
      animateIn();
    } else {
      animateOut();
    }
  }, [isMouseMoving]);

  React.useEffect(() => {
    const progress = (currentTime / duration) * 100;

    if (isNaN(progress) || progress > 100) {
      return;
    }

    setRangeValue(progress);
  }, [currentTime]);

  React.useEffect(() => {
    const videoSrc = videoSrcRef.current;

    if (videoSrc) {
      videoSrc.currentTime = currentTime;
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (keys.includes(32)) {
      onClick();
    }
  }, [keys]);

  return (
    <div
      ref={videoRef}
      className={s.video}
      onClick={onClick}
    >
      <Helmet bodyAttributes={{ class: 'black' }} />

      <video
        ref={videoSrcRef}
        className={s.video__src}
        src={isMobile ? srcMobile : src}
        poster={poster}
        autoPlay
        playsInline
        // muted
      />

      <div className={s.video__subtitles}>
        <Subtitles
          subtitles={isMobile ? subtitlesMobile : subtitles}
          currentTime={currentTime * 1000}
          paused={paused}
        />
      </div>

      <div className={s.video__hover}>
        <div className={s.video__header} ref={topEl}>
          <div className={s.video__container}>
            <a href="https://ueno.co/" className={s.video__link}>
              <Logo className={s.video__logo} />
            </a>
          </div>
        </div>

        <div className={s.video__right} ref={rightEl} />
        <div className={s.video__left} ref={leftEl} />

        <div className={s.video__controls} ref={bottomEl} >
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
