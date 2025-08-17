import React from 'react';
import SlajderSlike from "../komponente/SlajderSlike";
import Naslov from "../komponente/Naslov";
import GrafikSveta from "../komponente/GrafikSveta";

const Pocetna = () => {
    return (
        <>
            <Naslov naslov="Dobrodošli na našu stranicu" />
            <GrafikSveta />
            <SlajderSlike />
        </>
    );
};

export default Pocetna;
