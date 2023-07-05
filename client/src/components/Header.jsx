import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logoT from "../assets/logo.png";
import { useSelector,useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import {logout} from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const {userInfo} =useSelector((state)=>state.auth);
 const dispatch=useDispatch();
 const navigate=useNavigate();

 const [logoutApiCall]=useLogoutMutation();

  const logoutHandler=async ()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              style={{ display: "flex", alignItems: "center", color: "#fff" }}
            >
              <img
                src={logoT}
                alt="logo"
                style={{ height: "30px", marginRight: "10px" }}
              />
              TechieShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link
                  style={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaShoppingCart style={{ marginRight: "5px" }} />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                <Nav.Link
                  style={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaUser style={{ marginRight: "5px" }} />
                  Login
                </Nav.Link>
              </LinkContainer>) }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
