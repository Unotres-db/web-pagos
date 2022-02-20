import { createTheme } from '@material-ui/core';
// import { responsiveFontSizes } from '@material-ui/core/styles';

const mainTheme = createTheme ({
  palette: {
    primary: {
      main: "#344955" //azul oscuro "#1C1C49"     "#344955" "#344955" 
    },
    secondary: {
      main: "#F9AA33"    //orangered  "#FF4500"  "#F9AA33" "#F57F17"
    }
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
        fontSize:'12px',
      },
    },  
    MuiFilledInput:{
      root: { 
        color: "#1C1C49", 
        fontSize:'14px',
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
          }
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

export default mainTheme;