import React, { FC, useContext } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/ActivityStore';

const NavBar: FC = () => {
  const { openForm } = useContext(ActivityStore);
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item>
          <img
            src="/assets/logo.png"
            style={{ marginRight: '10px' }}
            alt="logo"
          />
          Activities
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={openForm}
            content="Create Activity"
            positive
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
