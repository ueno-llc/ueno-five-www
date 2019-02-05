import * as React from 'react';

import { useResize } from 'hooks/use-resize';
import { Button } from 'components/button/Button';

import s from './Content.scss';

interface IButton {
  text: string;
  action: any;
  color?: string;
}

interface IProps {
  heading: string;
  subheading: string;
  buttons: IButton[];
}

export const Content = ({ heading, subheading, buttons }: IProps) => {
  const [isMobile] = useResize();

  return (
    <div className={s.content}>
      <h1 className={s.content__heading}>
        {heading}
      </h1>

      <h2 className={s.content__subheading}>
        {subheading}
      </h2>

      <div className={s.content__buttons}>
        {buttons.map((button: IButton) => (
          <Button
            key={button.text}
            onClick={button.action}
            color={!isMobile ? button.color : 'orange'}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};
