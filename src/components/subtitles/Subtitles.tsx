import * as React from 'react';
import { TweenMax, Linear } from 'gsap';
import { isEmpty, flatten } from 'lodash';

import s from './Subtitles.scss';

export interface ISubtitles {
  start: number;
  end: number;
  part: string;
}

interface IRect {
  x: number;
  width: number;
  active?: boolean;
}

interface IProps {
  currentTime: number;
  subtitles: ISubtitles[][];
}

interface ILyrics {
  index: number;
  spans: IRect[];
  duration: number;
  registered: boolean;
}

export const Subtitles = ({ currentTime, subtitles }: IProps) => {
  const ballRef = React.useRef<HTMLSpanElement>(null);
  const offset = -200;

  const [currentLyrics, setCurrentLyrics] = React.useState<ILyrics>({
    index: -1,
    spans: [],
    duration: 0,
    registered: false,
  });

  const registerLyrics = (el: HTMLParagraphElement, duration: number, index: number) => {
    if ((currentLyrics.index === index && currentLyrics.registered) || !el) {
      return;
    }

    const spans = Array.from(el.querySelectorAll('span')).map((span) => {
      const { x, width } = span.getBoundingClientRect() as any;

      return {
        x,
        width,
      };
    });

    setCurrentLyrics({
      index,
      spans,
      duration,
      registered: true,
    });
  };

  React.useEffect(() => {
    const ball = ballRef.current;
    const { spans } = currentLyrics;

    if (!ball) {
      return;
    }

    if (isEmpty(spans)) {
      TweenMax.set(
        ball,
        {
          opacity: 0,
        },
      );

      return;
    }

    TweenMax.set(
      ball,
      {
        opacity: 1,
        x: spans[0].x + (spans[0].width / 2),
      },
    );

    const values = spans.map((span, index) => {
      if (!spans[index + 1]) {
        return;
      }

      return [
        { x: span.x + ((span.width + spans[index + 1].width) / 2), y: -80 },
        { x: spans[index + 1].x + (spans[index + 1].width / 2), y: 0 },
        { x: spans[index + 1].x + (spans[index + 1].width / 2), y: 0 },
      ];
    }).filter((val) => val);

    TweenMax.to(
      ball,
      currentLyrics.duration / 1000,
      {
        bezier: {
          type: 'soft',
          values: flatten(values as any),
          autoRotate: true,
        },
        ease: Linear.easeNone,
      },
    );
  }, [currentLyrics]);

  return (
    <div className={s.subtitles}>
      {subtitles.map((segment: ISubtitles[], i: number) => {
        const [first] = segment;
        const last = segment[segment.length - 1];
        const inRange = currentTime >= (first.start + offset) && currentTime <= (last.end + offset);
        const duration = last.end - first.start;

        if (!inRange) {
          return null;
        }

        return (
          <span key={`${first.part}-${i}`}>
            <span
              ref={ballRef}
              className={s.subtitles__pointer}
            />

            <p
              ref={(el: HTMLParagraphElement) => registerLyrics(el, duration, i)}
              className={s.subtitles__text}
            >
              {segment.filter((sub: ISubtitles) => sub.part).map(({ start, end, part }: ISubtitles, ii: number) => {
                const isCurrent = currentTime >= (start + offset) && currentTime <= (end + offset);

                return (
                  <span
                    key={`${part}-${ii}`}
                    // style={{ color: isCurrent ? '#fff' : '' }}
                  >
                    {`${part} `}
                  </span>
                );
              })}
            </p>
          </span>
        );
      })}
    </div>
  );
};
