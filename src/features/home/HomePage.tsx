import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const HomePage = () => {
  return (
    <Container style={{ marginTop: '7em' }}>
      home page
      <h2>
        go to <Link to="/activities">Activities</Link>
      </h2>
    </Container>
  );
};

export default HomePage;
