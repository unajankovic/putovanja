import React from 'react';
import {Carousel} from "react-bootstrap";
import explorer from "../slike/explorer.jpg";
import backpack from "../slike/backpack.jpg";
import desert from "../slike/desert.jpg";
import everest from "../slike/everest.jpg";
import hour from "../slike/hour.jpg";
import seal from "../slike/seal.jpg";
import silver from "../slike/silver.jpg";
import wateroflife from "../slike/wateroflife.jpg";


const SlajderSlike = () => {

    const image = [
        {
            "slika": wateroflife,
            "naslov": "Bali, Indonezija",
            "opis": "Jun, 2018."
        },
        {
            "slika": silver,
            "naslov": "Valbona, Albanija",
            "opis": "Januar, 2019."
        },
        {
            "slika": backpack,
            "naslov": "Gruzija, Tbilisi",
            "opis": "Avgust, 2020."
        },
        {
            "slika": hour,
            "naslov": "Berat, Albanija",
            "opis": "Novembar, 2023."
        },
        {
            "slika": desert,
            "naslov": "Oman, Muscat",
            "opis": "Avgust, 2021."
        },
        {
            "slika": seal,
            "naslov": "Ekvador, Galapagos",
            "opis": "Decembar, 2024."
        },
        {
            "slika": everest,
            "naslov": "Nepal, Everest",
            "opis": "Oktobar, 2017."
        },
        {
            "slika": explorer,
            "naslov": "Kings Canyon, Australija",
            "opis": "Jul, 2014."
        }
    ];


    return (
        <>
            <Carousel fade className="mt-3 mb-3">
                {
                    image.map((item, index) => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={item.slika}
                                alt="Slika"
                            />
                            <Carousel.Caption>
                                <h3>{item.naslov}</h3>
                                <p>{item.opis}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </>
    );
};

export default SlajderSlike;
