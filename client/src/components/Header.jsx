import React from "react";
import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logoT from "../assets/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
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
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
