import React, { useEffect, useState } from 'react';
import './style.css'
import { Box, CssBaseline, ThemeProvider, Button, IconButton, Typography } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PharmacySidebar from '../../scenes/global/PharmacySidebar';
import PharmacyTopbar from '../../scenes/global/PharmacyTopbar';
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';


const SalesRecords = () =>{
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);


    const[transactiondata, transactiondatachange]=useState(null);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    
    const LoadDetail = (id) => {
      navigate("/sales-records/detail/" + id);
  }

  
  const Removefunction = (id) => {
    if (window.confirm('Are sure you want to delete this item?')) {
        fetch("http://localhost:8000/SalesInvoice/" + id, {
            method: "DELETE"
        }).then((res) => {
            toast.success('Sales Record deleted successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
  }
  
  
    useEffect(()=>{
      fetch("http://localhost:8000/SalesInvoice").then((res)=>{
        return res.json();
      }).then((resp)=>{
          transactiondatachange(resp);
      }).catch((err)=>{
        console.log(err.message);
      })
    }, [])
  
    const handleSearch = (event) => {
      setSearchValue(event.target.value);
    }

    const filteredData = transactiondata ? transactiondata.filter(item => {
      return item.receiptNumber.toLowerCase().includes(searchValue.toLowerCase())
    }) : null;


  return (
    <>
    
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="app">
          <PharmacySidebar />
          <main className="content">
            <PharmacyTopbar />  
            {/* Medication List Main Body*/}
            <Box m="20px">
            <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            width="30%"
            justifyContent=""
            m="0"
            marginTop="-70px"
            marginBottom="60px"
            p="5px"
        >
            <InputBase 
            sx={{ ml: 2, flex: 1 }} 
            placeholder="Search" 
            value={searchValue}
            onChange={handleSearch}
            />
            <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
            </IconButton>
        </Box>
            <Header title="SALES RECORDS" subtitle="This is the list of all sales made" />
            <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="right"
            borderRadius="4px"
            >
            <Link to={"/sell-medicine"}>
                <Button
                variant="contained"
                color="secondary"
                size="medium"
                endIcon={<AddCircleIcon />}
                sx={{ marginBottom: "30px", fontWeight: "700" }}
                >
                Sell Medicine
                </Button>
            </Link>
            </Box>
            {transactiondata ? (
                <div class="table-responsive">
                    <table class="table">
                        <thead style={{backgroundColor: colors.blueAccent[700], borderBottom: "none"}}>
                            <tr>
                                <th>No #</th>
                                <th>Receipt Number</th>
                                <th>Total Amount (GHC)</th>
                                <th>Date/Time</th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((data) => {

                        return (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.receiptNumber}</td>
                                <td>{data.totalAmount}</td>
                                <td>{data.date}</td>
                              <td>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  startIcon={<DeleteIcon />}
                                  sx={{ fontWeight: "700" }}
                                  onClick={() => { Removefunction(data.id) }}
                                >
                                  Delete
                                </Button>
                              </td>
                              <td>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  startIcon={<InfoIcon />}
                                  sx={{ fontWeight: "700" }}
                                  onClick={() => { LoadDetail(data.id) }}
                                >
                                  Details
                                </Button>
                              </td>
                            </tr>
                            );
                           })}
                        </tbody>
                    </table>
                </div>

            ) : (
              <Typography variant="h6" color="#70d8bd">Loading...</Typography>
            )}
            </Box>
            {/* End of Medication List Main Body*/}
          </main>
        </div>
      </CssBaseline>
    </ThemeProvider>
  </ColorModeContext.Provider>
  </>
  );
}

export default SalesRecords;