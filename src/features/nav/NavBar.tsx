import React, { FC } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavBar: FC = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/">
          <img
            src="/assets/logo.png"
            style={{ marginRight: '10px' }}
            alt="logo"
          />
          Welcome
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" content="Activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            content="Create Activity"
            positive
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
