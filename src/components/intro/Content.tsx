import * as React from 'react';

import { Button } from 'components/button/Button';

import s from './Content.scss';

interface IButton {
  text: string;
  action(): void;
}

interface IProps {
  heading: string;
  subheading: string;
  button: IButton;
}

export const Content = ({ heading, subheading, button }: IProps) => (
  <div className={s.content}>
    <h1 className={s.content__heading}>{heading}</h1>
    <h2 className={s.content__subheading}>{subheading}</h2>
    <Button onClick={button.action}>{button.text}</Button>
  </div>
);
