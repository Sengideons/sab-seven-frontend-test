import React from 'react';
import { Box, CssBaseline, ThemeProvider, Button, TextField } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PharmacySidebar from '../../scenes/global/PharmacySidebar';
import PharmacyTopbar from '../../scenes/global/PharmacyTopbar';
import EmployeeSidebar from './EmployeeSidebar';


const EmployeeAddMedication = () =>{
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [formValues, setFormValues] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate=useNavigate();
  
  
    const handleFormSubmit = async (values) => {
      const allMedicines=(values);
      fetch("https://crazy-cod-sweater.cyclic.cloud/AllMedicines", {
                  method: "POST",
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(allMedicines)
              }).then((res) => {
                  toast.success('Medicine Added Successfully.')
                  window.location.reload();
                  {/* navigate("/manage-wholesale-invoice") */}
              }).catch((err) => {
                  toast.error('Failed :' + err.message);
              });
  
    };
  
  
    useEffect(() => {
      if (formSubmitted) {
        setFormValues({});
      }
  
    }, [formSubmitted]);


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
            {/* Add Medication Main Body*/}
            <Box m="20px">

            <Header title="ADD MEDICINE" subtitle="Fill the Form below to add a medicine" />
                <Formik
                validationSchema={checkoutSchema}
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Medicine Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.medicineName}
                        name="medicineName"
                        error={!!touched.medicineName && !!errors.medicineName}
                        helperText={touched.medicineName && errors.medicineName}
                        sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Unit Quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.unitQuantity}
                        name="unitQuantity"
                        error={!!touched.unitQuantity && !!errors.unitQuantity}
                        helperText={touched.unitQuantity && errors.unitQuantity}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.quantity}
                        name="quantity"
                        error={!!touched.quantity && !!errors.quantity}
                        helperText={touched.quantity && errors.quantity}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Price ( GH₵  )"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.price}
                        name="price"
                        error={!!touched.price && !!errors.price}
                        helperText={touched.price && errors.price}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Expiry Date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.date}
                        name="date"
                        error={!!touched.date && !!errors.date}
                        helperText={touched.date && errors.date}
                        sx={{ gridColumn: "span 2" }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" size="large" sx={{fontWeight: "700"}}>
                        Add Medicine
                        </Button>
                    </Box>
                    </form>
                )}
                </Formik>
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

const checkoutSchema = yup.object().shape({
    medicineName: yup.string().required("please enter Medicine name"),
    unitQuantity: yup.string().required("please enter Generic name"),
    quantity: yup.string().required("please enter quantity"),
    date: yup.string().required("please enter expiry date"),
    price: yup.string().required("please enter price"),
  });
  
  const initialValues = {
      medicineName: "",
      unitQuantity: "",
      quantity: "",
      date: "",
      price: "",
    };
    
    
  

export default EmployeeAddMedication;