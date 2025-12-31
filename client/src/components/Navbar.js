import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { SHOP_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, BASKET_ROUTE } from '../utils/consts';
import { useContext } from 'react';
import { Context } from '../index.js';
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem("token")
  }

  return (
    <Navbar bg="light" style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
          <Nav>
            <Nav.Link href={SHOP_ROUTE}>Shop page</Nav.Link>
            <Nav.Link href={BASKET_ROUTE}>Busket</Nav.Link>
          </Nav>

          {user.isAuth ? 
            <Nav className='ml-auto'>
              <Button 
                className="me-2"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Admin panel
              </Button>

              <Button 
                onClick={() => logOut()}
              >
                Log out
              </Button>
            </Nav>
            :
            <Nav.Link href={LOGIN_ROUTE}>
              <Button>Authorization</Button>
            </Nav.Link>
          }
            
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;