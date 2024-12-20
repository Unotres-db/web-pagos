import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, isWithinInterval, parse, subMonths } from 'date-fns';

import { Stack, Grid, Paper, Box, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell,Snackbar, SnackbarContent, useTheme, useMediaQuery, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';


import api from '../../services/api';
import { LoginContext } from '../../helpers/Context';
import useAxios from '../../hooks/useAxios';

import Header from '../../components/Header';
// CategoriesAutocomplete\
import ChartDisbursementByMonth from './ChartDisbursementByMonth';
import ChartSupplier from './ChartSupplier';
import CategoriesAutocomplete from '../../components/CategoriesAutocomplete';
import FormAddCategory from './FormAddCategory';
import FormAddSupplier from './FormAddSupplier';
import SuppliersAutocomplete from '../../components/SuppliersAutocomplete';
// import SuppliersListByProject from '../../components/SuppliersListByProject';
// import TypesListByProjecy from '../../components/TypesListByProject';
import TableProject from './TableProject';
// import FormInc from './FormInc';
import FormAddTransaction from './FormAddTransaction';
// import FormEditTransaction from './FormEditTransaction';
import Subtotal from './Subtotal';

const useStyles = makeStyles( () => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Set the height of the container to full viewport height
    // flexGrow: 1,
  },
  circularProgressStyle:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', 
    color:'#344955',
  },
  circularTextStyle:{
    fontSize:13,
    color:'#344955',
  },
  paperStyle: {
    width: "100%",   
    marginLeft: "2px",
    marginRight: "2px",
    color: "white",
    backgroundColor: "#f0f8ff",
    padding: "5px",
  },
  boxSelectStyle:{
    height: "30px",
    width: "100%",
  },
  textStyle:{
    fontSize:"11px", 
    marginLeft:"5px",
    marginTop:"0px",
    paddingTop:"5px",
    paddingLeft:"5px",
    color:'#344955',
  },
  buttonStyle:{
    textTransform: 'none'
  },
  TableHeader:{
    color: "white",
    backgroundColor: '#344955',
    fontSize: 11
  },
  TableTitle:{
    color: "white",
    backgroundColor: '#344955',
    fontSize: 11
  },

  greenSnackbarContent: {
    backgroundColor: "#228B22",
  },
}));

