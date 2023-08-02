import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const WholesaleInvoice = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formValues, setFormValues] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate=useNavigate();


  const handleFormSubmit = async (values) => {
    const whosaleInvoice=(values);
    fetch("http://localhost:8000/WholesaleInvoice", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(whosaleInvoice)
            }).then((res) => {
                toast.success('Payment made Successfully.')
                navigate("/manage-wholesale-invoice")
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
            
            fetch("http://localhost:8000/WholesaleItems", {
              method: "POST",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(values)
            }).then((res) => {
                // Handle success response
            }).catch((err) => {
                // Handle error response
            });

  };


  useEffect(() => {
    if (formSubmitted) {
      setFormValues({});
    }

  }, [formSubmitted]);
  

  return (
    <Box m="20px">
      <Header title="MAKE PAYMENT" subtitle="Fill the Form below to add an invoice" />

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
                label="Supplier's Name ( From )"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.supplierName}
                name="supplierName"
                error={!!touched.supplierName && !!errors.supplierName}
                helperText={touched.supplierName && errors.supplierName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date of Supply ( Invoice )"
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
                label="Supplier's TIN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.supplierTin}
                name="supplierTin"
                error={!!touched.supplierTin && !!errors.supplierTin}
                helperText={touched.supplierTin && errors.supplierTin}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Unit Price ( GHC )"
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
                value={values.amount = values.price * values.quantity}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" size="large" sx={{fontWeight: "700"}}>
                Submit Invoice
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  itemName: yup.string().required("please enter item name"),
  quantity: yup.string().required("please enter quantity"),
  itemDescription: yup.string().required("please enter description"),
  supplierName: yup.string().required("please enter supplier name"),
  date: yup.string().required("please enter date"),
  supplierTin: yup.string().required("please enter supplier TIN"),
  price: yup.string().required("please enter price"),
  amount: yup.string().required("please enter amount"),
});

const initialValues = {
    itemName: "",
    quantity: "",
    itemDescription: "",
    supplierName: "",
    date: "",
    supplierTin: "",
    price: "",
    amount: "",
  };
  
  

export default WholesaleInvoice;
