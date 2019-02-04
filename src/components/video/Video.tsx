import * as React from 'react';
import { TweenLite } from 'gsap';

import { useTimeUpdate } from 'hooks/use-timeupdate';

import s from './Video.scss';

interface IProps {
  src: string;
  poster: string;
  play: boolean;
}

export const Video = ({ src, poster, play }: IProps) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const videoSrcRef = React.useRef<HTMLVideoElement>(null);
  const handleRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const stats = useTimeUpdate(videoSrcRef);

  React.useEffect(() => {
    if (handleRef.current && progressRef.current) {
      const left = (stats.currentTime * (window.innerWidth - 40)) / stats.duration;

      TweenLite.set(
        handleRef.current,
        { left },
      );

      TweenLite.set(
        progressRef.current,
        { width: left },
      );
    }

    if (play && videoSrcRef.current) {
      videoSrcRef.current.play();
    } else if (!play && videoSrcRef.current) {
      videoSrcRef.current.pause();
    }
  });

  return (
    <div
      ref={videoRef}
      className={s.video}
    >
      <video
        ref={videoSrcRef}
        className={s.video__src}
        src={src}
        poster={poster}
        playsInline
        muted
      />

      <div className={s.video__lyrics}>
        <div className={s.video__pointer} />
        <p className={s.video__text}>Five years, that’s not too long, but it’s half a decade on</p>
      </div>

      <div className={s.video__hover}>
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
