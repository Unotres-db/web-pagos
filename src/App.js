import React,{ useState } from 'react';

// import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import { ThemeProvider } from '@material-ui/core';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import { LoginContext } from './helpers/Context';
// import mainTheme from './unotresTheme';
import mainTheme from './mainTheme';
import Routes from './routes.js';
import './global.css';

function App() {

  const [ userData, setUserData ] = useState({userId:"", userPassword:"", userProduct:"", userFirstName:"", userLastName:"", userCountry:"", userCountryName:"", userPhone:"", userBirthday:""})
  // const [ deletionId, setDeletionId ] = useState("");
  // const [ updateId, setUpdateId ]= useState("")
  const [ transactions, setTransactions]= useState([])
  return (
    <LoginContext.Provider value = {{ userData, setUserData,transactions, setTransactions }} >
      {/* <ThemeProvider theme = { mainTheme } > */}
        <Routes />
      {/* </ThemeProvider> */}
    </LoginContext.Provider>
  );
}

export default App;