import React from 'react';
import { Box, Slider } from '@material-ui/core';

function valuetext(value) {
  return `${value}%`;
}

export default function DiscreteSliderLabel({marks, minimumYield, setMinimumYield}) {

  function handleMinimumYield(event, newValue) {
    setMinimumYield(newValue);
  }

  return (
    <Box style={{ marginTop: "15px", width:"95%" }}>
      <Slider
        aria-label = "Always visible"
        defaultValue = {1.55}
        min = {0}
        max = {10}
        getAriaValueText = {valuetext}
        step = {0.1}
        marks = {marks}
        valueLabelDisplay = "on"
        size = "medium"
        value={minimumYield}
        onChange={handleMinimumYield}
      />
    </Box>
  );
}
