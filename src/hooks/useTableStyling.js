import { useTheme } from '@mui/material/styles';
import mainTheme from '../mainTheme';

export default function useTableStyling () {
  const theme = useTheme(mainTheme);
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const tertiary = "#3C6E76";
  // const primary="#344955";
  // const secondary="#F9AA33";
  // const tertiary="#3C6E76";

  function defineYearsColWidth ( assumptions, isCheckedShowPreviousYears) {
    if (isCheckedShowPreviousYears){
      return (0.78/(+assumptions.cashFlowDiscretePeriod + 3)*100).toString + "%"
    } 
    return (0.78/(+assumptions.cashFlowDiscretePeriod)*100).toString + "%"
  }

  function defineYearsColColor ( index, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder ) {
    // const primary="#344955";
    // const secondary="#F9AA33";
    // const tertiary="#3C6E76";
    if (isCheckedShowPreviousYears){
      if (isCheckedDescOrder) {
        if (index < assumptions.cashFlowDiscretePeriod){
          return secondary
        } 
        return "whitesmoke"; 
      } if (index < 3) {
          return "whitesmoke"; 
        } 
        return secondary;
    } 
      return secondary;
  }

  function defineYearsColBackColor ( index, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder ) {
    const primary="#344955";
    const secondary="#F9AA33";
    const tertiary="#3C6E76";
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder) {
      if (index < assumptions.cashFlowDiscretePeriod) { 
        return primary;
      } 
      return tertiary;
    } if (index < 3) {
        return tertiary;
      } 
      return primary;
  } return primary;
  }

  function defineNumberFormat ( number, style, showAsBlankIfZero, isEstimateFcffOnly ){
    
    if (isEstimateFcffOnly && showAsBlankIfZero[0])  {
      if (number[0] === 0.00 ) {
        return ""
      }
      if (style[0] === "percent") {
        return Intl.NumberFormat('en-US',{style:"percent", minimumFractionDigits:1,maximumFractionDigits:1}).format(number/100);
      } else {
          return Intl.NumberFormat('en-US',{style:"decimal", minimumFractionDigits:1,maximumFractionDigits:1}).format(number);
        }
    } 
    if (number[0] === 0.00 ) {
      return ""
    }
    if (style[0] === "percent") {
        return Intl.NumberFormat('en-US',{style:"percent", minimumFractionDigits:1,maximumFractionDigits:1}).format(number/100); 
    } else { 
        return Intl.NumberFormat('en-US',{style:"decimal", minimumFractionDigits:1,maximumFractionDigits:1}).format(number); 
      }
  }

  return { defineYearsColWidth, defineYearsColColor, defineYearsColBackColor, defineNumberFormat }
}

