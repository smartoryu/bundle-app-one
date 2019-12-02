import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Welcome Aboard!</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/* Header Parking-app */}
            {props.Payment > 0 ? (
              <NavbarBrand>
                <b>Parking Fee: </b> Rp {props.Payment},-
              </NavbarBrand>
            ) : null}

            {/* Header Counting-word */}
            {props.Count > 0 ? (
              <NavbarBrand>
                {props.Count} <b>word{props.Count > 1 ? "s" : ""}</b>
              </NavbarBrand>
            ) : null}

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Apps
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/parking-app">Parking-app</DropdownItem>
                <DropdownItem href="/counter-word">Word Counter</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink href="https://github.com/smartoryu/bundle-app-one">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    Duration: state.parkingApp.duration,
    Payment: state.parkingApp.total,
    Count: state.wordCounterApp.count
  };
};

export default connect(mapStateToProps)(Header);
