import React from 'react';

import Pdf from "react-to-pdf";
import { Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Button, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import LogoWhiteBackground from '../../assets/LogoWhiteBackground.svg';
import picMcl from '../../assets/mcl.jpg';


import TableHistoricalData from './TableHistoricalData';
import FormBusinessData from './FormBusinessData';
import FormCostOfCapitalData from './FormCostOfCapitalData';
import TableValuation from './TableValuation';

const useStyles = makeStyles((mainTheme) => ({
  buttonStyle:{
    minWidth:"130px",
  }, 
  logoStyle: {
    position: "relative",
    height: "45px",
    // padding: "24px",
    top:"0px"
  },
  valuationsWebStyle:{
    fontSize: "18px",
    color: mainTheme.palette.tertiary.main
  },
  socialNetworkBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
    // backgroundColor:mainTheme.palette.primary.main,
  },
  iconStyle:{
    marginTop:"5px", 
    marginLeft:"1px", 
    marginRight:"1px", 
    marginBottom:"0px",
    fontSize:20, 
    color: mainTheme.palette.tertiary.main,
  },
  companyDataStyle:{
    fontSize: "14px",
    color: mainTheme.palette.primary.main
  },
  userPhotoStyle:{
    height: mainTheme.contactPhotoStyle.height,
    width: mainTheme.contactPhotoStyle.width,
    alignItems: mainTheme.contactPhotoStyle.alignItems,
    marginTop: mainTheme.contactPhotoStyle.marginTop,
    marginBottom:mainTheme.contactPhotoStyle.marginBottom,
    marginLeft:mainTheme.contactPhotoStyle.marginLeft,
    marginRigth:mainTheme.contactPhotoStyle.marginRight,
    display: mainTheme.contactPhotoStyle.display,
    textAlign: mainTheme.contactPhotoStyle.textAlign,
    justifyContent: mainTheme.contactPhotoStyle.justifyContent,
  },
}))

const ref = React.createRef();

const TestPrint = ({ open, onClose, companyData, historicalFinancialData, assumptions, setAssumptions, calculatedCostOfCapital, valuation }) => {

  // console.log("entou em Test Print");
  const classes = useStyles();  

  return (
    <>
    {/* { console.log("companyData: " + companyData)}
    { console.log("historicalFinancialData " + historicalFinancialData)}
    { console.log("assumptions: " + assumptions)}
    { console.log("calculatedCostOfCapital: " + calculatedCostOfCapital)}
    { console.log(valuation)} */}


    { companyData ? <>
      <Box style={{width: 900}}> 
      <Dialog 
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title" ><Typography align="center" variant="h6" style={{color:'white'}}>Generate Pdf</Typography></DialogTitle>
        <DialogContent style={{color:'white'}}>
          <DialogContentText id="alert-dialog-description">
            <div className="Post" ref={ref}>
            <Grid container >
              <Grid item xs={9} >
                <img src = {LogoWhiteBackground} alt="Logo" className={classes.logoStyle} />
              </Grid>
              {/* <div className={classes.grow} /> */}
              <Grid item xs={3} >
              <Avatar src={picMcl} alt="Martin Calcena" className={classes.userPhotoStyle} />
                {/* <Box style={{height:"12px"}}/> */}
                {/* <Typography className={classes.valuationsWebStyle}>www.valuationsweb.com</Typography>
                <Box className = {classes.socialNetworkBox}>
                  <TwitterIcon className = {classes.iconStyle} />    
                  <InstagramIcon className = {classes.iconStyle} />
                  <FacebookIcon className = {classes.iconStyle} />
                  <YouTubeIcon className = {classes.iconStyle} />
                </Box> */}
              </Grid>

            </Grid>  

    
            <Box style={{height: "10px"}}/>
            <Typography className={classes.companyDataStyle}>{`Symbol: ${companyData.symbol} Company: ${companyData.shortName}`}</Typography>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <TableHistoricalData historicalFinancialData = {historicalFinancialData} />
                  <FormBusinessData assumptions = {assumptions} setAssumptions = {setAssumptions} />
                  <FormCostOfCapitalData 
                      assumptions = {assumptions} 
                      setAssumptions = {setAssumptions}
                      calculatedCostOfCapital = {calculatedCostOfCapital}
                    />
                  </Grid>  
                <Grid item xs={6}>
                  <TableValuation 
                    valuation = {valuation} 
                    historicalFinancialData = {historicalFinancialData} 
                    calculatedCostOfCapital = {calculatedCostOfCapital}
                    assumptions = {assumptions}
                    companyData = {companyData}
                  />
                  </Grid>
                
              </Grid>
              {/* <Typography>Generate Pdf</Typography> */}
            </div>
            <Box style={{height: 0}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Grid container direction="row" xs={6} style={{textAlign:'center'}}>
            <Button disableRipple className={classes.buttonStyle} onClick={onClose} startIcon={<CancelIcon />}>Cancel</Button>
            <Pdf targetRef={ref} filename="valuation.pdf">
              {({ toPdf }) => <Button disableRipple className={classes.buttonStyle} onClick={toPdf} startIcon={<PictureAsPdfIcon />}>Generate Pdf File</Button>}
            </Pdf>
            <Box style={{height: 20}}/>
          </Grid> 
        </DialogActions>
      </Dialog>
    </Box>
    </>: console.log("! companyData")}

    </>
  )
}
export default TestPrint