import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Box, Button, Hidden, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

// import mainLogo from '../assets/Logo.svg';
import mainLogo from '../assets/UnoTresLogo.jpg';

const useStyles = makeStyles((mainTheme) => ({
root: {
    display: 'flex',
  },  
grow:{
    flexGrow: 1
  },
buttonMenuStyle: {
  display: 'inline-block',
  padding: 6,
  minWidth: 0,
  color: "white",
  backgroundColor:"#7b7d7b", //mainTheme.palette.primary.main,
  textTransform:"none",
  margin: "2px",
  fontSize:"13px",
  "&:hover": {
    color:"white",//mainTheme.palette.secondary.main,
    backgroundColor:"#7b7d7b", //mainTheme.palette.primary.main,
  }
},
buttonDrawerStyle: {
  color: "white",
  textTransform:"none",
  "&:hover": {
    color:mainTheme.palette.secondary.main
  },
},
logoStyle: {
  position: "relative",
  height: "45px",
  // padding: "24px",
  top:"5px"
},
toolbarButtons: {
  marginLeft: 'auto',
},
drawer: {
  width: '240',
  flexShrink: 0,
},
drawerPaper: {
  width: '240',
  color: 'white',
  backgroundColor:"#7b7d7b", // mainTheme.palette.primary.main
},
drawerContainer: {
  overflow: 'auto',
},
drawerText:{
  fontSize:"13px"
}
})); 

function Header() {

  const classes = useStyles();
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
  const dividerOption = 6;
  const menuOptions = [
    { id:0,
      title:"Principal",
      route:"/home"
    },
    { id:1,
      title:"Proyectos",
      route:"/project"
    },
    { id:2,
      title:"Proyectos de la Competencia",
      route:"/competition-data"
    },
    { id:3,
      title:"Rolling Forecast",
      route:"/rolling-forecast"
    },
    { id:4,
      title:"Valuation",
      route:"/project"
    },
    { id:5,
      title:"Balances y EERR",
      route:"/project"
    },
    { id:6,
      title:"Iniciar Sesión",
      route:"/login"
    }
  ]

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
  <>
  <AppBar position="fixed" style={{top:'0px', height: '64px'}}>
    <Toolbar style={{minWidth:'360',height: '64px',paddingLeft:'24px', backgroundColor:"#7b7d7b"}}>

      <Link to={menuOptions[0].route}>
        <img src = {mainLogo} alt="Logo" className={classes.logoStyle} />
      </Link>
      <Hidden smDown>
        <Box style={{ width: '20px' }}/> 
        {/* size="small"    */}
        { menuOptions.map ( (currElement) => (
          <>
          { dividerOption===currElement.id? <div className={classes.grow} />: null}
          <Button component={Link} to={menuOptions[currElement.id].route} className={classes.buttonMenuStyle}disableRipple>{menuOptions[currElement.id].title}</Button>
          </>
        ))} 
      </Hidden>

      <div className={classes.toolbarButtons}> 
        <Hidden mdUp>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </div> 
    </Toolbar>
  </AppBar>

  <Hidden mdUp>
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="right"
      open={isDrawerOpen}
      onClose={handleDrawerClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
    <div className={classes.drawerContainer}>
      <List>
        { menuOptions.map ( (currElement) => (
          <>
            { dividerOption===currElement.id? <Divider /> : null}
            <ListItem button component={Link} to={menuOptions[currElement.id].route} disableRipple className={classes.buttonDrawerStyle}>
              <ListItemText primary={menuOptions[currElement.id].title} disableTypography className={classes.drawerText}/>
            </ListItem>
          </>
        ))} 
      </List>
    </div>
    </Drawer>
  </Hidden>
  </>
  )
}
export default memo(Header)
