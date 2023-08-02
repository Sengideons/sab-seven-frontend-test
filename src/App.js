import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import Login from './components/SignUp/Login';
import PharmacyDashboard from './components/Pharmacy/PharmacyDashboard';
import AddMedication from './scenes/pharmacy/AddMedication';
import MedicineList from './scenes/pharmacy/MedicineList';
import SellMedicine from './scenes/pharmacy/SellMedicine';
import MedicineDetailsPage from './components/pharmacyPages/MedicineDetails';
import MedicationEdit from './scenes/pharmacy/MedicineEdit';
import SalesRecords from './scenes/pharmacy/PaymentRecords';
import SalesDetailsPage from './components/pharmacyPages/SalesDetails.page';
import MedicineOverview from './scenes/pharmacy/PharOverviewPage';
import ClinicDashboard from './components/Clinic/ClinicDashboard';
import ReadInbox from './components/Notifications/ReadInbox';
import Users from './components/Users/Users';
import AdminRegister from './components/SignUp/AdminRegister';
import EmployeeRegister from './components/SignUp/Register';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import EmployeeHome from './components/Home/EmployeeHome';
import InboxPage from './components/Notifications/InboxPage';
import EmployeeAddMedication from './components/Employee/EmployeeAddMedication';
import UserMedicineList from './components/Employee/UserMedicineList';


function App () {
    return (
        <>
        <ToastContainer theme='colored' position='top-center'></ToastContainer>
         <Routes>
            <Route path="/" exact element={<EmployeeHome />} />
            <Route path="/admin-home" exact element={<Home />} />
            {/* ACOUNT SYSTEM Routes*/}
            <Route path="/login" element={<Login />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/employee-register" element={<EmployeeRegister />} />

            {/* ADMIN Routes*/}
            <Route path="/medicine-list" element={<MedicineList />} />
            <Route path="/pharmacy/*" element={<PharmacyDashboard />} />
            <Route path="/add-medication/*" element={<AddMedication />} />
            <Route path='/sell-medicine' element={<SellMedicine />}></Route>
            <Route path="/medicine-list/detail/:medicineid" element={<MedicineDetailsPage />} />
            <Route path="/medicine-list/edit/:itemid" element={<MedicationEdit />} />
            <Route path="/sales-records" element={<SalesRecords />} />
            <Route path="/sales-records/detail/:medid" element={<SalesDetailsPage />} />
            <Route path="/sales-overview" element={<MedicineOverview />} />
            <Route path="/notifications" element={<InboxPage />} />
            <Route path="/notifications/read-inbox/:medicineId" element={<ReadInbox />} />
            <Route path="/users" element={<Users />} />
            
            {/* Employee Routes*/}
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/user-add-medication" element={<EmployeeAddMedication />} />
            <Route path="/user-medicine-list" element={<UserMedicineList />} />


            {/* Clinic Routes*/}
            <Route path="/clinic" element={<ClinicDashboard />} />
            
         </Routes> 
        </> 
    );
}

export default App ;