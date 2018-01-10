import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class Header extends Component {
  render() {
    return (
      <Navbar className='container' color="faded" light expand="md">
        <NavbarBrand href="/">議事録から見る柏市議会議員</NavbarBrand>
      </Navbar>
    );
  }
}

export default Header;
