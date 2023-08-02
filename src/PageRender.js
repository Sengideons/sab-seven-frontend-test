import React from 'react';
import { Routes, Route } from "react-router-dom";
import App from './App';
import LoginPage from './components/Login';
import InvoicesPage from './pages/Invoices.page';


function PageRender () {
    return (
         <Routes>
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/dashboard" element={<App />} />
            <Route path="/invoices" element={<InvoicesPage />} />
         </Routes> 
    );
}

export default PageRender ;