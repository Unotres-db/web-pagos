import React from 'react';
import { Box, Slider } from '@material-ui/core';

const marks = [
  {
    value: 0,
    label: '0 %',
  },
  {
    value: 1,
    label: '1%',
  },
  {
    value: 2,
    label: '2%',
  },
  {
    value: 3,
    label: '3%',
  },
  {
    value: 4,
    label: '4%',
  },
  {
    value: 5,
    label: '5%',
  },
  {
    value: 6,
    label: '6%',
  },
  {
    value: 7,
    label: '7%',
  },
  {
    value: 8,
    label: '8%',
  },
  {
    value: 9,
    label: '9%',
  },
  {
    value: 10,
    label: '10%',
  },
];

function valuetext(value) {
  return `${value}%`;
}

export default function DiscreteSliderLabel() {
  return (
    // <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={1.55}
        min = {0}
        max = {10}
        getAriaValueText={valuetext}
        step = {0.1}
        marks={marks}
        valueLabelDisplay="on"
        size="medium"
      />
    // </Box>
  );
}
