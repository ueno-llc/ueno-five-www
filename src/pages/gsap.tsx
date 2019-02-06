import * as React from 'react';
import { TweenMax, Linear } from 'gsap';

// @ts-ignore
import subs from 'subs/subs.json';

export default () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const content = React.useRef(null);
  const ball = React.useRef(null);

  React.useEffect(() => {
    const p = content.current;
    const b = ball.current;

    if (!p || !b) {
      return;
    }

    const spans = Array.from(p.querySelectorAll('span')).map(span => {
      const { x, width } = span.getBoundingClientRect();

      return {
        x,
        width,
      };
    });

    TweenMax.set(
      b,
      {
        x: spans[0].x + (spans[0].width / 2),
      },
    );

    TweenMax.to(
      b,
      1.5,
      {
        bezier: {
          type: 'soft',
          values: [
            { x: spans[0].x + (spans[0].width / 2), y: 0 },

            { x: spans[0].x + ((spans[0].width + spans[1].width) / 2), y: -60 },
            { x: spans[1].x + (spans[1].width / 2), y: 0 },
            { x: spans[1].x + (spans[1].width / 2), y: 0 },

            { x: spans[1].x + ((spans[1].width + spans[2].width) / 2), y: -60 },
            { x: spans[2].x + (spans[2].width / 2), y: 0 },
            { x: spans[2].x + (spans[2].width / 2), y: 0 },

            { x: spans[2].x + ((spans[2].width + spans[3].width) / 2), y: -60 },
            { x: spans[3].x + (spans[3].width / 2), y: 0 },
            { x: spans[3].x + (spans[3].width / 2), y: 0 },

            { x: spans[3].x + ((spans[3].width + spans[4].width) / 2), y: -60 },
            { x: spans[4].x + (spans[4].width / 2), y: 0 },
            { x: spans[4].x + (spans[4].width / 2), y: 0 },

            { x: spans[4].x + ((spans[4].width + spans[5].width) / 2), y: -60 },
            { x: spans[5].x + (spans[5].width / 2), y: 0 },
            { x: spans[5].x + (spans[5].width / 2), y: 0 },
          ],
          autoRotate: true,
        },
        ease: Linear.easeNone,
        repeat: -1,
      },
    );
  }, []);

  return (
    <>
      <div style={{ position: 'absolute', bottom: 240, width: '100%' }}>
        <span ref={ball} style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: '#000', position: 'absolute' }} />
      </div>

      <div ref={content} style={{ position: 'absolute', bottom: 200, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <span style={{ marginRight: 5 }}>This is</span>
        <span style={{ marginRight: 5 }}>a sentence</span>
        <span style={{ marginRight: 5 }}>with a</span>
        <span style={{ marginRight: 5 }}>bouncing ball.</span>
        <span style={{ marginRight: 5 }}>Let's make</span>
        <span>it bounce!</span>
      </div>
    </>
  );
};
