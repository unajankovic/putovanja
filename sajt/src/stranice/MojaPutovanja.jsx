import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Button, Col, Form, InputGroup, Row, Table} from "react-bootstrap";
import server from "../komunikacija/server";
import useLoggedInUser from "../hooks/useLoggedInUser";
import {FaClock, FaEnvelope, FaMap, FaPaintBrush, FaPlane, FaPlus, FaTextHeight, FaTrash} from "react-icons/fa";
import usePodaciForme from "../hooks/usePodaciForme";
import {FaA, FaLetterboxd, FaTextSlash} from "react-icons/fa6";
import {Bounce, toast, ToastContainer} from "react-toastify";

const MojaPutovanja = () => {

    const [mojaPutovanja, setMojaPutovanja] = React.useState([]);
    const {loggedIn, user, admin, token} = useLoggedInUser();
    const [drzave, setDrzave] = React.useState([]);
    const [izabranoPutovanje, setIzabranoPutovanje] = React.useState(null);
    const [selectedFile, setSelectedFile] = React.useState(null);

    const uploadSlike = (e) => {
        e.preventDefault();

        if (!izabranoPutovanje || !selectedFile) {
            console.error("Nije izabrano putovanje ili fajl.");
            return;
        }

        const formData = new FormData();
        formData.append('slikaFajl', selectedFile);
        formData.append('putovanje_id', izabranoPutovanje);

        server.post('/slike', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
            toast("Slika uspešno upload-ovana!");
            setSelectedFile(null);
        }).catch(error => {
            console.error("Greška prilikom upload-a slike:", error);
        });
    }

    const {podaciForme, onChangePolja} = usePodaciForme(
        {
            nazivPutovanja: '',
            drzava_id: 1,
            opisPutovanja: '',
            datumPolaska: '',
            datumPovratka: ''
        }
    );

    const novoPutovanje = (e) => {
        e.preventDefault();

        const datumPolaska = new Date(podaciForme.datumPolaska);
        const formattedDatumPolaska = datumPolaska.toISOString().split('T')[0];

        const datumPovratka = new Date(podaciForme.datumPovratka);
        const formattedDatumPovratka = datumPovratka.toISOString().split('T')[0];

        server.post('/putovanja', {
            nazivPutovanja: podaciForme.nazivPutovanja,
            drzava_id: podaciForme.drzava_id,
            opisPutovanja: podaciForme.opisPutovanja,
            datumPolaska: formattedDatumPolaska,
            datumPovratka: formattedDatumPovratka,
            user_id: user.id
        }).then(response => {
            console.log(response.data);
            setMojaPutovanja([...mojaPutovanja, response.data.podaci]);
        }).catch(error => {
            console.error("Greška prilikom dodavanja putovanja:", error);
        });
    }

    useEffect(() => {
        if (loggedIn){
            server.get(`/korisnici/${user.id}/putovanja`)
                .then(response => {
                    console.log(response.data);
                    setMojaPutovanja(response.data.podaci);
                }).catch(
                    error => {
                        console.error("Greška prilikom učitavanja mojih putovanja:", error);
                    }
            )
        }
    }, []);

    useEffect(() => {
        server.get('/drzave')
            .then(response => {
                console.log(response.data);
                setDrzave(response.data.podaci);
            }).catch(
                error => {
                    console.error("Greška prilikom učitavanja država:", error);
                }
        )
    }, []);

    return (
        <>
            <Naslov naslov="Moja putovanja" />
            <Row>
                <Col md={12} className="mb-3">
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>Naziv putovanja</th>
                            <th>Drzava</th>
                            <th>Datum polaska</th>
                            <th>Datum povratka</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            mojaPutovanja.map(putovanje => (
                                <tr key={putovanje.id}>
                                    <td>{putovanje.nazivPutovanja}</td>
                                    <td>{putovanje.drzava.nazivDrzave}</td>
                                    <td>{new Date(putovanje.datumPolaska).toLocaleDateString()}</td>
                                    <td>{new Date(putovanje.datumPovratka).toLocaleDateString()}</td>
                                    <td>
                                        <Button className="btn dugme" onClick={
                                            () => {
                                                server.delete(`/putovanja/${putovanje.id}`).then(
                                                    response => {
                                                        console.log(response.data);
                                                        setMojaPutovanja(mojaPutovanja.filter(p => p.id !== putovanje.id));
                                                    }
                                                ).catch(
                                                    error => {
                                                        console.error("Greška prilikom brisanja putovanja:", error);
                                                    }
                                                )
                                            }
                                        }>
                                            <FaTrash/>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
                <Col md={6} className="mb-3">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FaPlane /></InputGroup.Text>
                        <Form.Control
                            placeholder="Naziv putovanja"
                            aria-label="Naziv putovanja"
                            aria-describedby="basic-addon1"
                            type="text"
                            name="nazivPutovanja"
                            value={podaciForme.nazivPutovanja}
                            onChange={onChangePolja}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2"><FaMap /></InputGroup.Text>
                        <Form.Select aria-label="Drzava" name='drzava_id' value={podaciForme.drzava_id} onChange={ onChangePolja}>
                            {
                                drzave.map(drzava => (
                                    <option key={drzava.id} value={drzava.id}>
                                        {drzava.nazivDrzave}
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><FaA /></InputGroup.Text>
                        <Form.Control as="textarea" name="opisPutovanja" onChange={onChangePolja} value={podaciForme.opisPutovanja} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><FaClock /></InputGroup.Text>
                        <Form.Control
                            placeholder="Datum polaska"
                            aria-label="Datum polaska"
                            aria-describedby="basic-addon3"
                            type="date"
                            name="datumPolaska"
                            value={podaciForme.datumPolaska}
                            onChange={onChangePolja}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon4"><FaClock /></InputGroup.Text>
                        <Form.Control
                            placeholder="Datum povratka"
                            aria-label="Datum povratka"
                            aria-describedby="basic-addon4"
                            type="date"
                            name="datumPovratka"
                            value={podaciForme.datumPovratka}
                            onChange={onChangePolja}
                        />
                    </InputGroup>
                    <hr/>
                    <Button className="btn dugme" onClick={
                        novoPutovanje
                    }>
                        <FaPlus /> Dodaj novo putovanje
                    </Button>
                </Col>

                <Col md={6} className="mb-3">
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FaPlane /></InputGroup.Text>
                            <Form.Select aria-label="Putovanje" name='izabranoPutovanje' onChange={(event) => {
                                const putovanjeId = parseInt(event.target.value);
                                if (putovanjeId !== 0) {
                                    setIzabranoPutovanje(putovanjeId);
                                }
                            }}>
                                {
                                    mojaPutovanja.length > 0 ? (
                                        <>
                                            <option value="0">Izaberite putovanje</option>
                                            {
                                                mojaPutovanja.map(putovanje => (
                                                    <option key={putovanje.id} value={putovanje.id}>
                                                        {putovanje.nazivPutovanja} ({putovanje.drzava.nazivDrzave})
                                                    </option>
                                                ))
                                            }
                                        </>
                                    ) : (
                                        <option value="0">Nemate putovanja</option>
                                    )
                                }
                            </Form.Select>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FaPaintBrush/></InputGroup.Text>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setSelectedFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </InputGroup>
                        <hr/>
                        <Button className="btn dugme" onClick={
                            uploadSlike
                        }>
                            Upload slike
                        </Button>
                    </Form>
                </Col>
            </Row>
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

export default MojaPutovanja;
