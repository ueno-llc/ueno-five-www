import * as React from 'react';

import s from './Video.scss';
import { TweenLite } from 'gsap';

interface IProps {
  src: string;
  poster: string;
  autoPlay: boolean;
}

export const Video = ({ src, poster, autoPlay }: IProps) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const videoSrcRef = React.useRef<HTMLVideoElement>(null);
  const handleRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);

  const onUpdate = () => {
    if (!videoSrcRef.current || !handleRef.current || !progressRef.current) {
      return;
    }

    // console.log('-videoSrcRef', videoSrcRef.current.currentTime = x);
    // console.log('-videoSrcRef', videoSrcRef.current.duration = 100);

    const left = (100 * videoSrcRef.current.duration) / videoSrcRef.current.currentTime;

    TweenLite.set(
      handleRef.current,
      { left },
    );
  };

  React.useEffect(() => {
    if (!videoSrcRef.current) {
      return;
    }

    videoSrcRef.current.addEventListener('timeupdate', onUpdate);

    return () => {
      if (!videoSrcRef.current) {
        return;
      }

      videoSrcRef.current.removeEventListener('timeupdate', onUpdate);
    };
  }, []);

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
        // autoPlay={autoPlay}
        autoPlay
        muted
        playsInline
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
