import 'styles/range.css';

import * as React from 'react';

import { useVideoUpdate } from 'hooks/use-video-update';
import { useResize } from 'hooks/use-resize';
import { Subtitles, ISubtitles } from 'components/subtitles/Subtitles';

import s from './Video.scss';

interface IVideoProps {
  src: string;
  srcMobile: string;
  poster: string;
  subtitles: ISubtitles[][];
  subtitlesMobile: ISubtitles[][];
  onVideoEnd(): void;
  isMobile: boolean;
}

export const Video = React.forwardRef((
  { src, srcMobile, poster, subtitles, subtitlesMobile, onVideoEnd, isMobile }: IVideoProps,
  ref: any,
) => {
  const { currentTime, paused, end: isVideoEnd } = useVideoUpdate(ref);
  const resize = useResize();

  React.useEffect(() => {
    if (isVideoEnd) {
      onVideoEnd();
    }
  }, [isVideoEnd]);

  React.useEffect(() => {
    const videoSrc = ref.current;

    if (videoSrc) {
      videoSrc.currentTime = currentTime;

      if (isMobile) {
        videoSrc.src = srcMobile;
      } else {
        videoSrc.src = src;
      }
    }
  }, [isMobile]);

  React.useEffect(() => {
    const videoSrc = ref.current;

    if (videoSrc) {
      videoSrc.currentTime = currentTime;
    }
  }, [resize.isMobile]);

  return (
    <>
      <video
        ref={ref}
        className={s.video__src}
        poster={poster}
        autoPlay
        playsInline
      />

      <div className={s.video__subtitles}>
        <Subtitles
          subtitles={isMobile ? subtitlesMobile : subtitles}
          currentTime={currentTime * 1000}
          paused={paused}
        />
      </div>
    </>
  );
});
