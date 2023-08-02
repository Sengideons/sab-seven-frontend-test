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


const SalesDetails = () => {
  const { medid } = useParams();

  const [itemdata, itemdatachange] = useState({});

  useEffect(() => {
      fetch("http://localhost:8000/SalesInvoice/" + medid).then((res) => {
          return res.json();
      }).then((resp) => {
          itemdatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, [medid]);


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
                  Details of selected Payment Record
              </Typography>
            </Grid>
            <Grid item>
            <Box display="flex" justifyContent="right" ml="40px">
              <Link to={"/sales-records"}>
              <Button color="secondary" variant="contained" sx={{fontWeight: "700"}} startIcon={<ArrowBackIcon />}>
                Back
              </Button>
              </Link>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {itemdata &&
                  <div>
                    <Typography variant="h5" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                    Receipt Number : <b style={{fontWeight:"400", color:colors.grey[100]}}> {itemdata.receiptNumber}</b><br /> <hr color='#757575'/>
                   </Typography>
 
                    <Typography variant="h5" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                    Total Amount : <b style={{fontWeight:"400", color:colors.grey[100]}}> GH₵ {itemdata.totalAmount}</b><br /> <hr color='#757575' />
                   </Typography>

                   <Typography variant="h5" gutterBottom mt="10px" sx={{fontWeight: "700", color: colors.greenAccent[300]}} ml="10px">
                       Date/Time : <b style={{fontWeight:"400", color:colors.grey[100]}}> {itemdata.date}</b><br /> <hr color='#757575' />
                   </Typography>

                  </div>
              }
    </Paper>
    </Box>

          

              
          </div>
         
  );
}

export default SalesDetails;







