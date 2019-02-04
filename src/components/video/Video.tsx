import * as React from 'react';
import { TweenLite } from 'gsap';

import { useVideoUpdate } from 'hooks/use-video-update';
import { useVideoEnd } from 'hooks/use-video-end';
import { useMouseMove } from 'hooks/use-mousemove';

import Logo from 'assets/svg/logo.svg';

import s from './Video.scss';

interface IProps {
  src: string;
  poster: string;
  onVideoEnd(): void;
}

export const Video = ({ src, poster, onVideoEnd }: IProps) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const videoSrcRef = React.useRef<HTMLVideoElement>(null);
  const handleRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const videoProgress = useVideoUpdate(videoSrcRef);
  const isVideoEnd = useVideoEnd(videoSrcRef);
  const isMouseMoving = useMouseMove(videoRef);

  React.useEffect(() => {
    if (isVideoEnd) {
      onVideoEnd();
    }
  });

  React.useEffect(() => {
    if (handleRef.current && progressRef.current) {
      const left = (videoProgress.currentTime * (window.innerWidth - 40)) / videoProgress.duration;

      if (isNaN(left)) {
        return;
      }

      TweenLite.set(
        handleRef.current,
        { left },
      );

      TweenLite.set(
        progressRef.current,
        { width: left },
      );
    }
  });

  return (
    <div
      ref={videoRef}
      className={s(s.video, { show: isMouseMoving })}
    >
      <video
        ref={videoSrcRef}
        className={s.video__src}
        src={src}
        poster={poster}
        autoPlay
        playsInline
        muted
      />

      <div className={s.video__lyrics}>
        {/* <div className={s.video__pointer} /> */}
        <p className={s.video__text}>Five years, that’s not too long, but it’s half a decade on</p>
      </div>

      <div className={s.video__hover}>
        <div className={s.video__header}>
          <div className={s.video__container}>
            <Logo className={s.video__logo} />
          </div>
        </div>

        <div className={s.video__controls}>
          <div className={s.video__length}>
            <div
              ref={handleRef}
              className={s.video__handle}
            />

            <div
              ref={progressRef}
              className={s.video__progess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
