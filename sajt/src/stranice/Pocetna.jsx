import React from 'react';
import SlajderSlike from "../komponente/SlajderSlike";
import Naslov from "../komponente/Naslov";

const Pocetna = () => {
    return (
        <>
            <Naslov naslov="Dobrodošli na našu stranicu" />
            <SlajderSlike />
        </>
    );
};

export default Pocetna;
