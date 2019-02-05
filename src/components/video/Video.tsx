import 'styles/range.css';

import * as React from 'react';
import Helmet from 'react-helmet';
import InputRange from 'react-input-range';

import Logo from 'assets/svg/logo.svg';

import { useVideoUpdate } from 'hooks/use-video-update';
import { useVideoEnd } from 'hooks/use-video-end';
import { useMouseMove } from 'hooks/use-mousemove';
import { Subtitles, ISubtitles } from 'components/subtitles/Subtitles';

import s from './Video.scss';

interface IProps {
  src: string;
  poster: string;
  subtitles: ISubtitles[][];
  onVideoEnd(): void;
}

export const Video = ({ src, poster, subtitles, onVideoEnd }: IProps) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const videoSrcRef = React.useRef<HTMLVideoElement>(null);
  const [rangeValue, setRangeValue] = React.useState(0);
  const { currentTime, duration } = useVideoUpdate(videoSrcRef);
  const isVideoEnd = useVideoEnd(videoSrcRef);
  const isMouseMoving = useMouseMove(videoRef);

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
    const progress = (currentTime / duration) * 100;

    if (isNaN(progress) || progress > 100) {
      return;
    }

    setRangeValue(progress);
  }, [currentTime]);

  return (
    <div
      ref={videoRef}
      className={s(s.video, { show: isMouseMoving })}
      onClick={onClick}
    >
      <Helmet bodyAttributes={{ class: 'black' }} />

      <video
        ref={videoSrcRef}
        className={s.video__src}
        src={src}
        poster={poster}
        autoPlay
        playsInline
        muted
      />

      <div className={s.video__subtitles}>
        <Subtitles
          subtitles={subtitles}
          currentTime={currentTime * 1000}
        />
      </div>

      <div className={s.video__hover}>
        <div className={s.video__header}>
          <div className={s.video__container}>
            <Logo className={s.video__logo} />
          </div>
        </div>

        <div className={s.video__controls}>
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
