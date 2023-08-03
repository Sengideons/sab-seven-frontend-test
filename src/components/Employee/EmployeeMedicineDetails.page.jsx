import React from 'react';
import { Box, CssBaseline, ThemeProvider} from "@mui/material";
import { ColorModeContext, tokens, useMode } from "../../theme";
import PharmacySidebar from '../../scenes/global/PharmacySidebar';
import PharmacyTopbar from '../../scenes/global/PharmacyTopbar';
import MedicineDetails from '../../scenes/pharmacy/ItemDetails';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeTopbar from './EmployeeTopbar';
import UserMedicineDetails from './EmployeeMedicinedetails';


const UserMedicineDetailsPage = () =>{
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);

  return (
    <>
    
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="app">
          <EmployeeSidebar />
          <main className="content">
            <EmployeeTopbar />
            {/* Medication List Main Body*/}
            <Box m="20px">
            <UserMedicineDetails/>
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

export default UserMedicineDetailsPage;