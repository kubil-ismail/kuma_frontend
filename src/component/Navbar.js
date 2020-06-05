import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'

export default function Navbars() {
  return (
    <Navbar color="white" light expand="md" className="shadow-sm fixed-top">
      <Container>
        <Nav className="mr-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              All Categories
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              All Time
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <InputGroup className="px-5">
          <InputGroupAddon addonType="prepend">
          </InputGroupAddon>
          <Input placeholder="Search Book..." />
        </InputGroup>
        <NavbarBrand>
          <Link to="/">
            <img src={logo} width="40" /> My Library
          </Link>
        </NavbarBrand>
      </Container>
    </Navbar>
  )
}
