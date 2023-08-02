import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { tokens } from '../../theme';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const RetailInvoiceDetail = () => {
  const { retailinvoiceid } = useParams();

  const [transactiondata, transactiondatachange] = useState({});

  useEffect(() => {
      fetch("http://localhost:8000/RetailInvoice/" + retailinvoiceid).then((res) => {
          return res.json();
      }).then((resp) => {
        transactiondatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, [retailinvoiceid]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
      <div>
        <Box m="20px">

     <Paper sx={{ overflow: 'hidden', backgroundColor: colors.primary[400], height:"85vh"}}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar sx={{backgroundColor: colors.blueAccent[700]}}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h3" gutterBottom mt="10px" color={colors.grey[100]}>
                  Details of selected Invoice
              </Typography>
            </Grid>
            <Grid item>
            <Box display="flex" justifyContent="right" ml="40px">
              <Link to={"/retail-invoice"}>
              <Button color="secondary" variant="contained" sx={{fontWeight: "700"}} startIcon={<ArrowBackIcon />}>
                Back
              </Button>
              </Link>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {transactiondata &&
                  <div>
                    <Typography variant='h4' gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                      ID : <b style={{fontWeight:"400", color:colors.grey[100]}}>{transactiondata.id}</b><br /> <hr color='#757575'/>
                    </Typography>
                    
                    <Typography variant="h4" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                       Item Name : <b style={{fontWeight:"400", color:colors.grey[100]}}>{transactiondata.itemName}</b><br /> <hr color='#757575'/>
                   </Typography>

                    <Typography variant="h4" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                       Description : <b style={{fontWeight:"400", color:colors.grey[100]}}>{transactiondata.itemDescription}</b><br /> <hr color='#757575' />
                   </Typography>

                    <Typography variant="h4" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                       Customer's Name : <b style={{fontWeight:"400", color:colors.grey[100]}}>{transactiondata.customerName}</b><br /> <hr color='#757575'/>
                   </Typography>

                    <Typography variant="h4" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                       Date : <b style={{fontWeight:"400", color:colors.grey[100]}}>{transactiondata.date}</b><br /> <hr color='#757575'/>
                   </Typography>

                    <Typography variant="h4" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                       Unit Price : <b style={{fontWeight:"400", color:colors.grey[100]}}>GHC {transactiondata.price}</b><br /> <hr color='#757575'/>
                   </Typography>

                    <Typography variant="h4" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                       Quantity : <b style={{fontWeight:"400", color:colors.grey[100]}}>{transactiondata.quantity}</b><br /> <hr color='#757575'/>
                   </Typography>

                    <Typography variant="h4" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                       Amount : <b style={{fontWeight:"400", color:colors.grey[100]}}>GHC {transactiondata.amount}</b><br /> <hr color='#757575'/>
                   </Typography>
                  </div>
              }
    </Paper>
    </Box>

          

              
          </div>
         
  );
}

export default RetailInvoiceDetail;







