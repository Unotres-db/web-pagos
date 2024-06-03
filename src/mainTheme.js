import { createTheme } from '@material-ui/core';
// import { responsiveFontSizes } from '@material-ui/core/styles';

const mainTheme = createTheme ({
    palette: {
    primary: {
      main: "#344955", //"#003594" // "#1C1C49"; azul oscuro "#1C1C49"     "#344955" "#344955" 
    },
    secondary: {
      main:  "#344955",   // "#FF4500" orangered  "#FF4500"  "#F9AA33" "#F57F17"
    },
    tertiary :{
      main: "#344955",
    },
    contrast :{
      main: "#d3d3d3"
    },
  },
  // palette: {
  //   primary: {
  //     main: "#344955" // "#2E4053" //
  //   },
  //   secondary: {
  //     main: "#5499C7", //"#F9AA33",
  //   },
  //   tertiary :{
  //     main: "#3C6E76" 
  //   },
  //   contrast :{
  //     main: "#d3d3d3"
  //   },
  // },
  sectionTitle:{
    fontSize: 14,
    color:"#344955",   //palette.primary
    marginTop:"5px",
    marginLeft:"5px",
    MarginBottom:"5px",
  },
  userPhotoStyle:{
    height: "72px",
    width: "72px",
    alignItems: "center",
    marginTop: "5px",
    marginBottom:"5px",
    marginLeft:"5px",
    marginRigth:"5px",
    display: "block",
    textAlign: "center",
    justifyContent: "center",
  },
  contactPhotoStyle:{
    height: "40px",
    width: "40px",
    alignItems: "center",
    marginTop: "5px",
    marginBottom:"5px",
    marginLeft:"5px",
    marginRigth:"5px",
    display: "block",
    textAlign: "center",
    justifyContent: "center",
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
        fontSize:"11px",
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
    MuiFormHelperText: {
      root: {
      fontSize:'8px',
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
    MuiButton:{
      contained:{
        color: "white", //"#344955",
        fontSize: "11px",
        // [mainTheme.breakpoints.down('xs')]: {
        //   fontSize: "10px"
        // },
        backgroundColor: "#5499C7", //"#F9AA33",
        textTransform: "none",
        // width:"120px",
        height: "30px",
        marginTop: "2px",
        marginLeft:"1px",
        marginRight:"1px",
        "&:hover": {
          backgroundColor: "#437a9f" //"#F49506ed"
        },
      },
      text:{
        color: "#344955",
        fontSize: "11px",
        // [mainTheme.breakpoints.down('xs')]: {
        //   fontSize: "10px"
        // },
        backgroundColor: "#F9AA33",
        textTransform: "none",
        // width:"95px",
        height: "30px",
        marginTop: "2px",
        marginLeft:"2px",
        "&:hover": {
          backgroundColor: "#F49506ed"
        },
      },
    },
    MuiStepLabel:{
      fontSize:9
    },
    MuiFormControlLabel:{
      label:{
        fontSize:11
      } 
    },
    MuiRadio: {
      root: {
        color: '#003594', // Set the custom color for the radio button circle
        '&$checked': {
          color: '#003594', // Set the custom color for the checked radio button circle
        },
      },
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
          color: "#437a9f",//"#F9AA33",

          '&& $icon': {
            opacity: 1,
            color: "white"
          },
        },
        "&$active": {
          color: "#437a9f", //"#F9AA33",

          // && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
          '&& $icon': {
            opacity: 1,
            color: "#437a9f",//"#F9AA33"
          },
        },
        
      },
    }
    },
});
mainTheme.palette.tertiary = mainTheme.palette.augmentColor(mainTheme.palette.tertiary);
mainTheme.palette.contrast = mainTheme.palette.augmentColor(mainTheme.palette.contrast);
export default mainTheme;