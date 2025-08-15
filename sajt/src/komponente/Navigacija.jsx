import React from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {BiGlobe} from "react-icons/bi";
import {FaGlobe} from "react-icons/fa";
import logo from "../slike/logo-no-bg.png";
import useLoggedInUser from "../hooks/useLoggedInUser";

const Navigacija = () => {

    const {loggedIn, user, admin, token}  = useLoggedInUser();

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="/"><Image src={logo} width="120px" height="120px" alt="ZavrstiGlobus" /> </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Početna</Nav.Link>
                        <Nav.Link href="/o-nama">O nama</Nav.Link>
                        <Nav.Link href="/putovanja">Putovanja</Nav.Link>
                        <Nav.Link href="/kontakt">Kontakt</Nav.Link>
                        {
                            loggedIn ? (
                                <>
                                    <Nav.Link href="/moja-putovanja">Moja putovanja</Nav.Link>
                                    {
                                        admin && <Nav.Link href="/admin-strane">Admin</Nav.Link>
                                    }
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/prijava">Prijava</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                    {
                        user ? (
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    Ulogovani korisnik: <b>{ user.name}</b>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        ) : null
                    }
                </Container>
            </Navbar>
        </>
    );
};

export default Navigacija;
