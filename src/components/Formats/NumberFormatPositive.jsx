import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export default function NumberFormatPositive (props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
        <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
            onChange({
            target: {
                name: props.name,
                value: values.value,
            },
            });
        }}
        decimalSeparator=","
        thousandSeparator="."
        allowNegative={false}
        decimalScale={0}
        allowLeadingZeros={false}
        isNumericString
        prefix=""
        />
    );
  }
  
  NumberFormatPositive.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };