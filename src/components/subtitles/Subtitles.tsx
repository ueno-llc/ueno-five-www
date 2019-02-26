import * as React from 'react';
import { TimelineLite, Linear, Power3 } from 'gsap';
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
  ratio: number;
  duration: number;
  postSilence: number;
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

const OFFSET = 0;
const ease = Linear.easeNone;

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
    const total = (segment[segment.length - 1].end - segment[0].start) / 1000;

    const spans = elms.map((span, i) => {
      const { x, width } = span.getBoundingClientRect() as any;
      const duration = (segment[i].end - segment[i].start) / 1000;
      const ratio = duration / total;
      const postSilence = segment[i + 1] ? (segment[i + 1].start - segment[i].end) / 1000 : 0;

      return {
        x: i > 0 ? x - 12 : x,
        width,
        ratio,
        duration,
        postSilence,
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
    const nextSpan = spans[index + 1];
    const baseY = 60; // vary how the ball goes according to how long a word is said
    const y = 60 + (baseY * nextSpan.ratio);
    const padding = -0.1;

    let animationDuration = span.duration + padding + span.postSilence;

    if (index === 0) {
      animationDuration -= 0.1;
    }

    // Overwrite animationDuration if less than 0.1sec
    // otherwise it goes too fast and makes the bouncing weird
    if (animationDuration < 0.1) {
      animationDuration = 0.15;
    }

    this.timeline.to(
      ball!,
      animationDuration,
      {
        bezier: {
          type: 'soft',
          values: [
            { x: span.x + ((span.width + nextSpan.width) / 2), y: -y },
            { x: nextSpan.x + (nextSpan.width / 2), y: 0 },
          ],
          autoRotate: true,
        },
        ease: Power3.easeOut,
      },
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

    // start the ball off to the side
    this.timeline.set(
      ball,
      {
        opacity: 1,
        x: spans[0].x - 100,
        y: -60,
      },
    );

    // bounce it onto the first word
    this.timeline.to(
      ball,
      0.1,
      {
        bezier: {
          type: 'soft',
          values: [
            { x: spans[0].x - 60, y: - 60, opacity: 1 },
            { x: spans[0].x + (spans[0].width / 2), y: 0 },
          ],
          autoRotate: true,
        },
        ease,
      },
    );

    spans.map((span, index) => {
      if (!spans[index + 1]) {
        this.timeline.to(
          ball,
          spans[spans.length - 1].duration,
          { opacity: 0 },
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
                {segments.map(({ part }: ISubtitles, ii: number) => (
                  <span
                    key={`${part}-${ii}`}
                    className={s.subtitles__word}
                  >
                    {`${part} `}
                  </span>
                ))}
              </p>
            </span>
          );
        })}
      </div>
    );
  }
}
