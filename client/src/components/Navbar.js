import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { SHOP_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useContext } from 'react';
import { Context } from '../index.js';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
  const {user} = useContext(Context)
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
          <Nav>
            <Nav.Link href={SHOP_ROUTE}>Shop page</Nav.Link>
            <Nav.Link href="#somePage">page</Nav.Link>
          </Nav>
          {user.isAuth ? 
            <Nav className='ml-auto'>
              <Button className="me-2">Admin panel</Button>
              <Button>Log In</Button>
            </Nav>:
            <Nav.Link href={LOGIN_ROUTE}>
              <Button>Authorization</Button>
            </Nav.Link>//1.28.03 доделать
          }

          {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;