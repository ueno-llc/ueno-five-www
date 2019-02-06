import * as React from 'react';
import { TimelineLite, Back } from 'gsap';

import { useResize } from 'hooks/use-resize';

import s from './Subtitles.scss';

export interface ISubtitles {
  start: number;
  end: number;
  part: string;
}

interface IRect {
  i: number;
  x: number;
  y: number;
  w: number;
  active: boolean;
}

interface IProps {
  currentTime: number;
  subtitles: ISubtitles[][];
}

export const Subtitles = ({ currentTime, subtitles }: IProps) => {
  const ballRef = React.useRef<HTMLSpanElement>(null);
  const sentences: IRect[] = [];
  const timeline = new TimelineLite();
  const [isMobile] = useResize();

  const registerPart = (el: HTMLSpanElement, index: number, active: boolean) => {
    let item = { i: 0, x: 0, y: 0, w: 0, active: false };

    if (!el) {
      return;
    }

    if (sentences[index]) {
      item = sentences[index];
    }

    if (item.w === 0) {
      sentences[index] = item;

      const { x, y, width } = el.getBoundingClientRect() as any;

      item.i = index;
      item.x = x;
      item.y = y;
      item.w = width;
      item.active = active;
    }
  };

  React.useEffect(() => {
    const ball = ballRef.current;

    if (!ball) {
      return;
    }

    const active = sentences.filter((el: IRect) => el.active)[0];

    if (!active) {
      return;
    }

    timeline.to(
      ball,
      active.i === 0 ? 0 : 0.2,
      {
        opacity: 1,
        x: active.x + (active.w / 2) - (isMobile ? 4 : 7),
        ease: Back.easeInOut.config(0.75),
      },
    );
  }, [sentences]);

  return (
    <div className={s.subtitles}>
      {subtitles.map((segment: ISubtitles[], i: number) => {
        const [first] = segment;
        const last = segment[segment.length - 1];
        const inRange = currentTime >= first.start && currentTime <= last.end;

        if (!inRange) {
          return null;
        }

        return (
          <span key={`${first.part}-${i}`}>
            <span
              ref={ballRef}
              className={s.subtitles__pointer}
            />

            <p className={s.subtitles__text}>
              {segment.filter((sub: ISubtitles) => sub.part).map(({ start, end, part }: ISubtitles, ii: number) => {
                const isCurrent = currentTime >= start && currentTime <= end;

                return (
                  <span
                    ref={(el: HTMLSpanElement) => registerPart(el, ii, isCurrent)}
                    key={`${part}-${ii}`}
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
