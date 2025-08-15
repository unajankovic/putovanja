import React from 'react';
import PropTypes from "prop-types";

const Naslov = (props) => {

    const {naslov} = props;

    return (
        <>
            <div className="one m-3">
                <h1>{naslov}</h1>
            </div>
        </>
    );
};

//prop types

Naslov.propTypes = {
    naslov : PropTypes.string.isRequired,
}

export default Naslov;
