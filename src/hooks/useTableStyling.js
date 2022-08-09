import { useTheme } from "@material-ui/core";

export default function useTableStyling () {
  const theme = useTheme();

  function defineYearsColWidth ( assumptions, isCheckedShowPreviousYears) {
    if (isCheckedShowPreviousYears){
      return (0.78/(+assumptions.cashFlowDiscretePeriod + 3)*100).toString + "%"
    } 
    return (0.78/(+assumptions.cashFlowDiscretePeriod)*100).toString + "%"
  }

  function defineYearsColColor ( index, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder ) {

    if (isCheckedShowPreviousYears){
      if (isCheckedDescOrder) {
        if (index < assumptions.cashFlowDiscretePeriod){
          return theme.palette.secondary.main
        } 
        return "whitesmoke"; 
      } if (index < 3) {
          return "whitesmoke"; 
        } 
        return theme.palette.secondary.main;
    } 
      return theme.palette.secondary.main;
  }

  function defineYearsColBackColor ( index, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder ) {

  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder) {
      if (index < assumptions.cashFlowDiscretePeriod) { 
        return theme.palette.primary.main;
      } 
      return theme.palette.tertiary.main;
    } if (index < 3) {
        return theme.palette.tertiary.main;
      } 
      return theme.palette.primary.main;
  } return theme.palette.primary.main;
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

