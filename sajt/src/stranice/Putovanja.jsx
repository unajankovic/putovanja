import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import useLoggedInUser from "../hooks/useLoggedInUser";
import server from "../komunikacija/server";
import {Button, Col, InputGroup, Row, Form} from "react-bootstrap";
import JednoPutovanje from "../komponente/JednoPutovanje";
import {FaArrowLeft, FaSearch, FaUser} from "react-icons/fa";

const Putovanja = () => {

    const {loggedIn, user, admin, token}  = useLoggedInUser();
    const [putovanja, setPutovanja] = React.useState([]);
    const [ucitanoPutovanje, setUcitanoPutovanje] = React.useState(null);
    const [komentari, setKomentari] = React.useState([]);
    const [komentar, setKomentar] = React.useState('');
    const [slikeSaPutovanja, setSlikeSaPutovanja] = React.useState([]);


    useEffect(() => {
        server.get('/putovanja')
            .then(response => {
                console.log(response.data);
                setPutovanja(response.data.podaci);
            }).catch(error => {
                console.error("Greška prilikom učitavanja putovanja:", error);
            });
    }, []);

    useEffect(() => {
        if (ucitanoPutovanje) {
            server.get(`/putovanja/${ucitanoPutovanje.id}/komentari`)
                .then(response => {
                    console.log(response.data);
                    setKomentari(response.data.podaci);
                }).catch(error => {
                    console.error("Greška prilikom učitavanja komentara:", error);
                });
        }
    }, [ucitanoPutovanje]);

    useEffect(() => {
        if (ucitanoPutovanje) {
            server.get(`/putovanja/${ucitanoPutovanje.id}/slike`)
                .then(response => {
                    console.log(response.data);
                    setSlikeSaPutovanja(response.data.podaci);
                }).catch(error => {
                    console.error("Greška prilikom učitavanja slika:", error);
                });
        }
    }, [ucitanoPutovanje]);

    return (
        <>
            <Naslov naslov="Putovanja o kojima sanjate" />
            {
                !ucitanoPutovanje && (
                    <Row>
                        {
                            putovanja.map(putovanje => (
                                <JednoPutovanje key={putovanje.id} putovanje={putovanje} setUcitanoPutovanje={setUcitanoPutovanje} />
                            ))
                        }
                    </Row>
                )
            }

            {
                ucitanoPutovanje && (
                    <>
                        <Row>
                            <Col md={6} className="mb-3">
                                <h1>Detalji putovanja</h1>
                                <div>
                                    <div className="one m-3">
                                        <h1>{ucitanoPutovanje.nazivPutovanja} <hr/> <b>({ucitanoPutovanje.drzava.nazivDrzave})</b></h1>
                                    </div>
                                    <div className="informacije-putovanje">
                                        <p>{ucitanoPutovanje.datumPolaska} / {ucitanoPutovanje.datumPovratka}</p>
                                        <p>{ucitanoPutovanje.opisPutovanja}</p>
                                    </div>
                                    <hr/>
                                    <div className="autor-putovanja mb-3 justify-content-end">
                                        <FaUser />    <i>{ucitanoPutovanje.user.name}</i>
                                    </div>
                                    <Button className="dugme" onClick={() => {
                                        setUcitanoPutovanje(null);
                                        setKomentari([]);
                                        setKomentar('');
                                        setSlikeSaPutovanja([]);
                                    }}>
                                        <FaArrowLeft /> Nazad na listu putovanja
                                    </Button>
                                </div>
                            </Col>
                            <Col md={6} className="mb-3">
                                <h1>Komentari</h1>
                                {
                                    komentari.length > 0 ? (
                                        komentari.map(komentar => (
                                            <div key={komentar.id} className="komentar">
                                                <p><b>{komentar.user.name}</b> ({komentar.datumKomentara}):</p>
                                                <p>{komentar.tekst}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Nema komentara za ovo putovanje.</p>
                                    )
                                }
                                {
                                    loggedIn && (
                                        <>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text>Novi komentar</InputGroup.Text>
                                                <Form.Control as="textarea" onChange={
                                                    (e) => setKomentar(e.target.value)
                                                } aria-label="Novi komentar" />
                                            </InputGroup>
                                            <Button className="dugme" onClick={() => {
                                                if (komentar) {
                                                    server.post(`komentari`, {
                                                        tekst: komentar,
                                                        putovanje_id: ucitanoPutovanje.id,
                                                        datumKomentara : new Date().toISOString().split('T')[0],
                                                        user_id: user.id
                                                    }).then(response => {
                                                        console.log("Komentar dodat:", response.data.podaci);
                                                        setKomentari([...komentari, response.data.podaci]);
                                                    }).catch(error => {
                                                        console.error("Greška prilikom dodavanja komentara:", error);
                                                    });
                                                }
                                            }}>
                                                Dodaj komentar
                                            </Button>
                                        </>

                                    )
                                }
                            </Col>
                            <Col md={12} className="mb-3">
                                <h1>Slike sa putovanja</h1>
                                {
                                    slikeSaPutovanja.length > 0 ? (
                                        <Row>
                                            {
                                                slikeSaPutovanja.map(slike => (
                                                    <Col md={4} key={slike.id} className="mb-3">
                                                        <img src={slike.url} alt={`Slika ${slike.id}`} className="img-thumbnail" />
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    ) : (
                                        <p>Nema slika za ovo putovanje.</p>
                                    )
                                }
                            </Col>
                        </Row>
                    </>
                )
            }

        </>
    );
};

export default Putovanja;
