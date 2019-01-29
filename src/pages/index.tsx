import React from 'react';
import Helmet from 'react-helmet';

import { Player } from 'components/player/Player';
import { Intro } from 'components/intro/Intro';
import { Content } from 'components/intro/Content';
import { Video } from 'components/video/Video';

export default () => {
  const [videoShown, setVideo] = React.useState(false);

  const onClick = () => {
    setVideo(!videoShown);
  };

  return (
    <>
      <Helmet title="Home" />

      <Player>
        {!videoShown && (
          <Intro
            illustration={require('assets/images/illustration.png')}
            backgroundColor="#005afa"
          >
            <Content
              heading="Ueno is 5 years old"
              subheading="So we made this thing"
              button={{
                text: 'Show me!',
                action: onClick,
              }}
            />
          </Intro>
        )}

        {videoShown && <Video />}
      </Player>
    </>
  );
}
