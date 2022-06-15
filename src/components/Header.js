import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Box, Button, Hidden, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import mainLogo from '../assets/logo-valuationsweb-min.svg';
// import mainLogo from '../assets/logo-valuationsweb2.svg';
// import mainLogo from '../assets/logovw.svg';
// import mainLogo from '../assets/quo.png';

const useStyles = makeStyles( (mainTheme) => ({
buttonMenuStyle: {
  display: 'inline-block',
  padding: 6,
  // minHeight: 0,
  minWidth: 0,
  color: "white",
  backgroundColor:mainTheme.palette.primary.main,
  textTransform:"none",
  margin: "2px",
  "&:hover": {
    color:mainTheme.palette.secondary.main,
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
  top:"0px"
},
grow:{
  flexGrow: 1
},
toolbarButtons: {
  marginLeft: 'auto',
},
root: {
  display: 'flex',
},
drawer: {
  width: '240',
  flexShrink: 0,
},
drawerPaper: {
  width: '240',
  color: 'white',
  backgroundColor:mainTheme.palette.primary.main
},
drawerContainer: {
  overflow: 'auto',
}
})); 

function Header() {

  const classes = useStyles();
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
  const menuOptions = [
    { id:0,
      title:"Home",                   //  "Home"  //  "Principal"  //  "Principal"
      route:"/home"
    },
    { id:1,
      title:"Company Data",           //  "Company Data"  //  "Dados de Empresas"  //  "Datos de Empresas"
      route:"/company-data"
    },
    { id:2,
      title:"Dividend Yield Model",   //  "Dividend Yield Model"  //  "Modelo Bazin"  //  "Dividendos"
      route:"/dividend-yield"
    },
    { id:3,
      title:"Graham Model",           //  "Graham Model"  //  "Modelo Graham"  //  "Modelo Graham"
      route:"/graham"
    },
    { id:4,
      title:"Valuation",              // 
      route:"/valuation"
    },
    { id:5,
      title:"Books",                 //  "Books"  //  Livros"  //  "Libros"
      route:"/books"
    },
    { id:6,
      title:"Pricing",
      route:"/pricing"
    },
    { id:7,
      title:"Who Am I",             //  "Quem Sou"  //  "Quien Soy"
      route:"/who-we-are"
    },
    { id:8,
      title:"Contact",              //  "Contato"  //  "Contacto"
      route:"/contact"
    },
    { id:9,
      title:"Login",               //  "Login"  //  "Iniciar Sessão"  //  "Iniciar Sesión"
      route:"/login"
    },
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
    <Toolbar style={{minWidth:'360',height: '64px',paddingLeft:'24px'}}>

      <Link to={menuOptions[0].route}>
        <img src = {mainLogo} alt="Logo" className={classes.logoStyle} />
      </Link>
      <Hidden smDown>
        <Box style={{ width: '20px' }}/>    
          <Button component={Link} to={menuOptions[0].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[0].title}</Button>
          <Button component={Link} to={menuOptions[1].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[1].title}</Button>
          <Button component={Link} to={menuOptions[2].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[2].title}</Button>
          <Button component={Link} to={menuOptions[3].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[3].title}</Button>
          <Button component={Link} to={menuOptions[4].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[4].title}</Button>
          <Button component={Link} to={menuOptions[5].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[5].title}</Button>
          <Button component={Link} to={menuOptions[6].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[6].title}</Button>
          <div className={classes.grow} />
          <Button component={Link} to={menuOptions[7].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[7].title}</Button>
          <Button component={Link} to={menuOptions[8].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[8].title}</Button>
          <Button component={Link} to={menuOptions[9].route} className={classes.buttonMenuStyle} size="small" disableRipple>{menuOptions[9].title}</Button>
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
          <ListItem button component={Link} to={menuOptions[0].route} disableRipple className={classes.buttonDrawerStyle}>
            <ListItemText primary={menuOptions[0].title} />
          </ListItem>
          <ListItem button component={Link} to={menuOptions[1].route} disableRipple className={classes.buttonDrawerStyle}>
            <ListItemText primary={menuOptions[1].title} />
          </ListItem> 
          <ListItem button component={Link} to={menuOptions[2].route} disableRipple className={classes.buttonDrawerStyle}>
            <ListItemText primary={menuOptions[2].title} />
          </ListItem> 
          <ListItem button component={Link} to={menuOptions[3].route} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary={menuOptions[3].title} />
          </ListItem> 
          <ListItem button component={Link} to={menuOptions[4].route} disableRipple className={classes.buttonDrawerStyle}>
            <ListItemText primary={menuOptions[4].title} />
          </ListItem> 
          <ListItem button component={Link} to={menuOptions[5].route} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary={menuOptions[5].title} />
          </ListItem> 
          <ListItem button component={Link} to={menuOptions[6].route} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary={menuOptions[6].title} />
          </ListItem> 
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to={menuOptions[7].route} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary={menuOptions[7].title} />
          </ListItem> 
          <ListItem button component={Link} to={menuOptions[8].route} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary={menuOptions[8].title} />
          </ListItem> 
          <ListItem button component={Link} to={menuOptions[9].route} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary={menuOptions[9].title} />
          </ListItem> 
      </List>
      </div>
    </Drawer>
  </Hidden>
  </>
  )
}
export default memo(Header)
