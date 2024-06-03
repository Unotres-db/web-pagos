import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';

const CurrencyOptions = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('guaranies');

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="currency"
        name="currencyOptions"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        row
        color="secondary"
      >
        <FormControlLabel
          value="guaranies"
          control={<Radio />}
          label={<Typography style={{ fontSize: '10px', color: '#344955' }}>Mostrar Montos en millones de Guaraníes</Typography>}
          
        />
        <FormControlLabel
          value="dollars"
          control={<Radio />}
          label={<Typography style={{ fontSize: '9px', color: '#344955' }}>Mostrar Montos en Dólares</Typography>}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CurrencyOptions;
