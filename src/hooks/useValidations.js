import React from 'react';

export default function useValidations(value){

  function noBlanks (value) {
    if (value === "") {
      return {
        valid: false,
        message: "Required information"
      }
    } 
    return {valid: true}
  }

  function positiveValue (value) {
    if (value === "") {
      return {
        valid: false,
        message: "Required information"
      }
    } 
    if (value < 0) {
      return {
        valid: false,
        message: "Negative numbers are not allowed"
      }
    }
    return {valid: true}
  }
  return { noBlanks, positiveValue } 
}