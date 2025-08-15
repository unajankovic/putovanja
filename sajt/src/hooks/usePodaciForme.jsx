import React from 'react';

const usePodaciForme = (pocetniPodaci) => {

    const [podaciForme, setPodaciForme] = React.useState(pocetniPodaci);

    const onChangePolja = (e) => {
        const { name, value } = e.target;
        setPodaciForme(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return {
        podaciForme, onChangePolja
    };
}

export default usePodaciForme;
