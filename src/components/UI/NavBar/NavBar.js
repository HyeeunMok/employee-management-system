import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';

const navBar = ({ title, user }) => (
  <Navbar bg="dark" variant="dark">
    <StyledNavbarBrand href="/">
      <img
        alt=""
        src="assets/plexxis_logo.png"
        width="145"
        height="70"
        className="d-inline-block align-top"
      />{' '}
      {title}
    </StyledNavbarBrand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Dashboard</Nav.Link>
      <Nav.Link href="/add">Add Employee</Nav.Link>
    </Nav>
    <Navbar.Collapse className="justify-content-end">
      <StyledNavbarText>
        Signed in as: <a href="#login">{user}</a>
      </StyledNavbarText>
    </Navbar.Collapse>
  </Navbar>
);

const StyledNavbarBrand = styled(Navbar.Brand)`
  font-size: 2.8em;
`;

const StyledNavbarText = styled(Navbar.Text)`
  font-size: 1.3em;
  padding-right: 20px;
`;

export default navBar;