export default function Proyectos (){
  const classes = useStyles();
  const { id } = useParams();  
  const { transactions, setTransactions, suppliers, setSuppliers,cashFlowType, setCashFlowType } = useContext(LoginContext);
  const { allTransactions, setAllTransactions } = useState(null);
  const [ filteredTransactions, setFilteredTransactions]=useState([])
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));//md
  const [ supplierSearchId, setSuppliersSearchId]= useState("");
  const [ categorySearchId, setCategorySearchId]= useState("");
  const [ isEditField, setIsEditField] = useState(true)// eliminar?
  const [ isEdit, setIsEdit] = useState(false); 
  const [ isDelete, setIsDelete] = useState(false); 
  const [ isAddCategory, setIsAddCategory] = useState(false); 
  const [ isAddSupplier, setIsAddSupplier] = useState(false); 
  const [ isAddTransaction, setIsAddTransaction] = useState(false); 
  const [ isEditTransaction, setIsEditTransaction] = useState(false); 
  const [ isSnackbarOpen, setIsSnackbarOpen]=useState(false);
  const [ snackbarMessage, setSnackbarMessage]=useState("");
  // const [ transactions, setTransactions] = useState(null);
  const { axiosFetch: getProject, isLoading: isLoadingProject, error: isErrorProject } = useAxios();
  const { axiosFetch: delTransaction, isLoading: isLoadingDeletion, error: isErrorDeletion } = useAxios();
  const categoryObject = {id: "0", label: "Todos"}
  const supplierObject = {id: "0", label: "Todos"}
  // const paymentObject = {id: "0", label: ""};

  function calculateRevenueByMonth(transactions) {
    const groupedTransactions = transactions.reduce((acc, transaction) => {
      // const fechaFactura=parse(transaction.fechafactura,'dd/MM/yyyy', new Date());
      const fecha = transaction.fechafactura!==null  ? parse(transaction.fechafactura, 'dd/MM/yyyy', new Date()) : parse(transaction.fechapago, 'dd/MM/yyyy', new Date());
      const monthStart = startOfMonth(fecha);
      const monthEnd = endOfMonth(fecha);
      const monthKey = format(monthStart, 'yyyy-MM');
  
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          total: 0,
        };
      }
      if (transaction.idTipoFlujo==="0"){
        acc[monthKey].total += parseFloat(transaction.montoFactura)/1000000;
      }
      return acc;

    }, {});
    const sortedTransactions = Object.values(groupedTransactions).sort((a, b) => {
      const dateA = new Date(a.month + '-01'); 
      const dateB = new Date(b.month + '-01');
  
      return dateA - dateB; 
    });
    return sortedTransactions
  }

  function calculateDisbursementByMonth(transactions) {

    const groupedTransactions = transactions.reduce((acc, transaction) => {
      const fecha = transaction.fechafactura!==null  ? parse(transaction.fechafactura, 'dd/MM/yyyy', new Date()) : parse(transaction.fechapago, 'dd/MM/yyyy', new Date());
      const monthStart = startOfMonth(fecha);
      const monthEnd = endOfMonth(fecha);
      const monthKey = format(monthStart, 'yyyy-MM');
  
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          total: 0,
        };
      }
      if (transaction.idTipoFlujo==="1"){
        acc[monthKey].total += parseFloat(transaction.montoFactura)/1000000;
      }
      return acc;

    }, {});
    const sortedTransactions = Object.values(groupedTransactions).sort((a, b) => {
      const dateA = new Date(a.month + '-01'); 
      const dateB = new Date(b.month + '-01');
  
      return dateA - dateB; 
    });
    return sortedTransactions
  }

  function calculateSuppliersSubtotals(projectSuppliersList, transactions) {
    const suppliersSubtotals = projectSuppliersList.map((supplier) => ({
      id: supplier.id,
      label: supplier.label,
      total: 0,
    }));
    let supplierId = transactions.supplierId;
    transactions.forEach((transaction) => {
      supplierId = transaction.idProveedor;
      if (supplierId && transaction.idTipoFlujo==="1" && transaction.idProveedor!=="265" && transaction.idProveedor!=="350") { // Check if supplierId is defined
        supplierId = supplierId.toString(); // Convert to string
        const supplierIndex = suppliersSubtotals.findIndex(
          (supplier) => supplier.id.toString() === supplierId
        );
        if (supplierIndex !== -1) {
          const montoFactura = parseFloat(transaction.montoFactura); // Convert to number
          const montoFacturaDivided = montoFactura / 1000000;
          suppliersSubtotals[supplierIndex].total += montoFacturaDivided;
          // suppliersSubtotals[supplierIndex].total += parseInt(transaction.montoFactura);

        }
      } else {
        // Handle undefined supplierId (e.g., log an error)
        console.error('Transaction with undefined supplierId:', transaction);
      }
    });
    suppliersSubtotals.sort((a, b) => b.total - a.total);
    return suppliersSubtotals;
  }

  const projectSuppliersList = transactions
  ? [
      { id: "0", label: "Todos" },
      ...transactions
        .map(transaction => ({
          id: transaction.idProveedor,
          label: transaction.proveedor
        }))
        .reduce((acc, cur) => {
          const existing = acc.find(item => item.id === cur.id);
          if (!existing) {
            acc.push(cur);
          }
          return acc;
        }, [])
        .sort((a, b) => a.label.localeCompare(b.label))
    ]
  : [];

  const suppliersSubtotal=calculateSuppliersSubtotals(projectSuppliersList, transactions)

  const projectCategoriesList = transactions
  ? [
    { id: "0", label: "Todos" },
    ...transactions
      // .filter(transaction => supplierSearchId.idProveedor === "0" || transaction.idProveedor === supplierSearchId.idProveedor)  // Filter by idProveedor
      .map(transaction => ({
        id: transaction.idRubro,
        label: transaction.rubro,
      }))
      .reduce((acc, cur) => {
        const existing = acc.find(item => item.id === cur.id);
        if (!existing) {
          acc.push(cur);
        }
        return acc;
      }, [])
      .sort((a, b) => a.label.localeCompare(b.label)),
  ]
  : [];

  function calculateCategoriesSubtotals(projectCategoriesList, transactions) {
    const categoriesSubtotals = projectCategoriesList.map((category) => ({
      id: category.id,
      label: category.label,
      total: 0,
    }));
    let categoryId = transactions.idRubro;//
    transactions.forEach((transaction) => {
      categoryId = transaction.idRubro;
      if (categoryId && transaction.idTipoFlujo==="1" && transaction.idRubro!=="25") { // Check if categoryId is defined
        categoryId = categoryId.toString(); // Convert to string
        const categoryIndex = categoriesSubtotals.findIndex(
          (category) => category.id.toString() === categoryId
        );
        if (categoryIndex !== -1) {
          const montoFactura = parseFloat(transaction.montoFactura); // Convert to number
          const montoFacturaDivided = montoFactura / 1000000;
          categoriesSubtotals[categoryIndex].total += montoFacturaDivided;
          // suppliersSubtotals[supplierIndex].total += parseInt(transaction.montoFactura);

        }
      } else {
        // Handle undefined categoryId (e.g., log an error)
        console.error('Transaction with undefined supplierId:', transaction);
      }
    });
    categoriesSubtotals.sort((a, b) => b.total - a.total);
    return categoriesSubtotals;
  }

  const categoriesSubtotal=calculateCategoriesSubtotals(projectCategoriesList, transactions)
  const totalbyMonth=transactions? calculateDisbursementByMonth(transactions):[]
  const RevenuebyMonth=transactions? calculateRevenueByMonth(transactions):[]
  // const cashFlowByMonth=transactions? calculateCashFlowByMonth(transactions):[]
  // calculateCashFlowByMonth
  // const cashFlowByMonth= transactions? calculateNet(RevenuebyMonth, totalbyMonth):[]


  const handleAddCategory=()=>{
    setIsAddCategory(true);
  }

  const handleAddCategoryClose=()=>{
    setIsAddCategory(false);
  }

  const handleAddSupplier=()=>{
    setIsAddSupplier(true);
  }

  const handleAddSupplierClose=()=>{
    setIsAddSupplier(false);
  }


  const handleAddTransaction=()=>{
    setIsAddTransaction(true);
  }

  const handleEditTransaction=()=>{
    setIsEditTransaction(true);
  }

  const handleAddTransactionClose=()=>{
    setIsAddTransaction(false);
  }

  const handleEditTransactionClose=()=>{
    setIsEditTransaction(false);
  }

  const getProjectSuccessCb=(apiData)=>{
    if(apiData){
      // alert("setTransactions(apiData)")
      setTransactions(apiData);
    }
  }

  const getProjectErrorCb=()=>{
    // alert("Hubo un error en el servidor. No fue posible cargar las transacciones del proyecto")
    // setSnackbarMessage("Hubo un error en el servidor. No fue posible cargar las transacciones del proyecto");
    // setIsSnackbarOpen(true);
  }

  const handleEditClose=()=>{
    setIsEdit(false);
  }

  const handleSnackbarClose=()=>{
    setIsSnackbarOpen(false);
  }

  const filterFunction=(supplierId, categoryId)=>{
    // si hay un proveedor seleccionado....
    if (supplierId !=="" && supplierId!==undefined && supplierId!==null && supplierId!=="0" ){

      if (categoryId !=="" && categoryId!==undefined && categoryId!==null && categoryId!=="0"){
        const filteredByBoth = transactions.filter((list) => (list.idProveedor === supplierId && list.idRubro === categoryId));
        return filteredByBoth
      }

      const filteredBySupplier = transactions.filter((list) => (list.idProveedor === supplierId ))  
      if (filteredBySupplier.length > 0){
        return filteredBySupplier
      }
    } else {
      if (categoryId !=="" && categoryId!==undefined && categoryId!==null && categoryId!=="0"){
        const filteredByCategory = transactions.filter((list) => (list.idRubro === categoryId ))  
        return filteredByCategory
      } else{
        return transactions    
      }
    }
  return transactions
  }

  useEffect(() => {
    
    setFilteredTransactions(filterFunction(supplierSearchId.idProveedor, categorySearchId.idRubro))
  }, [supplierSearchId, categorySearchId]);


  useEffect(() => {
    setIsEdit(false);
    if (id) {
      getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/${id}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
    } 
  }, [isEdit]);

  useEffect(() => {
    if (id) {
      // alert("llama getProject: "+id)
      getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/${id}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
    } 
  }, []);

  return(
    <>
    {/* {alert("index id: "+id)} */}
      { ! transactions ? 
      <>
      <div className={classes.root}>
      {/* <Header />   */}
      <Grid container> 
        <Grid item xs={12}>
          <Typography align="center" className={classes.circularTextStyle}>Cargando proyecto de la base de datos</Typography>
        </Grid>
        <Box style={{height:"10px"}}/>
        <Grid item xs={12}>
          <Box style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <CircularProgress className={classes.circularProgressStyle} />
          </Box>
        </Grid>
        </Grid>   
      </div>
      </>
    
  : <>

    { transactions.length > 0? 
    <>
    {/* {console.log("transactions")};
    {console.log(transactions)}; */}
    {/* {console.log("suppliersSubtotal")}
    {console.log(suppliersSubtotal)}
    {console.log(typeof(suppliersSubtotal))}
    {console.log("projectSuppliersList")}
    {console.log(projectSuppliersList)}
    {console.log(typeof(projectSuppliersList))} */}
    {/* {console.log("RevenuebyMonth")}    
    {console.log(RevenuebyMonth)}
    {console.log("totalbyMonth")}    
    {console.log(totalbyMonth)} */}
    {/* {console.log("cashFlowByMonth")}    
    {console.log(cashFlowByMonth)}  */}
    <Grid container item direction="column" alignItems="center" style = {{minHeight: '80vh'}}  >
      
      {/* Grid para ocupar el heigth del app bar */}
      {/* style = {{ minHeight: '69px'}} */}
      <Grid item xs={12} style = {{ minHeight: '69px'}}  /> 

      {/* main container grid */}
      <Grid item container direction="row" spacing={1}   >

        { isMobile || isTablet ? // En caso de Mobile/Tablet, pasa al inicio de la pantalla...y no en el centro, como en el desktop
        <>
        <Grid item xs={12} >
        {/* className={classes.paperStyle} */}
          <Paper  elevation={3} > 
            <TableProject 
              id={id}
              // transactions={transactions} 
              transactions={filteredTransactions.length > 0 ? filteredTransactions: transactions}
              setterFunction={filteredTransactions.length > 0 ? setFilteredTransactions: setTransactions} 
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              isDelete={isDelete} 
              setIsDelete={setIsDelete}/>
          </Paper>
          <Box sx={{height:"5px"}}/> 

          <Paper>
            {/* <AssumptionsText assumptionsText={assumptions.assumptionsText}/> */}
          </Paper>
        </Grid> 
        </>
        : null }
            {/* isMobile || isTablet ? */}

        {/* center grid */}
        <Grid item xs={12} md={9}  >
          <Paper className={classes.paperStyle} elevation={3}  > 
            { ! isMobile && ! isTablet? 
              <>
              <TableProject 
                id={id}
                // transactions={transactions} 
                transactions={filteredTransactions.length > 0 ? filteredTransactions: transactions}
                setterFunction={filteredTransactions.length > 0 ? setFilteredTransactions: setTransactions} 
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isDelete={isDelete} 
                setIsDelete={setIsDelete}
              />

              <Box sx={{height:"5px"}}/>
              </>
            : null }
                    {/* ! isMobile && ! isTablet? */}
                    { isTablet && ! isMobile? 
          <Grid container>
            <Box style={{height:"5px"}}/>
            <Grid item sx={12} sm={6}>
              <Paper elevation={3} style={{marginRight:"5px"}}>

              </Paper>
            </Grid>
            <Box sx={{height:"5px"}}/>
            <Grid item sx={12} sm={6}>
              <Paper elevation={3} style={{marginLeft:"5px"}}>

              </Paper>
            </Grid>


          </Grid>  
        : null }
          <Box sx={{height:"5px"}}/>

          </Paper>
        </Grid>  

        {/* rigth side grid ...Obs.: en veridon Mobile y tablet no hay right side grid*/}
        { ! isTablet || isMobile ? // 
          <>
          <Grid item xs={12} sm={6} md={3}  >
            <Paper className={classes.paperStyle} elevation={0}  > 

              <>
              <Box sx={{height:"5px"}}/>
              <Paper elevation={3} >
                <Box style={{marginTop:"10px",marginLeft:"10px",marginBottom:"10px"}}> 
                  <Typography style={{fontSize:"14px"}}>Proyecto: Edificio Tres Kandu</Typography>
                  <Typography style={{fontSize:"12px"}}>Construcción edificio en San Lorenzo</Typography>
                  {/* <Typography style={{fontSize:"12px"}}>2.400 metros cuadrados</Typography> */}
                  <Typography style={{fontSize:"12px"}}>Monto Presupuestado Us$ 3.300.000 / Gs. 23.925 mi</Typography>
                  <Box sx={{height:"5px"}}/>
                </Box>
                <Box sx={{height:"5px"}}/>
                <Subtotal transactions={filteredTransactions.length>0?filteredTransactions:transactions}/>
                <Box sx={{height:"5px"}}/>
                <Box style={{display:"flex", justifyContent:"start"}}>
                 {/* "#E4D00A" "#FFBF00" */}
                  <Button startIcon = {<AddCircleIcon />} variant="contained" size="small" disableRipple onClick={handleAddTransaction} style={{width:"112px",margin:'2px',marginLeft:"5px",color:"#344955",backgroundColor:"#E1C16E",textTransform:"none", fontSize:"11px"}} >Factura/Pago</Button> 
                  <Button startIcon = {<AddCircleIcon />} variant="contained" size="small" disableRipple  onClick={handleAddSupplier} style={{width:"112px",margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none", fontSize:"11px"}} >Proveedor</Button>
                  <Button startIcon = {<AddCircleIcon />} variant="contained" size="small" disableRipple  onClick={handleAddCategory} style={{width:"112px",margin:'2px', marginRight:"5px", color:"#344955",backgroundColor:"#E1C16E",textTransform:"none", fontSize:"11px"}} >Rubro</Button>  
                </Box>
                <Box sx={{height:"15px"}}/>

                {/* style={{backgroundColor:"#E1C16E"}} */}
                <Paper elevation={6} >
                  <Box style={{height:"10px"}}/> 
                  <Typography align="center" style={{fontSize:"14px", marginLeft:"0px",color:"#344955"}}>Filtrar datos</Typography>
                  <Box style={{height:"5px"}}/>
                  <Box style={{display:"flex", justifyContent:"center",margin:"5px"}}>
                    <Grid container>
                      <Grid item xs={12} spacing={3}>
                        <SuppliersAutocomplete
                          supplierObject={supplierObject} 
                          setterFunction={setSuppliersSearchId} 
                          suppliersList={projectSuppliersList}
                          isShowAllOption={true}
                        />
                      </Grid>
                      <Grid item xs={12} >
                      <Box style={{height:"10px"}}/>  
                      <CategoriesAutocomplete
                          categoryObject={categoryObject} 
                          setterFunction={setCategorySearchId} 
                          categoriesList={projectCategoriesList}
                          isShowAllOption={true}
                        />
                      {/* <TypesListByProjecy
                        supplierObject={supplierObject} 
                        setterFunction={setSuppliersSearchId} 
                        projectSuppliersList={projectTypesList}
                      /> */}
                      <Box style={{height:"10px"}}/>  
                      <Typography align="center" style={{fontSize:13, color:"#344955"}}>Principales Proveedores</Typography>
                      <ChartSupplier suppliersSubtotal={suppliersSubtotal}/>

                      <Box style={{height:"10px"}}/>  
                      <Typography align="center" style={{fontSize:13, color:"#344955"}}>Principales Rubros</Typography>
                      <ChartSupplier suppliersSubtotal={categoriesSubtotal}/>

                      <Box style={{height:"10px"}}/>  
                      <Typography align="center" style={{fontSize:13, color:"#344955"}}>Desembolsos por Mes</Typography>
                      
                      <ChartDisbursementByMonth disbursementsByMonth={totalbyMonth}/>

                      <Box style={{height:"10px"}}/>  
                      <Typography align="center" style={{fontSize:13, color:"#344955"}}>Ingresos por Mes</Typography>
                      
                      <ChartDisbursementByMonth disbursementsByMonth={RevenuebyMonth}/>

                      {/* <Box style={{height:"10px"}}/>  
                      <Typography align="center" style={{fontSize:13, color:"#344955"}}>Flujo de Caja Acumulado por Mes</Typography>
                      
                      <ChartDisbursementByMonth disbursementsByMonth={cashFlowByMonth}/> */}
                        
                      </Grid>


                    </Grid>
                    {/* <SuppliersAutocomplete 
                      supplierObject={supplierObject}
                      setterFunction={setSuppliersSearchId}///
                      isEditField={isEditField}
                      setIsEditField={setIsEditField}
                      variant="filled"
                    /> */}

                 

                  </Box>
                  <Box style={{height:"15px"}}/>

                </Paper>
 
              </Paper>
              <Box sx={{height:"5px"}}/>
              {/* <Paper elevation={3}>
                <ChartRevenue
                  assumptions={assumptions} 
                  combinedFinancialData={combinedFinancialData} 
                  isCheckedShowPreviousYears={isCheckedShowPreviousYears} 
                  isCheckedDescOrder={isCheckedDescOrder} isEstimateFcffOnly={isEstimateFcffOnly}
                />
              </Paper>  */}
              <Box sx={{height:"5px"}}/> 
 
              </>

                  {/* combinedFinancialData ? */}
            </Paper>
          </Grid>  
          </> 
          : null }
              {/* !isMobile && ! isTablet ?  */}
      </Grid> 
    </Grid>

    </>
    : 
    <Stack alignItems="center">
      <CircularProgress  variant="indeterminate" className={classes.circularProgressStyle} />
    </Stack>
  } 
  </>
}
  <FormAddTransaction 
    open={isAddTransaction}
    onClose={handleAddTransactionClose}
    id={id}
    isEdit={isEdit}
    setIsEdit={setIsEdit}
  />
  <FormAddSupplier 
    open={isAddSupplier}
    onClose={handleAddSupplierClose}
  />
  <FormAddCategory 
    open={isAddCategory}
    onClose={handleAddCategoryClose}
  />
  <Snackbar
    open={isSnackbarOpen}
    autoHideDuration={2000} 
    onClose={()=>handleSnackbarClose()}
    >
    <SnackbarContent
      className={classes.greenSnackbarContent}
      message={snackbarMessage}
    />
  </Snackbar>  
  </>
  )
}