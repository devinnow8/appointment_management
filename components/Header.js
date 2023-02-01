import Image from "next/image";
import React, { useState } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
} from "reactstrap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarToggle = () => setIsOpen(!isOpen);
  return (
    <header className="header">
      <Container>
        <Navbar>
          <NavbarBrand href="/">
            <Image
              src="/images/logo.svg"
              className="header-img"
              alt=""
              width={156}
              height={56}
            />
          </NavbarBrand>
          <NavbarToggler onClick={navbarToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar></Nav>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
}

export default Header;
