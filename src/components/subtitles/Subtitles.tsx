import React from 'react';
import ISubtitles from 'interfaces/ISubtitles';

interface IProps {
  currentTime: number;
  subtitles: Array<Array<ISubtitles>>;
}

import s from './Subtitles.scss';

export const Subtitles = ({ currentTime, subtitles }: IProps) => {
  return (
    <div className={s.subtitles}>
      {/* <div className={s.subtitles__pointer} /> */}
      {subtitles.map((segment: Array<ISubtitles>) => {
        const first = segment[0];
        const last = segment[segment.length - 1];

        const inRange = currentTime >= first.start && currentTime <= last.end;

        if (!inRange) {
          return null;
        }

        return (
          <p className={s.subtitles__text}>
            {segment.map(({ start, end, part}: ISubtitles) => {
              const isCurrent = currentTime >= start && currentTime <= end;

              return (
                <span style={isCurrent ? { textDecoration: 'underline' } : {}}>{part} </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
