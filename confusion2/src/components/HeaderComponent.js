import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,
    Modal, ModalHeader, ModalBody, Button,
    Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { baseUrl } from "../shared/baseUrl";

const NavbarLink = ({to, label, faClass}) => (
    <NavItem>
        <NavLink className="nav-link"  to={to}><span className={faClass}></span> {label}</NavLink>
    </NavItem>
)

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        alert(`user ${this.username.value} is logined in`);
        this.toggleModal();
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src={baseUrl + 'images/logo.png'} height="30" width="41" alt='Ristorante Con Fusion' />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="mr-auto">
                                <NavbarLink to="/home" label="Home" faClass="fa fa-home fa-lg" />
                                <NavbarLink to="/aboutus" label="About Us" faClass="fa fa-info fa-lg" />
                                <NavbarLink to="/menu" label="Menu" faClass="fa fa-list fa-lg" />
                                <NavbarLink to="/contactus" label="Contact Us" faClass="fa fa-address-card fa-lg" />
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button
                                        outline
                                        onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span>
                                        Login
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <br/>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                       innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                       innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                           innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}

export default Header;