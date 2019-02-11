import * as React from 'react';
import { TimelineLite, Linear, Power4 } from 'gsap';
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
  span: HTMLSpanElement;
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

interface IState {
  currentLyrics: ILyrics;
}

const OFFSET = -200;

export class Subtitles extends React.Component<IProps, IState> {
  ballRef: React.RefObject<HTMLSpanElement> = React.createRef();
  timeline = new TimelineLite();

  state = {
    currentLyrics: {
      index: -1,
      spans: [],
      registered: false,
    },
  } as IState;

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.paused !== this.props.paused) {
      if (nextProps.paused) {
        this.timeline.pause();
      } else {
        this.timeline.play();
      }
    }
  }

  componentDidUpdate(_props: IProps, prevState: IState) {
    if (prevState.currentLyrics !== this.state.currentLyrics) {
      this.onPlay();
    }
  }

  registerLyrics = (el: HTMLParagraphElement, segment: any, index: number) => {
    const { currentLyrics } = this.state;

    if ((currentLyrics.index === index && currentLyrics.registered) || !el) {
      return;
    }

    const elms = Array.from(el.querySelectorAll('span'));

    const spans = elms.map((span, i) => {
      const { x, width } = span.getBoundingClientRect() as any;
      const delay = (segment[i].end - segment[i].start) / 1000;

      return {
        x: i > 0 ? x - 12 : x,
        width,
        delay,
        span,
      };
    });

    const lyrics = {
      index,
      spans,
      registered: true,
    };

    this.setState({ currentLyrics: lyrics });
  }

  onBounce = (ball: React.ReactNode, span: ISpan, spans: ISpan[], index: number) => {
    this.timeline.to(
      ball!,
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
      `+=${span.delay - 0.25}`,
    );

    return this.timeline;
  }

  onPlay = () => {
    const ball = this.ballRef.current;
    const { spans } = this.state.currentLyrics;

    if (!ball) {
      return;
    }

    if (isEmpty(spans)) {
      this.timeline.set(
        ball,
        { opacity: 0, x: -50 },
      );

      return;
    }

    this.timeline.clear();

    this.timeline.set(
      ball,
      {
        opacity: 1,
        x: spans[0].x + (spans[0].width / 2),
      },
    );

    spans.map((span, index) => {
      this.timeline.to(
        spans[index].span,
        0.05,
        {
          y: 10,
          rotationX: 40,
          ease: Power4.easeIn,
        },
        '-=0.1',
      );

      this.timeline.to(
        spans[index].span,
        0.15,
        {
          y: 0,
          rotationX: 0,
          ease: Power4.easeIn,
        },
        '-=0.05',
      );

      if (!spans[index + 1]) {
        this.timeline.to(
          ball,
          0.2,
          { opacity: 0 },
          `+=${spans[spans.length - 1].delay - 0.4}`,
        );

        return;
      }

      this.onBounce(ball, span, spans, index);
    });
  }

  render() {
    const { currentTime, subtitles } = this.props;

    return (
      <div className={s.subtitles}>
        {subtitles.map((segment: ISubtitles[], i: number) => {
          const [first] = segment;
          const last = segment[segment.length - 1];
          const inRange = currentTime >= (first.start + OFFSET) && currentTime <= (last.end + OFFSET);
          const segments = segment.filter((sub: ISubtitles) => sub.part);

          if (!inRange) {
            return null;
          }

          return (
            <span key={`${first.part}-${i}`}>
              <span
                ref={this.ballRef}
                className={s.subtitles__pointer}
              />

              <p
                ref={(el: HTMLParagraphElement) => this.registerLyrics(el, segments, i)}
                className={s.subtitles__text}
              >
                {segments.map(({ start, end, part }: ISubtitles, ii: number) => {
                  const isCurrent = currentTime >= (start + OFFSET) && currentTime <= (end + OFFSET);

                  return (
                    <span
                      key={`${part}-${ii}`}
                      style={{ color: isCurrent ? '' : '' }}
                      className={s.subtitles__word}
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
  }
}
