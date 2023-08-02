import React, { useState, useEffect} from 'react';
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "../../theme";
import PharmacyTopbar from '../../scenes/global/PharmacyTopbar';
import axios from 'axios';
import EmployeeSidebar from './EmployeeSidebar';
import PharmacyAnalytics from '../Pharmacy/PharmarcyAnalytics';


const EmployeeDashboard = () =>{
    const [theme, colorMode] = useMode();
    const [totalMedicines, setTotalMedicines] = useState(0);
    const [expiringMedicines, setExpiringMedicines] = useState(0);
    const [expiredMedicines, setExpiredMedicines] = useState(0);
    const [activeMedicines, setActiveMedicines] = useState(0);
    


    useEffect(() => {
        // Fetch data from the JSON server
        axios.get('http://localhost:8000/AllMedicines')
          .then(response => {
            const medicines = response.data;
    
            // Calculate the total quantity
            const totalQuantity = medicines.reduce((sum, medicine) => sum + medicine.quantity, 0);
            setTotalMedicines(totalQuantity);
    
            // Calculate the number of expiring medicines
            const expiring = medicines.filter(medicine => {
              const expirationDate = new Date(medicine.date);
              const currentDate = new Date();
              const oneMonthAhead = new Date();
              oneMonthAhead.setMonth(oneMonthAhead.getMonth() + 2);
              return expirationDate >= currentDate && expirationDate <= oneMonthAhead;
            });
            setExpiringMedicines(expiring.length);
    
            // Calculate the number of expired medicines
            const expired = medicines.filter(medicine => {
              const expirationDate = new Date(medicine.date);
              const currentDate = new Date();
              return expirationDate < currentDate;
            });
            setExpiredMedicines(expired.length);
    
            // Calculate the number of active medicines
            const active = medicines.filter(medicine => {
              const expirationDate = new Date(medicine.date);
              const currentDate = new Date();
              return expirationDate >= currentDate;
            });
            setActiveMedicines(active.length);
          })
          .catch(error => {
            console.error('Error fetching data from JSON server:', error);
          });
      }, []);


      {/* MEDICINE NOTIFICATION BADGE */}
      const [newmedicines, setMedicines] = useState([]);

  // Fetch the medication data from the JSON server
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:8000/AllMedicines');
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
            {/* Dashboard Main Body*/}
            <Box m="20px">
            <main class="ttr-wrapper" style={{marginTop: "-100px"}}>
                <div class="container-fluid">
                    <div class="db-breadcrumb">
                        <h4 class="breadcrumb-title"
                        style={{color:"#70d8bd!important"}}
                        >Dashboard</h4>
                        <ul class="db-breadcrumb-list">
                            <li><a href="#lu"><i class="fa fa-home"></i>Home</a></li>
                            <li>Dashboard</li>
                        </ul>
                    </div>
                        
                    <div class="row">
                        <div class="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div class="widget-card widget-bg1">					 
                                <div class="wc-item">
                                    <h4 class="wc-title">
                                        Total Medicines
                                    </h4>
                                    <span class="wc-des">
                                        Total quantity of items
                                    </span>
                                    <span class="wc-stats">
                                        <span class="counter">{totalMedicines}</span>
                                    </span>		
                                    <div class="progress wc-progress">
                                        <div class="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span class="wc-progress-bx">
                                        <span class="wc-change">
                                            updated
                                        </span>
                                        <span class="wc-number ml-auto">
                                            💊
                                        </span>
                                    </span>
                                </div>				      
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div class="widget-card widget-bg2">					 
                                <div class="wc-item">
                                    <h4 class="wc-title">
                                        Expiring
                                    </h4>
                                    <span class="wc-des">
                                        Drugs about to expire
                                    </span>
                                    <span class="wc-stats counter">
                                    {expiringMedicines} 
                                    </span>		
                                    <div class="progress wc-progress">
                                        <div class="progress-bar" role="progressbar" style={{width: "100%", background:"yellow"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span class="wc-progress-bx">
                                        <span class="wc-change">
                                            updated
                                        </span>
                                        <span className="wc-number ml-auto">
                                            🧪
                                        </span>
                                    </span>
                                </div>				      
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div class="widget-card widget-bg3">					 
                                <div class="wc-item">
                                    <h4 class="wc-title">
                                        Active Medications 
                                    </h4>
                                    <span class="wc-des">
                                        Not expired yet in stock
                                    </span>
                                    <span class="wc-stats counter">
                                    {activeMedicines} 
                                    </span>		
                                    <div class="progress wc-progress">
                                        <div class="progress-bar" role="progressbar" style={{width: "100%", background:"green"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span class="wc-progress-bx">
                                        <span class="wc-change">
                                            updated
                                        </span>
                                        <span class="wc-number ml-auto">
                                            💉
                                        </span>
                                    </span>
                                </div>				      
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div class="widget-card widget-bg4">					 
                                <div class="wc-item">
                                    <h4 class="wc-title">
                                        Expired 
                                    </h4>
                                    <span class="wc-des">
                                        All drugs that expired
                                    </span>
                                    <span class="wc-stats counter">
                                    {expiredMedicines} 
                                    </span>		
                                    <div class="progress wc-progress">
                                        <div class="progress-bar" role="progressbar" style={{width: "100%", background:"red"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span class="wc-progress-bx">
                                        <span class="wc-change">
                                            updated
                                        </span>
                                        <span class="wc-number ml-auto">
                                            📆
                                        </span>
                                    </span>
                                </div>				      
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <PharmacyAnalytics/>
            </Box>
            {/* End of Main Body*/}
          </main>
        </div>
      </CssBaseline>
    </ThemeProvider>
  </ColorModeContext.Provider>
  </>
  );
}

export default EmployeeDashboard;