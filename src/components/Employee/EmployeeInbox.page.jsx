import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider} from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeTopbar from './EmployeeTopbar';
import EmployeeInbox from './EmloyeeInbox';


const EmployeeInboxPage = () =>{
    const [theme, colorMode] = useMode();

    const [medicines, setMedicines] = useState([]);

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
    const expiredMedicines = medicines.filter((medicine) => {
      const expirationDate = new Date(medicine.date);
      return currentDate > expirationDate;
    });
  
    // Calculate the number of unread messages
    const unreadCount = expiredMedicines.length;

  return (
    <>
    
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="app">
          <EmployeeSidebar />
          <main className="content">
            <EmployeeTopbar expiredMedicinesCount={unreadCount}  />
            {/* Add Medication Main Body*/}
            <Box m="20px">
                <EmployeeInbox expiredMedicines={expiredMedicines} />
            </Box>
            {/* End of Add medication Main Body*/}
          </main>
        </div>
      </CssBaseline>
    </ThemeProvider>
  </ColorModeContext.Provider>
  </>
  );
}

export default EmployeeInboxPage;