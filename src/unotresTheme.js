import { createTheme } from '@mui/material/styles';

const unotresTheme = createTheme({
  palette: {
    primary: {
      main: '#344955',
    },
    secondary: {
      main: '#E1C16E', // Set a different color for the secondary palette
    },
    tertiary: {
      main: '#F49506', // Set a different color for the tertiary palette
    },
    contrast: {
      main: '#d3d3d3',
    },
  },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true, 
          textTransform: "none"
        },
        styleOverrides: {
          root: {
            fontSize:"13px",
            backgroundColor: "#E1C16E", 
            color: 'white', 
            '&:hover': {
              backgroundColor: '#94804b', 
              color: 'white', 
            },
            '&:disabled': {
              backgroundColor: "#9c978a", //"#F49506ed",
              color: 'white', 
            },
          },
        },
      },
    },
  });

export default unotresTheme;