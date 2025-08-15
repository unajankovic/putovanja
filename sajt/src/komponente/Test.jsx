import React from 'react';
import PropTypes from 'prop-types';

const Test = props => {

    const { naslov, opis } = props;

    return (
        <div>

        </div>
    );
};

Test.propTypes = {
    naslov : PropTypes.string.isRequired,
    opis : PropTypes.string.isRequired,
};

export default Test;
