import React, { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading: FC = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
};

export default Loading;
