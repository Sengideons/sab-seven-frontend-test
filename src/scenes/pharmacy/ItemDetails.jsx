import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { tokens } from '../../theme';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const MedicineDetails = () => {
  const { medicineid } = useParams();

  const [itemdata, itemdatachange] = useState({});

  useEffect(() => {
      fetch("http://localhost:8000/AllMedicines/" + medicineid).then((res) => {
          return res.json();
      }).then((resp) => {
          itemdatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, [medicineid]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
      <div>
        <Box m="20px">
        <main class="ttr-wrapper" style={{marginTop: "-100px"}}>
            <div class="container-fluid">
            <Grid item>
            <Box display="flex" justifyContent="right" ml="40px">
              <Link to={"/medicine-list"}>
              <Button color="secondary" variant="contained" sx={{fontWeight: "700", width:"150px"}} startIcon={<ArrowBackIcon />}>
                Back
              </Button>
              </Link>
              </Box>
            </Grid>
            <br />
                <div className="widget-box">
                <div className="wc-title">
                    <h4>Medicine Details</h4>
                </div>
                <div className="widget-inner">
                    <div className="orders-list">
                {itemdata &&
                    <ul>
                            <li>
                            <span className="orders-title">
                                <a href="#name" className="orders-title-name" style={{fontWeight:"700"}}>
                                Medicine Name{" "}
                                </a>
                                <span className="orders-info" style={{fontWeight:"600"}}>
                                {itemdata.medicineName}
                                </span>
                            </span>
                            </li>
                            <li>
                            <span className="orders-title">
                                <a href="#id" className="orders-title-name" style={{fontWeight:"700"}}>
                                Price (GH₵){" "}
                                </a>
                                <span className="orders-info">
                                {itemdata.price}
                                </span>
                            </span>
                            </li>
                            <li>
                            <span className="orders-title">
                                <a href="#gender" className="orders-title-name" style={{fontWeight:"700"}}>
                                Quantity
                                </a>
                                <span className="orders-info">
                                {itemdata.quantity}
                                </span>
                            </span>
                            </li>
                            <li>
                            <span className="orders-title">
                                <a href="#gender" className="orders-title-name" style={{fontWeight:"700"}}>
                                Unit Quantity
                                </a>
                                <span className="orders-info">
                                {itemdata.unitQuantity}
                                </span>
                            </span>
                            </li>
                            <li>
                            <span className="orders-title">
                                <a href="#gender" className="orders-title-name" style={{fontWeight:"700"}}>
                                Expiry Date
                                </a>
                                <span className="orders-info">
                                {itemdata.date}
                                </span>
                            </span>
                            </li>
                        
                    </ul>
                }
                    </div>
                
                </div>
            </div>

            
            </div>
            </main>
            <div class="ttr-overlay"></div>
        </Box>       
          </div>
         
  );
}

export default MedicineDetails;







