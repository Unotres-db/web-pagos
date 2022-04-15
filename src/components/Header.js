import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Box, Button, Hidden, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import mainLogo from '../assets/logovw.svg';

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
  // padding: "24px",
  top:"2px"
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

export default function Header() {

const classes = useStyles();
const [open, setOpen] = useState(false);
const [ isDrawerOpen, setIsDrawerOpen] = useState(false);

const menuOptions = [
  { id:0,
    text:"Home",
    route:"/home"
  },
  { id:1,
    text:"Company Data",
    route:"/dividend-yield"
  },
  { id:2,
    text:"Dividend Yield",
    route:"/dividend-yield"
  },
  { id:3,
    text:"Graham Model",
    route:"/graham"
  },
  { id:4,
    text:"Valuation",
    route:"/valuation"
  },
  { id:5,
    text:"Books",
    route:"/books"
  },
  { id:6,
    text:"Blog",
    route:"/blog"
  },
  { id:7,
    text:"About Me",
    route:"/who-we-are"
  },
  { id:8,
    text:"Contact",
    route:"/contact"
  },
  { id:9,
    text:"Login",
    route:"/login"
  },
]

const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};

  return (
  <>
  <AppBar position="fixed" style={{top:'0px', height: '64px'}}>
    <Toolbar style={{minWidth:'360',height: '64px',paddingLeft:'24px'}}>

      <Link to={'/home'}>
        <img src = {mainLogo} alt="Logo" className={classes.logoStyle} style={{ height: '50px'}}/>
      </Link>
      <Hidden smDown>
        <Box style={{ width: '20px' }}/>    
          <Button component={Link} to={'/home'} className={classes.buttonMenuStyle} size="small" disableRipple>Home</Button>
          <Button component={Link} to={'/dividendyield'} className={classes.buttonMenuStyle} size="small" disableRipple>Company Data</Button>
          <Button component={Link} to={'/dividendyield'} className={classes.buttonMenuStyle} size="small" disableRipple>Dividend Yield Model</Button>
          <Button component={Link} to={'/graham'} className={classes.buttonMenuStyle} size="small" disableRipple>Graham Model</Button>
          <Button component={Link} to={'/disccashflow'} className={classes.buttonMenuStyle} size="small" disableRipple>Valuation</Button>
          <Button component={Link} to={'/books'} className={classes.buttonMenuStyle} size="small" disableRipple>Books</Button>
          <Button component={Link} to={'/blog'} className={classes.buttonMenuStyle} size="small" disableRipple>Blog</Button>
          <div className={classes.grow} />
          <Button component={Link} to={'/whoweare'} className={classes.buttonMenuStyle} size="small" disableRipple>About Me</Button>
          <Button component={Link} to={'/contact'} className={classes.buttonMenuStyle} size="small" disableRipple>Contact</Button>
          <Button component={Link} to={'/login'} className={classes.buttonMenuStyle} size="small" disableRipple>Login</Button>
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
      open={open}
      onClose={handleDrawerClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
    <div className={classes.drawerContainer}>
        <List>
          <ListItem button component={Link} to={'/home'} disableRipple className={classes.buttonDrawerStyle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to={'/dividendyield'} disableRipple className={classes.buttonDrawerStyle}>
            <ListItemText primary="Company Data" />
          </ListItem> 
          <ListItem button component={Link} to={'/dividendyield'} disableRipple className={classes.buttonDrawerStyle}>
            <ListItemText primary="Dividend Yield Model" />
          </ListItem> 
          <ListItem button component={Link} to={'/graham'} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary="Graham Model" />
          </ListItem> 
          <ListItem button component={Link} to={'/disccashflow'} disableRipple className={classes.buttonDrawerStyle}>
            <ListItemText primary="Valuation" />
          </ListItem> 
          <ListItem button component={Link} to={'/books'} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary="Books" />
          </ListItem> 
          <ListItem button component={Link} to={'/blog'} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary="Blog" />
          </ListItem> 
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to={'/whoweare'} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary="About me" />
          </ListItem> 
          <ListItem button component={Link} to={'/contact'} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary="Contact" />
          </ListItem> 
          <ListItem button component={Link} to={'/login'} disableRipple className={classes.buttonDrawerStyle} >
            <ListItemText primary="Login" />
          </ListItem> 
      </List>
      </div>
    </Drawer>
  </Hidden>
  </>
  )
}
