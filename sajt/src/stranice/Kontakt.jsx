import React from 'react';
import {Col, Row} from "react-bootstrap";
import {FaAddressBook, FaEnvelope, FaPhone} from "react-icons/fa";

const Kontakt = () => {

    return (
        <div>
            <Row>
                <Col md={12} className="mb-5">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.1450491501637!2d20.45650677604715!3d44.80988477685757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aaeb2fd7065%3A0xddae96a552a1634!2sBalkanska%2034%2C%20Beograd!5e1!3m2!1sen!2srs!4v1755269580285!5m2!1sen!2srs"
                        width="100%" height="600px" style={
                        {
                            border: 0
                        }
                    } allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Col>

                <Col md={12}>
                    <h1 className="text-center mb-5">Kontaktirajte nas</h1>
                    <div className="kontakt-info">
                        <p><b><FaAddressBook /> </b> Balkanska 34, Beograd</p>
                        <p><b><FaPhone /></b> +381 11 1234567</p>
                        <p><b><FaEnvelope /></b>
                            <a href="mailto:unajankovic@zavrti-globus.rs">
                                Posaljite email
                            </a>
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Kontakt;
