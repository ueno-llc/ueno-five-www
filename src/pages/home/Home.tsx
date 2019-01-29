import React from 'react';
import Helmet from 'react-helmet';

import { Wrapper } from 'components/wrapper/Wrapper';

import { Screen } from './components/screen/Screen';
import { Content } from './components/screen/Content';
import { Video } from './components/video/Video';

export default () => {
  const [videoShown, setVideo] = React.useState(false);

  const onClick = () => {
    setVideo(!videoShown);
  };

  return (
    <>
      <Helmet title="Home" />
      <Wrapper />

      <Screen
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
      </Screen>
    </>
  );
}
