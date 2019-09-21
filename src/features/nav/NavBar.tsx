import React, { FC } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';

interface IProps {
  handleOpenForm: () => void;
}
const NavBar: FC<IProps> = ({ handleOpenForm }) => {
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
            onClick={() => handleOpenForm()}
            content="Create Activity"
            positive
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
