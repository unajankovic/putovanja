import React from 'react';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FaEnvelope, FaStar, FaUser} from "react-icons/fa";
import Naslov from "../komponente/Naslov";
import usePodaciForme from "../hooks/usePodaciForme";
import server from "../komunikacija/server";
import {Bounce, toast, ToastContainer} from "react-toastify";

const Prijava = () => {

    const [prikaziPrijavu, setPrikaziPrijavu] = React.useState(true);

    const {podaciForme, onChangePolja} = usePodaciForme(
        {
            ime: '',
            email: '',
            password: ''
        }
    );

    const login = (e) => {
        e.preventDefault();

        server.post('/prijava', {
            email: podaciForme.email,
            password: podaciForme.password
        }).then(response => {
            console.log(response.data);

            const token = response.data.podaci.token;
            const user = response.data.podaci.korisnik;

            window.sessionStorage.setItem('token', token);
            window.sessionStorage.setItem('user', JSON.stringify(user));
            window.sessionStorage.setItem('loggedIn', true);
            window.location.href = '/';
        }).catch(error => {
            console.error("Greška prilikom prijave:", error);
            toast("Došlo je do greške prilikom prijave. Molimo pokušajte ponovo.")
        })
    }

    const registracija = (e) => {
        e.preventDefault();

        server.post('/registracija', {
            name: podaciForme.ime,
            email: podaciForme.email,
            password: podaciForme.password
        }).then(response => {
            console.log(response.data);
            toast("Uspešno ste se registrovali! Sada se možete prijaviti.");
            setPrikaziPrijavu(true);
        }).catch(error => {
            console.error("Greška prilikom registracije:", error);
            toast("Došlo je do greške prilikom registracije. Molimo pokušajte ponovo.")
        })
    }

    return (
        <>
            <Naslov naslov="Prijava na našu stranicu" />
            {
                prikaziPrijavu && (
                    <>
                        <Form>
                            <Row>
                                <Col md={6} className="mx-auto">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><FaEnvelope /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Email adresa"
                                            aria-label="Email adresa"
                                            aria-describedby="basic-addon1"
                                            type="email"
                                            name="email"
                                            value={podaciForme.email}
                                            onChange={onChangePolja}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={6} className="mx-auto">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2"><FaStar /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Password"
                                            aria-label="Password"
                                            type="password"
                                            aria-describedby="basic-addon2"
                                            name="password"
                                            value={podaciForme.password}
                                            onChange={onChangePolja}
                                        />
                                    </InputGroup>
                                </Col>
                                <hr/>
                                <Col md={12} className="mx-auto">
                                    <Button className="btn dugme mx-auto" onClick={login}>Prijavi se</Button>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <p className="mt-3">
                                        Nemate nalog? <a href="/" onClick={
                                        (e) => {
                                            e.preventDefault();
                                            setPrikaziPrijavu(false);
                                        }
                                    }>Registrujte se</a>
                                    </p>
                                </Col>
                            </Row>
                        </Form>
                    </>
                )
            }

            {
                !prikaziPrijavu && (
                    <>
                        <Form>
                            <Row>
                                <Col md={12} className="mx-auto">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon0"><FaUser /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Ime i prezime"
                                            aria-label="Ime i prezime"
                                            aria-describedby="basic-addon1"
                                            name="ime"
                                            value={podaciForme.ime}
                                            onChange={onChangePolja}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={6} className="mx-auto">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><FaEnvelope /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Email adresa"
                                            aria-label="Email adresa"
                                            aria-describedby="basic-addon1"
                                            name="email"
                                            value={podaciForme.email}
                                            onChange={onChangePolja}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={6} className="mx-auto">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2"><FaStar /></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Password"
                                            aria-label="Password"
                                            aria-describedby="basic-addon2"
                                            name="password"
                                            value={podaciForme.password}
                                            onChange={onChangePolja}
                                        />
                                    </InputGroup>
                                </Col>
                                <hr/>
                                <Col md={12} className="mx-auto">
                                    <Button className="btn dugme mx-auto" onClick={registracija}>Registruj se</Button>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <p className="mt-3">
                                        Imate nalog? <a href="/" onClick={
                                        (e) => {
                                            e.preventDefault();
                                            setPrikaziPrijavu(true);
                                        }
                                    }>Prijavite se</a>
                                    </p>
                                </Col>
                            </Row>
                        </Form>
                    </>
                )
            }

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
};

export default Prijava;
