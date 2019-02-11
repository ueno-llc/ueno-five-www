import * as React from 'react';
import { TimelineLite, Linear } from 'gsap';
import { isEmpty } from 'lodash';

import s from './Subtitles.scss';

export interface ISubtitles {
  start: number;
  end: number;
  part: string;
}

interface ISpan {
  x: number;
  width: number;
  delay: number;
}

interface ILyrics {
  index: number;
  spans: ISpan[];
  registered: boolean;
}

interface IProps {
  currentTime: number;
  subtitles: ISubtitles[][];
  paused: boolean;
}

export const Subtitles = ({ currentTime, subtitles, paused }: IProps) => {
  const ballRef = React.useRef<HTMLSpanElement>(null);
  const timeline = new TimelineLite();
  const offset = -200;

  const [currentLyrics, setCurrentLyrics] = React.useState<ILyrics>({
    index: -1,
    spans: [],
    registered: false,
  });

  const registerLyrics = (el: HTMLParagraphElement, segment: any, index: number) => {
    if ((currentLyrics.index === index && currentLyrics.registered) || !el) {
      return;
    }

    const elms = Array.from(el.querySelectorAll('span'));

    const spans = elms.map((span, i) => {
      const { x, width } = span.getBoundingClientRect() as any;
      const delay = (segment[i].end - segment[i].start) / 1000;

      return {
        x,
        width,
        delay,
      };
    });

    setCurrentLyrics({
      index,
      spans,
      registered: true,
    });
  };

  const onBounce = (ball, span, spans, index) => {
    // const ball = ballRef.current;
    // const { spans } = currentLyrics;

    // if (!ball) {
    //   return;
    // }

    // if (isEmpty(spans)) {
    //   timeline.set(
    //     ball,
    //     { opacity: 0 },
    //   );

    //   return;
    // }

    timeline.to(
      ball,
      0.15,
      {
        bezier: {
          type: 'soft',
          values: [
            { x: span.x + ((span.width + spans[index + 1].width) / 2), y: -60 },
            { x: spans[index + 1].x + (spans[index + 1].width / 2), y: 0 },
            { x: spans[index + 1].x + (spans[index + 1].width / 2), y: 0 },
          ],
          autoRotate: true,
        },
        ease: Linear.easeNone,
      },
      `+=${span.delay - 0.1}`,
    );

    return timeline;
  };

  React.useEffect(() => {
    const ball = ballRef.current;
    const { spans } = currentLyrics;

    if (!ball) {
      return;
    }

    if (isEmpty(spans)) {
      timeline.set(
        ball,
        { opacity: 0 },
      );

      return;
    }

    timeline.set(
      ball,
      {
        opacity: 1,
        x: spans[0].x + (spans[0].width / 2),
      },
    );

    spans.map((span, index) => {
      if (!spans[index + 1]) {
        return;
      }

      onBounce(ball, span, spans, index);
    });
  }, [currentLyrics]);

  React.useEffect(() => {
    console.log('-timeline', timeline);

    if (paused) {
      timeline.pause();
    } else {
      timeline.play();
    }
  }, [paused]);

  return (
    <div className={s.subtitles}>
      {subtitles.map((segment: ISubtitles[], i: number) => {
        const [first] = segment;
        const last = segment[segment.length - 1];
        const inRange = currentTime >= (first.start + offset) && currentTime <= (last.end + offset);
        const segments = segment.filter((sub: ISubtitles) => sub.part);

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
              ref={(el: HTMLParagraphElement) => registerLyrics(el, segments, i)}
              className={s.subtitles__text}
            >
              {segments.map(({ start, end, part }: ISubtitles, ii: number) => {
                const isCurrent = currentTime >= (start + offset) && currentTime <= (end + offset);

                return (
                  <span
                    key={`${part}-${ii}`}
                    style={{ color: isCurrent ? '' : '' }}
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
