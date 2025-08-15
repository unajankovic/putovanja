import React from 'react';
import Naslov from "../komponente/Naslov";
import {Col, Row} from "react-bootstrap";
import onama from "../slike/onama.jpeg";

const ONama = () => {
    return (
        <>
            <Naslov naslov="Rekli su o nama" />
            <Row>
                <Col md={4}>
                    <img src={onama} alt="O nama" className="img-fluid" />
                </Col>
                <Col md={8} className="text-start">
                    <section id="o-nama">
                        <h2>🌍 O nama</h2>
                        <p>Mi smo <strong>Una</strong>, <strong>Teodora</strong> i <strong>Marija</strong> – tri prijateljice koje spaja ista strast: putovanja. Zajedno smo obišle mnoge destinacije, od skrivenih sela do užurbanih metropola, uvek u potrazi za autentičnim doživljajima, lokalnim ukusima i pričama koje se pamte.</p>
                        <p>Naše avanture nisu uvek bile savršene – nekad smo spavale u šatorima, nekad u luksuznim hotelima, ali uvek sa osmehom, radoznalošću i željom da upoznamo svet iz prve ruke.</p>
                        <p>Zato smo odlučile da pokrenemo <strong>Zavrti Globus</strong> – mesto gde ćemo deliti iskustva sa naših putovanja, iskrene preporuke, savete iz prve ruke i fotografije koje pričaju više od reči.</p>
                    </section>

                    <section id="o-sajtu">
                        <h2>🧳 O sajtu Zavrti Globus</h2>
                        <p><strong>Zavrti Globus</strong> je blog koji vas vodi kroz naše lične priče sa puta – šta smo videle, gde smo boravile, kako smo planirale i zašto mislimo da bi i vi trebalo da posetite ta mesta.</p>
                        <p>Naći ćete tekstove o:</p>
                        <ul>
                            <li>destinacijama koje su nas osvojile (i zašto),</li>
                            <li>mestima za smeštaj koja vredi rezervisati (ili izbeći),</li>
                            <li>lokalnim jelima i ljudima koje nećemo zaboraviti,</li>
                            <li>praktičnim savetima za putovanje – od pakovanja do kulturnih razlika.</li>
                        </ul>
                        <p>Ako volite da istražujete svet na autentičan način, van šablona turističkih vodiča, pridružite nam se. Zajedno ćemo zavrteti globus i možda vas baš sledeća priča inspiriše da spakujete kofere. 🌎✈️</p>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default ONama;
