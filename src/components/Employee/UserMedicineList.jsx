import React, { useEffect, useState } from 'react';
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
import EmployeeRegister from '../SignUp/Register';
import EmployeeSidebar from './EmployeeSidebar';


const UserMedicineList = () =>{
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);


    const[transactiondata, transactiondatachange]=useState(null);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    
    const LoadDetail = (id) => {
      navigate("/medicine-list/detail/" + id);
  }

  const LoadEdit = (id) => {
    navigate("/medicine-list/edit/" + id);
}
  
  const Removefunction = (id) => {
    if (window.confirm('Are sure you want to delete this item?')) {
        fetch("https://crazy-cod-sweater.cyclic.cloud/AllMedicines/" + id, {
            method: "DELETE"
        }).then((res) => {
            toast.success('Medication records deleted successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
  }
  
  
    useEffect(()=>{
      fetch("https://crazy-cod-sweater.cyclic.cloud/AllMedicines").then((res)=>{
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
      return item.medicineName.toLowerCase().includes(searchValue.toLowerCase())
    }) : null;




    const getStatus = (expiryDate) => {
      const currentDate = new Date();
      const expiry = new Date(expiryDate);
      const oneMonthBeforeExpiry = new Date(expiryDate);
      oneMonthBeforeExpiry.setMonth(oneMonthBeforeExpiry.getMonth() - 1);
  
      if (currentDate > expiry) {
        return {
          status: 'Expired',
          dotColor: 'red',
        };
      } else if (currentDate > oneMonthBeforeExpiry) {
        return {
          status: 'Expiring',
          dotColor: 'yellow',
        };
      } else {
        return {
          status: 'Active',
          dotColor: 'green',
        };
      }
    };
   
    
  {/* MEDICINE NOTIFICATION BADGE */}
  const [newmedicines, setMedicines] = useState([]);

  // Fetch the medication data from the JSON server
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('https://crazy-cod-sweater.cyclic.cloud/AllMedicines');
        if (!response.ok) {
          throw new Error('Failed to fetch medication data.');
        }
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMedicines();
  }, []);

  // Get the current date
  const currentDate = new Date();

  // Filter the expired medicines
  const newexpiredMedicines = newmedicines.filter((newmedicine) => {
    const expirationDate = new Date(newmedicine.date);
    return currentDate > expirationDate;
  });

  // Calculate the number of unread messages
  const unreadCount = newexpiredMedicines.length;
  
  

  return (
    <>
    
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="app">
          <EmployeeSidebar />
          <main className="content">
            <PharmacyTopbar expiredMedicinesCount={unreadCount} />  
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
            <Header title="MEDICINE LIST" subtitle="This is the list of all medicines added" />
            <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="right"
            borderRadius="4px"
            >
            <Link to={"/user-add-medication"}>
                <Button
                variant="contained"
                color="secondary"
                size="medium"
                endIcon={<AddCircleIcon />}
                sx={{ marginBottom: "30px", fontWeight: "700" }}
                >
                Add Medicine
                </Button>
            </Link>
            </Box>
            {transactiondata ? (
                <div class="table-responsive">
                    <table class="table">
                        <thead style={{backgroundColor: colors.blueAccent[700], borderBottom: "none"}}>
                            <tr>
                                <th>No #</th>
                                <th>Medicine Name</th>
                                <th>Price (GHC)</th>
                                <th>Quantity</th>
                                <th> Unit Quantity</th>
                                <th>Expiry Date</th>
                                <th>Status</th>
                                <th></th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((data) => {
                        const { status, dotColor } = getStatus(data.date);

                        return (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.medicineName}</td>
                                <td>{data.price}</td>
                                <td>{data.quantity}</td>
                                <td>{data.unitQuantity}</td>
                                <td>{data.date}</td>
                                <td>
                                <span style={{ backgroundColor: dotColor }} className="dot" /> {status}
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
                              <td>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  startIcon={<EditIcon />}
                                  onClick={() => { LoadEdit(data.id) }}
                                >
                                  Edit
                                </Button>
                              </td>
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

export default UserMedicineList;