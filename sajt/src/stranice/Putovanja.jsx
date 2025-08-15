import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import useLoggedInUser from "../hooks/useLoggedInUser";
import server from "../komunikacija/server";
import {Row} from "react-bootstrap";
import JednoPutovanje from "../komponente/JednoPutovanje";
import {put} from "axios";

const Putovanja = () => {

    const {loggedIn, user, admin, token}  = useLoggedInUser();
    const [putovanja, setPutovanja] = React.useState([]);
    const [ucitanoPutovanje, setUcitanoPutovanje] = React.useState(null);


    useEffect(() => {
        server.get('/putovanja')
            .then(response => {
                console.log(response.data);
                setPutovanja(response.data.podaci);
            }).catch(error => {
                console.error("Greška prilikom učitavanja putovanja:", error);
            });
    }, []);

    return (
        <>
            <Naslov naslov="Putovanja o kojima sanjate" />
            <Row>
                {
                    putovanja.map(putovanje => (
                        <JednoPutovanje key={putovanje.id} putovanje={putovanje} setUcitanoPutovanje={setUcitanoPutovanje} />
                    ))
                }
            </Row>

        </>
    );
};

export default Putovanja;
