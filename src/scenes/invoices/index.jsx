import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";


const Invoices = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formValues, setFormValues] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    if (formSubmitted) {
      setFormValues({});
    }

  }, [formSubmitted]);


  

  return (
    <Box m="20px">
      <Header title="INVOICE" subtitle="Fill the Form below to add an item" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                label="Item Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemName}
                name="itemName"
                error={!!touched.itemName && !!errors.itemName}
                helperText={touched.itemName && errors.itemName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Item Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemDescription}
                name="itemDescription"
                error={!!touched.itemDescription && !!errors.itemDescription}
                helperText={touched.itemDescription && errors.itemDescription}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Item Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemType}
                name="itemType"
                error={!!touched.itemType && !!errors.itemType}
                helperText={touched.itemType && errors.itemType}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Serial Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.serialNumber}
                name="serialNumber"
                error={!!touched.serialNumber && !!errors.serialNumber}
                helperText={touched.serialNumber && errors.serialNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
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
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit Item
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  itemName: yup.string().required("required"),
  category: yup.string().required("required"),
  itemDescription: yup.string().required("required"),
  itemType: yup.string().required("required"),
  date: yup.string().required("required"),
  serialNumber: yup.string().required("required"),
  price: yup.string().required("required"),
  amount: yup.string().required("required"),
});
const initialValues = {
  itemName: "",
  category: "",
  itemDescription: "",
  itemType: "",
  date: "",
  serialNumber: "",
  price: "",
  amount: "",
};

export default Invoices;
