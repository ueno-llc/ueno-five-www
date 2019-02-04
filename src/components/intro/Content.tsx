import * as React from 'react';

import { Button } from 'components/button/Button';

import s from './Content.scss';

interface IText {
  text: string;
  color: string;
}

interface IButton {
  text: string;
  action(): void;
  color?: string;
}

interface IProps {
  heading: IText;
  subheading: IText;
  buttons: IButton[];
}

export const Content = ({ heading, subheading, buttons }: IProps) => (
  <div className={s.content}>
    <h1
      className={s.content__heading}
      style={{ color: heading.color }}
    >
      {heading.text}
    </h1>

    <h2
      className={s.content__subheading}
      style={{ color: subheading.color }}
    >
      {subheading.text}
    </h2>

    {buttons.map((button: IButton) => (
      <Button
        key={button.text}
        onClick={button.action}
        color={button.color}
      >
        {button.text}
      </Button>
    ))}
  </div>
);
