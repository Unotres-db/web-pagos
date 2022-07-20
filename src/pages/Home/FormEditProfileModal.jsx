import React from 'react';

import { Modal, Grid, Paper, Box, TextField, Button, Tooltip, Typography, Avatar, Switch} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@mui/icons-material/Email';

import picMcl from '../../assets/mcl.jpg';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const useStyles = makeStyles( (mainTheme) => ({
  modalStyle:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    backgroundColor:"white",
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
  },
  sectionTitleStyle:{
    fontSize: mainTheme.sectionTitle.fontSize,
    color: mainTheme.sectionTitle.color,
    marginTop:mainTheme.sectionTitle.marginTop,
    marginLeft:mainTheme.sectionTitle.marginLeft,
    marginBottom:mainTheme.sectionTitle.marginBottom
  },
  userPhotoStyle:{
    height: mainTheme.userPhotoStyle.height,
    width: mainTheme.userPhotoStyle.width,
    alignItems: mainTheme.userPhotoStyle.alignItems,
    marginTop: mainTheme.userPhotoStyle.marginTop,
    marginBottom:mainTheme.userPhotoStyle.marginBottom,
    marginLeft:"15px",
    marginRigth:mainTheme.userPhotoStyle.marginRight,
    display: mainTheme.userPhotoStyle.display,
    textAlign: mainTheme.userPhotoStyle.textAlign,
    justifyContent: mainTheme.userPhotoStyle.justifyContent,
  },
  buttonStyle: {
    marginLeft:"10px",
    width:"120px",
  },
}));

export default function FormEditProfileModal ({isModalOpen, handleModalClose}) {
  const classes = useStyles()
  return (
    <>
    <Box style={{position:"absolute", width:"100%", height:"100%"}}>
    <Modal 
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div>
      <Box className={classes.modalStyle}>
        <Typography className={classes.sectionTitleStyle}>Edit My Profile</Typography>
        <Grid container direction='row'>
          <Grid item xs={3} >
            <Avatar src={picMcl} alt="Martin Calcena" className={classes.userPhotoStyle} />
          </Grid>
          <Grid item container direction="column" xs={9} >
            <Grid item >
              <Button disableRipple className={classes.buttonStyle}>Change Photo</Button>
            </Grid>
            <Grid item style={{marginLeft:"10px",marginRight:"10px"}}>
              <TextField
                label="Name"
                size="small"
                // value={}
                type="text"
                // onChange={}
                variant="filled"
                fullWidth
                name="userName">
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" >
          <Grid item>
          <Typography align="left" variant="subtitle2" style={{marginLeft:"10px",color:'black'}} gutterBottom>Description</Typography>
              <div>
                <textarea name="contactMsg" placeholder="Write your description" rows="3" style={{marginLeft:"10px",width:"95%"}}
                  // onChange={ (e) => {
                  //   handleChange (e,[noBlanks]);
                  //   setIsDirty();
                  // }}
                ></textarea>
              </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} >
            <ReactSearchAutocomplete
              // items={companiesList}
              placeholder={"Enter Country Name"}
              // inputSearchString={companySearchName}
              // onSearch={handleOnSearch}
              // onHover={handleOnHover}
              // onSelect={handleOnSelect}
              // onFocus={handleOnFocus}
              // onClear={handleOnClear}
              styling={{ zIndex: 4, height: "35px", borderRadius: "24px",fontSize: "11px", iconColor: "#344955", color: "#344955", searchIconMargin: '0 0 0 8px',clearIconMargin: '3px 8px 0 0' }} // To display it on top of the search box below
              autoFocus
              style={{marginLeft:"10px"}}
              // formatResult={formatResult}
            />  
          </Grid>
          <Grid  container direction="column" xs={12} style={{height:"45px"}} >
            <Grid item xs={1} style={{backgroundColor:"green"}}>
              <EmailIcon />
            </Grid>
            <Grid item xs={10} style={{backgroundColor:"red"}} >
            <TextField
                label="E-mail ccount"
                size="small"
                // value={}
                type="text"
                // onChange={}
                variant="filled"
                fullWidth
                name="email">
              </TextField>
            </Grid>
            <Grid item xs={1}>
              <Typography style={{fontSize:8, color:"black", backgroundColor:"yellow"}}>Show E-mail</Typography>
              <Switch defaultChecked size="small" />
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={12} style={{height:"45px"}}>
            <Grid item xs={1}></Grid>
            <Grid item xs={9} style={{marginLeft:"10px",marginRight:"10px"}}>
            <TextField
                label="Web Address"
                size="small"
                // value={}
                type="text"
                // onChange={}
                variant="filled"
                fullWidth
                name="email">
              </TextField>
            </Grid>
            <Grid item xs={2}>
              <Switch defaultChecked size="small" />
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={12} style={{height:"45px"}} >
            <Grid item xs={9} style={{marginLeft:"10px",marginRight:"10px"}}>
            <TextField
                label="Linkedin Account"
                size="small"
                // value={}
                type="text"
                // onChange={}
                variant="filled"
                fullWidth
                name="linkedin">
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Switch defaultChecked size="small" />
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={12} style={{height:"45px"}} >
            <Grid item xs={9} style={{marginLeft:"10px",marginRight:"10px"}}>
            <TextField
                label="Youtube Channel"
                size="small"
                // value={}
                type="text"
                // onChange={}
                variant="filled"
                fullWidth
                name="youtube">
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Switch defaultChecked size="small" />
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={12} style={{height:"45px"}} >
            <Grid item xs={9} style={{marginLeft:"10px",marginRight:"10px"}}>
            <TextField
                label="Twitter Account"
                size="small"
                // value={}
                type="text"
                // onChange={}
                variant="filled"
                fullWidth
                name="twitter">
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Switch defaultChecked size="small" />
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={12} style={{height:"45px"}} >
            <Grid item xs={9} style={{marginLeft:"10px",marginRight:"10px"}}>
            <TextField
                label="Facebook Account"
                size="small"
                // value={}
                type="text"
                // onChange={}
                variant="filled"
                fullWidth
                name="facebook">
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Switch defaultChecked size="small" />
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={12} style={{height:"45px"}} >
            <Grid item xs={9} style={{marginLeft:"10px",marginRight:"10px"}}>
            <TextField
                label="Instagram Account"
                size="small"
                // value={}
                type="text"
                // onChange={}
                variant="filled"
                fullWidth
                name="instagram">
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Switch defaultChecked size="small" />
            </Grid>
          </Grid>


        </Grid>

        <Box style={{height:5}}/>
        {/* style={{textAlign:'center'}} */}
      <Grid container direction="row" xs={12} >
        <Grid item xs={2} />
        <Grid item xs={4} style={{paddingRight:"2px",textAlign:'right'}}>
          <Button onClick={handleModalClose} variant="contained" disableRipple className={classes.buttonStyle}>Cancel</Button>
        </Grid>
        <Grid item xs={4} style={{paddingLeft:"2px",textAlign:'left'}}>
          <Button variant="contained" disableRipple className={classes.buttonStyle}>Apply Changes</Button>
        </Grid>
        <Grid item xs={2} />
      </Grid>  
      </Box>
    </div>
    </Modal>
    </Box>
    </>
  )
}