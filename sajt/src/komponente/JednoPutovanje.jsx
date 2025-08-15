import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col} from "react-bootstrap";
import {FaSearch, FaSearchLocation, FaUser} from "react-icons/fa";
import {TiUser} from "react-icons/ti";
import useLoggedInUser from "../hooks/useLoggedInUser";

const JednoPutovanje = props => {
    const { putovanje, setUcitanoPutovanje } = props;
    const { loggedIn, user, admin, token } = useLoggedInUser();
    return (
        <>
            <Col md={6} className="mb-3">
                <div className="jedno-putovanje">
                    <div className="one m-3">
                        <h1>{putovanje.nazivPutovanja} <hr/> <b>({putovanje.drzava.nazivDrzave})</b></h1>
                    </div>
                    <div className="informacije-putovanje">
                        <p>{putovanje.datumPolaska} / {putovanje.datumPovratka}</p>
                        <p>{putovanje.opisPutovanja}</p>
                        {
                            loggedIn && (
                                <>
                                    <Button onClick={
                                        () => setUcitanoPutovanje(putovanje)
                                    } className="btn dugme">
                                        Detalji <FaSearch />
                                    </Button>
                                </>
                            )
                        }

                        {
                            !loggedIn && (
                                <>
                                    <a href="/prijava" className="btn dugme">
                                        Prijavite se za detalje <FaSearch />
                                    </a>
                                </>
                            )
                        }
                    </div>
                    <hr/>
                    <div className="autor-putovanja mb-3 justify-content-end">
                         <FaUser />    <i>{putovanje.user.name}</i>
                    </div>

                </div>
            </Col>
        </>
    );
};

JednoPutovanje.propTypes = {
    putovanje : PropTypes.object.isRequired,
    setUcitanoPutovanje : PropTypes.func.isRequired
};

export default JednoPutovanje;
