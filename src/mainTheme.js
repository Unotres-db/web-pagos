import { createTheme } from '@material-ui/core';
// import { responsiveFontSizes } from '@material-ui/core/styles';

const mainTheme = createTheme ({
  palette: {
    primary: {
      main:  "#344955"
    },
    secondary: {
      main: "#F9AA33" 
    },
    tertiary :{
      main: "#3C6E76" 
    },
    contrast :{
      main: "#d3d3d3"
    },
    
  },
  overrides: {
    MuiTextField: {
      root:{
        variant:'filled',
        margin:'dense',
        size:'small',
      }
    },
    MuiInputLabel: {
      root: {
        color: '#808080',
        "&$focused": {
          color: "#1C1C49"
        },
        fontSize:'10px',
      },
    },  
    MuiFilledInput:{
      root: { 
        color: "#1C1C49", 
        fontSize:'12px',
        backgroundColor: "white",
        "&:hover": {
          color:"#1C1C49",
          backgroundColor:"#D3D3D3",
        },
        "&$focused": { // increase the specificity for the pseudo class
          color:"blue",
          backgroundColor: "white"
        },
        "&$disabled": {
          color:"#1C1C49",
          backgroundColor: "white"
        },  
      }
      },
    MuiInput:{
      root: { 
        color: "344955", //#1C1C49
        backgroundColor: "white",
        "&:hover": {
          color:"#1C1C49",
          backgroundColor:"#D3D3D3",
        },
        "&$focused": { 
          color:"blue",
          backgroundColor: "white"
        },
        "&$disabled": { 
          color:"#1C1C49",
          backgroundColor: "white"
        },  
      },
    },
    MuiSelectOutlined:{
      color: "#1C1C49",
      backgroundColor: "white"
      
    },
    MuiStepLabel:{
      fontSize:9
    },
    MuiFormControlLabel:{
      label:{
        fontSize:11
      } 
    },
    MuiSlider:{
      markLabel : {
        fontSize:11
      },
    },
    MuiTableCell:{
      root:{
        MuiTableCell:{
          body:{
            fontsize:8
          },
        }
      }
    },
    MuiTableSortLabel: {
      root: {
        color: "white",
        // if you want to have icons visible permanently
        '& $icon': {
          opacity: 1,
          color: "gray"
        },
        "&:hover": {
          color: "#F9AA33",

          '&& $icon': {
            opacity: 1,
            color: "white"
          },
        },
        "&$active": {
          color: "#F9AA33",

          // && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
          '&& $icon': {
            opacity: 1,
            color: "#F9AA33"
          },
        },
        
      },
    }
    },   //overrides
});
mainTheme.palette.tertiary = mainTheme.palette.augmentColor(mainTheme.palette.tertiary);
mainTheme.palette.contrast = mainTheme.palette.augmentColor(mainTheme.palette.contrast);
export default mainTheme;