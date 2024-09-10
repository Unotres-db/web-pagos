import React from 'react';
// { useState, useContext, useEffect }
import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
// import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Header from '../../components/Header';

// import PicInvestmentValuation from '../assets/InvestmentValuation.jpg';
// import PicMasteringTheMarketCycle from '../assets/MasteringTheMarketCycle.jpg';
// import PicMostImportantThing from '../assets/MostImportantThing.jpg';
// import PicTheDarkSideOfValuation from '../assets/TheDarkSideOfValuation3.jpg';
// import PicTheInteligentInvestor from '../assets/TheInteligentInvestor.jpg';
// import PicValuationMcKinsey from '../assets/Valuation-McKinsey.jpg';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  sectionTitleStyle:{
    fontSize: 14,
    color: 'black',
    marginTop: "15px",
    marginLeft: "15px",
    marginBottom: "5px"
  },
  titleStyle:{
    width: "100%",
    padding: "15px",
    color: mainTheme.palette.primary.main,
    backgroundColor: "white",
    marginBottom: "10px",
  },
  boxStyle:{
    width: "100%",
    padding: "2px",
    color: "white",
    backgroundColor: mainTheme.palette.primary.main, //"#ff9800",
    marginBottom: "1px",
  },
  innerBoxStyle:{
    width: "100%",   
    paddingLeft: "10px",   
    paddingRight: "10px",   
    color: "black",
    backgroundColor: "white",
    marginBottom: "1px",
  },
  // innerBoxStyle:{
  //   width: "100%",   
  //   paddingLeft: "10px",   
  //   paddingLeft: "10px",   
  //   color: "black",
  //   backgroundColor: "white",
  //   marginBottom: "1px",
  // },
  buttonStyle:{
    position: "absolute",
    justifyContent: 'center',
    // marginBottom: "15px",
    bottom: "20px",
  },
  paperStyle:{
    width: "100%",
    height:"100%",
    paddingLeft: "0px",
    // marginLeft:"auto",
    // marginRight:"auto",
  },
  // paperStyle:{
  //   width: "100%",
  //   height:"100%",
  //   paddingLeft: "0px",
  //   marginLeft:"auto",
  //   marginRight:"auto",
  // },
  bookPicStyle:{
    height: '120px',
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom:"10px",
  }, 
  authorNameStyle:{
    height:"40px",
    [mainTheme.breakpoints.down('xs')]: {
      height: "100%",
      width:"100%"
    },
  },
  commentsStyle:{
    // height:"120px", 
    height: "100%",
    [mainTheme.breakpoints.down('xs')]: {
      height: "100%"
    },
    margin:"5px",
  }
}))

export default function CompetitionData () {
  const classes = useStyles();
  const booksList = [
    { id:"001",
      title:"Morelia",
      company:"Mia Terra",
      // picture: PicTheDarkSideOfValuation,
      price:29.90,
      description:"lorein ipsum",
      classification:"Intermediate",
      comments:"Together with Investment Valuatiom, it's the best Damodaran book, covering how to valuate start ups, distressed business, blabla. It also contains a chapter about the impact of lower and negative rates on valuations. the third edition from 2018.",
    },
    { id:"002",
      title:"Investment Valuation",
      author:"Aswath Damodaran",
      // picture:PicInvestmentValuation,
      price:29.90,
      description:"lorein ipsum",
      classification:"beginner",
      mclComments:"The best book of Damodaran covering from the basics of Valuation to more advanced topics....",
    },
    { id:"003",
      title:"Valuation",
      author:"McKinsey & Company Inc, Tim Koller and others",
      // picture: PicValuationMcKinsey,
      price:29.90,
      description:"lorein ipsum",
      classification:"beginner",
      mclComments:"My first read on valuation in the 90's. Very complete book from the basics to more advanced topics. It's comparable to Investment Valuation from Damodaran, though more concise and with less pages.",
    },
    { id:"004",
      title:"The Intelligent Investor",
      author:"Benjamim Graham",
      // picture: PicTheInteligentInvestor,
      price:29.90,
      description:"lorein ipsum",
      classification:"beginner",
      mclComments:"It's the classic invesment book from one of the best investors and professors in the field.",
    },
    { id:"005",
      title:"The Most Important Thing",
      author:"Howard Marks",
      // picture: PicMostImportantThing ,
      price:29.90,
      description:"lorein ipsum",
      classification:"beginner",
      mclComments:"One of the bestv books on investing",
    },
    { id:"005",
      title:"Mastering the Market Cycles",
      author:"Howard Marks",
      // picture: PicMasteringTheMarketCycle,
      price:29.90,
      description:"lorein ipsum",
      classification:"beginner",
      mclComments:"One of the bestv books on investing",
    },
  ]
  // const [ booksList, setBooksList] = useState ([booksData]);
  
  function handleBuyingBook() {
    alert("buy Book");
  }

  return (
    <>
    <Header />
    <Grid container direction="column" alignItems="center" className = {classes.contentStyle}  >
      
      <Grid item xs={12} style= {{ minHeight: '0vh'}} /> 
      <Grid item xs={12} style= {{ width: '100%'}} >
        <Box className={classes.sectionTitleStyle} >
          <Typography align="center" variant="h7" ><b>Recommended Books on Valuation and Investing</b></Typography>
        </Box>
      </Grid>
      <Box style={{height:"15px"}}/>
      {/* position:"relative", */}

      <Grid item container direction="row" spacing={2} xs={12} >
      
        {booksList.map (book => (

        // className={classes.innerBoxStyle}
        // 
        // container
        <Grid item  direction="row" spacing={1} xs={12} sm={6} md={3} >
          <Paper elevation={9} className={classes.paperStyle} style={{ minHeight:'30vh', position:"relative"}} >
            <Typography align="center" variant="subtitle2" className={classes.boxStyle}>{book.title}</Typography>              
            {/* <Box className={classes.innerBoxStyle}>  */}
            <Grid item>
              {/* <Box style={{height:"130px"}}> */}
              <Box className={classes.innerBoxStyle}>   
                <img src = {book.picture} alt="Book picture" className={classes.bookPicStyle} /> 
              </Box>
            </Grid>
            <Grid item>
              <Box className={classes.authorNameStyle}>
                <Typography variant="subtitle2" style={{margin:"5px"}} gutterBottom><b>Author: </b>{book.author}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box style={{height:"20px"}}>
                <Typography variant="subtitle2" style={{margin:"5px"}} gutterBottom><b>Level: </b>{book.classification}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box style={{height:"20px"}}>
                <Typography variant="subtitle2" style={{margin:"5px"}} gutterBottom><b>Price: </b>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2,maximumFractionDigits:2}).format(book.price)}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classes.commentsStyle} >
                <Typography variant="caption" gutterBottom ><b>My comments: </b>{book.mclComments}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box style={{height: "60px"}}/>
            </Grid>       
            <Grid container item justify="center" >
              <Button variant="contained" disableRipple className={classes.buttonStyle} startIcon={<OpenInNewIcon />} onClick={() => handleBuyingBook(book)}>Go to Amazon site</Button>
            </Grid>
            {/* </Box> */}
          </Paper>
        </Grid>
        ))}

      </Grid>
      <Box style={{height:"20px"}}/>
      <Typography align="center" variant="caption" style={{margin:"5px"}}>Note: ValuationsWeb is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</Typography>
      
    </Grid>
    </>  
  )
}