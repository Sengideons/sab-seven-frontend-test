import React from 'react';
import { Box, CssBaseline, ThemeProvider, Button, TextField } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PharmacySidebar from '../../scenes/global/PharmacySidebar';
import PharmacyTopbar from '../../scenes/global/PharmacyTopbar';


const MedicationEdit = () =>{
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [formValues, setFormValues] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const { itemid } = useParams();
  
  
    useEffect(() => {
        if (formSubmitted) {
          setFormValues({});
        }
    
      }, [formSubmitted]);
    
    
      const[id,idchange]=useState("");
      const[medicineName, medicineNamechange]=useState("");
      const[quantity,quantitychange]=useState("");
      const[genericName,genericNamechange]=useState("");
      const[date,datechange]=useState("");
      const[price,pricechange]=useState("");
    
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        const itemdata={id,medicineName,quantity,genericName,date,price};
        fetch("http://localhost:8000/AllMedicines/" + itemid, {
                    method: "PUT",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(itemdata)
                }).then((res) => {
                    toast.success('Item Records Updated Successfully.')
                    navigate("/medicine-list")
                }).catch((err) => {
                    toast.error('Failed :' + err.message);
                }); 
      };
    
    
      useEffect(() => {
        fetch("http://localhost:8000/AllMedicines/" + itemid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            medicineNamechange(resp.medicineName);
            quantitychange(resp.quantity);
            genericNamechange(resp.genericName);
            datechange(resp.date);
            pricechange(resp.price);
            
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    
    
      
    
  return (
    <>
    
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="app">
          <PharmacySidebar />
          <main className="content">
            <PharmacyTopbar />
            {/* Add Medication Main Body*/}
            <Box m="20px">

            <Header title="EDIT MEDICINE" subtitle="Fill the Form below to edit medicine details" />
                <Formik
                validationSchema={checkoutSchema}
                initialValues={initialValues}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                }) => (
                    <form onSubmit={handleFormSubmit}>
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
                        onChange={e=>medicineNamechange(e.target.value)}
                        value={medicineName}
                        name="medicineName"
                        error={!!touched.medicineName && !!errors.medicineName}
                        helperText={touched.medicineName && errors.medicineName}
                        sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Generic Name"
                        onBlur={handleBlur}
                        onChange={e=>genericNamechange(e.target.value)}
                        value={genericName}
                        name="genericName"
                        error={!!touched.genericName && !!errors.genericName}
                        helperText={touched.genericName && errors.genericName}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Quantity"
                        onBlur={handleBlur}
                        onChange={e=>quantitychange(e.target.value)}
                        value={quantity}
                        name="quantity"
                        error={!!touched.quantity && !!errors.quantity}
                        helperText={touched.quantity && errors.quantity}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Price ( GH₵  )"
                        onBlur={handleBlur}
                        onChange={e=>pricechange(e.target.value)}
                        value={price}
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
                        onChange={e=>datechange(e.target.value)}
                        value={date}
                        name="date"
                        error={!!touched.date && !!errors.date}
                        helperText={touched.date && errors.date}
                        sx={{ gridColumn: "span 2" }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" size="large" sx={{fontWeight: "700"}}>
                        Save Records
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
    medicineName: yup.string(),
    genericName: yup.string(),
    quantity: yup.string(),
    date: yup.string(),
    price: yup.string(),
  });
  
  const initialValues = {
      medicineName: "",
      genericName: "",
      quantity: "",
      date: "",
      price: "",
    };
    
    
  

export default MedicationEdit;