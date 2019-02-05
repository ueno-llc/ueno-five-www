import * as React from 'react';
import { TimelineLite, Back, TweenLite } from 'gsap';

import { useResize } from 'hooks/use-resize';

import s from './Subtitles.scss';

export interface ISubtitles {
  start: number;
  end: number;
  part: string;
}

interface ISegment {
  i: number;
  w: number;
}

interface IPart {
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
  const subtitlesRef = React.useRef<HTMLDivElement>(null);
  const ballRef = React.useRef<HTMLSpanElement>(null);
  const segments: ISegment[] = [];
  const parts: IPart[] = [];
  const timeline = new TimelineLite();
  const [isMobile, windowWidth] = useResize();

  const registerSegment = (el: HTMLParagraphElement, index: number) => {
    let item = { i: 0, w: 0 };

    if (!el) {
      return;
    }

    if (segments[index]) {
      item = segments[index];
    }

    if (item.w === 0) {
      segments[index] = item;

      const { width } = el.getBoundingClientRect() as any;

      item.i = index;
      item.w = width;
    }
  };

  const registerPart = (el: HTMLSpanElement, index: number, active: boolean) => {
    let item = { i: 0, x: 0, y: 0, w: 0, active: false };

    if (!el) {
      return;
    }

    if (parts[index]) {
      item = parts[index];
    }

    if (item.w === 0) {
      parts[index] = item;

      const { x, y, width } = el.getBoundingClientRect() as any;

      item.i = index;
      item.x = x;
      item.y = y;
      item.w = width;
      item.active = active;
    }
  };

  React.useEffect(() => {
    console.log('-segments', segments);
    // console.log('-windowWidth', windowWidth);

    if (!subtitlesRef.current) {
      return;
    }

    // console.log('-segments[0]', segments[0]);

    // if (segments[0].w > windowWidth) {
    //   const diff =  segments[0].w - Number(windowWidth);

    //   console.log('-diff', diff);

    //   // TweenLite.to(
    //   //   subtitlesRef.current,
    //   //   1.5,
    //   //   {  }
    //   // );
    // }

    const p = subtitlesRef.current.querySelector('p')
    // console.log('-p', subtitlesRef.current.querySelector('p'));

    if (!p) {
      return;
    }

    TweenLite.to(
      subtitlesRef.current.querySelector('p'),
      1.5,
      { x: -140 },
    );
  }, [segments]);

  React.useEffect(() => {
    const ball = ballRef.current;

    if (!ball) {
      return;
    }

    const active = parts.filter((el: IPart) => el.active)[0];

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
  }, [parts]);

  return (
    <div
      ref={subtitlesRef}
      className={s.subtitles}
    >
      {subtitles.map((segment: ISubtitles[], i: number) => {
        const [first] = segment;
        const last = segment[segment.length - 1];
        const inRange = currentTime >= first.start && currentTime <= last.end;
        // console.log('-segment', segment);

        // console.log('-first', first);

        const duration = first.start + last.end;
        // console.log('-duration', duration / 1000);

        // const duration = segment.reduce(acc, cur => {
        //   return cur.
        // }, 0);

        if (!inRange) {
          return null;
        }

        return (
          <>
            <span
              ref={ballRef}
              className={s.subtitles__pointer}
            />

            <p
              ref={(el: HTMLParagraphElement) => registerSegment(el, i)}
              key={`${first.part}-${i}`}
              className={s.subtitles__text}
            >
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
          </>
        );
      })}
    </div>
  );
};
