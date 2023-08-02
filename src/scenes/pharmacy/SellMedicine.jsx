import React, { useEffect, useState } from 'react';
import './style.css'
import { Box, CssBaseline, ThemeProvider, TextField, Autocomplete } from "@mui/material";
import Header from "../../components/Header";
import { ColorModeContext, tokens, useMode } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import PharmacySidebar from '../../scenes/global/PharmacySidebar';
import PharmacyTopbar from '../../scenes/global/PharmacyTopbar';
import { toast } from "react-toastify";
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';


const SellMedicine = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [medicineOptions, setMedicineOptions] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [medicineList, setMedicineList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const receiptNumber = generateReceiptNumber();
  const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
  const [status, setStatus] = useState({});



  useEffect(() => {
    axios
      .get('http://localhost:8000/AllMedicines')
      .then(response => {
        setMedicineOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching medicine options:', error);
        toast.error('Failed to fetch medicine options.');
      });
  }, []);

  const handleMedicineSelect = (event, value) => {
    const selectedMedicineData = medicineOptions.find(
      medicine => medicine.medicineName === value
    );
    setSelectedMedicine(selectedMedicineData);
  };

  const handleAddMedicine = () => {
    if (selectedMedicine) {
      const quantity = parseInt(selectedMedicine.quantity);
      const price = parseFloat(selectedMedicine.price);
      const availableQuantity = parseInt(selectedMedicine.availableQuantity);

      if (quantity === 0) {
    toast.error("Please check the quantity");
  } else if (quantity > availableQuantity) {
    toast.error("Quantity exceeds available stock");
  } else {
    const newMedicine = {
      medicineName: selectedMedicine.medicineName,
      amount: quantity * price,
      quantity: quantity,
      expiryDate: selectedMedicine.date,
      status: calculateStatus(selectedMedicine.date),
    };

    setMedicineList(prevList => [...prevList, newMedicine]);
    setSelectedMedicine(null);

    // Calculate and update the total amount
    const updatedTotalAmount = totalAmount + newMedicine.amount;
    setTotalAmount(updatedTotalAmount);
  }
    }
  };

  const calculateStatus = (expiryDate) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const daysUntilExpiry = moment(expiryDate).diff(currentDate, 'days');
  
    if (daysUntilExpiry < 0) {
      return 'expired';
    } else if (daysUntilExpiry <= 30) {
      return 'expiring';
    } else {
      return 'active';
    }
  };

  const handleDeleteMedicine = (index) => {
  setMedicineList((prevList) => {
    const deletedMedicine = prevList[index];
    const updatedList = [...prevList];
    updatedList.splice(index, 1);

    // Subtract the amount of the deleted medicine from the total amount
    const updatedTotalAmount = totalAmount - deletedMedicine.amount;
    setTotalAmount(updatedTotalAmount);

    // Remove the status of the deleted medicine from the status state
    setStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus };
      delete updatedStatus[index];
      return updatedStatus;
    });

    return updatedList;
  });
};


function generateReceiptNumber() {
  const randomDigits = Math.floor(Math.random() * 1000000000); // Generate a random 9-digit number
  const receiptNumber = "SAB7" + randomDigits.toString().padStart(9, "0"); // Pad the number with zeros and prepend "SG"
  return receiptNumber;
  }


  const handleSellMedicine = () => {
    // Generate the receipt number
    const receiptNumber = generateReceiptNumber();
  
    // Create the invoice object from the medicineList
    const invoice = {
      medicines: medicineList,
      totalAmount: totalAmount,
      receiptNumber: receiptNumber,
      date: moment().format('YYYY-MM-DD HH:mm:ss') // Add the current date and time
    };
  
    // Send a POST request to the server to save the invoice
    axios
      .post('http://localhost:8000/SalesInvoice', invoice)
      .then(response => {
        // Handle the response if needed
        toast.success("Medicine sold successfully!");
  
        // Update the quantities of medicines in the AllMedicines endpoint
        const updatedMedicineOptions = medicineOptions.map(medicineOption => {
          const matchingMedicine = medicineList.find(medicine => medicine.medicineName === medicineOption.medicineName);
          if (matchingMedicine) {
            const updatedQuantity = medicineOption.quantity - matchingMedicine.quantity;
            return {
              ...medicineOption,
              quantity: updatedQuantity,
              availableQuantity: updatedQuantity // Update availableQuantity as well if needed
            };
          }
          return medicineOption;
        });
  
        // Update the medicine options with the updated quantities
        setMedicineOptions(updatedMedicineOptions);
  
        // Update the AllMedicines endpoint with the updated quantities
        updatedMedicineOptions.forEach(updatedMedicine => {
          axios
          .put(`http://localhost:8000/AllMedicines/${updatedMedicine.id}`, updatedMedicine)
            .then(response => {
              // Handle the response if needed
            })
            .catch(error => {
              console.error('Error updating medicine:', error);
              toast.error('Failed to update medicine.');
            });
        });
  
        setMedicineList([]);
        setTotalAmount(0); // Clear the medicine list after selling
        setInvoiceData(response.data); // Set the invoice data received from the server
        setIsModalOpen(true); // Open the modal
      })
      .catch(error => {
        console.error('Error selling medicine:', error);
        toast.error('Failed to sell medicine.');
      });



      
    // Get the dimensions of the screen
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // Calculate the position of the popup window to center it
    const popupWidth = 600;
    const popupHeight = 600;
    const popupLeft = (screenWidth - popupWidth) / 2;
    const popupTop = (screenHeight - popupHeight) / 2;

    const popupWindow  = window.open('', 'popupWindow', `width=${popupWidth},height=${popupHeight},left=${popupLeft},top=${popupTop}`);
    popupWindow.document.write(`
      <html>
        <head>
          <title></title>
          <style>
            /* Add your custom CSS styles for the receipt here */
          </style>
        </head>

        <body>
        <div class="pos" id="_0:0" style="top:0">
            <table style="position:absolute;top:3.89in;left:1.46in;">
            <thead>
            <tr>
            <th> <div top:3.89in;left:0.42in;width:0.32in;line-height:0.17in;"><span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Calibri;color:#000000">QTY</span><span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div></th>
            <th> <div top:3.89in;left:0.86in;width:0.95in;line-height:0.17in;"><span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Calibri;color:#000000">MEDICATION</span><span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div></th>
            <th> <div top:3.79in;left:5.19in;width:0.44in;line-height:0.17in;"><span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Calibri;color:#000000">PR</span><span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Calibri;color:#000000">ICE</span><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
             <div top:3.99in;left:5.19in;width:0.44in;line-height:0.17in;"><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000">(GH₵)</span><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div></th>
            </tr>
            </thead>

            <tbody>
                  ${invoice.medicines
                      .map(
                        (medicine) =>
                  `
                  <tr>      
                  <td><div style="top:4.22in;left:0.42in;width:0.12in;line-height:0.17in;"><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000">${medicine.quantity}</span><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div></td>
                  <td><div style="top:4.22in;left:0.86in;width:2.34in;line-height:0.17in;"><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000">${medicine.medicineName}</span><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div></td>
                  <td><div style="top:4.22in;left:5.19in;width:0.67in;line-height:0.17in;"><span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Calibri;color:#000000">${medicine.amount}</span><span style="font-style:normal;font-weight:bold;font-size:11pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div></td>
                  </tr>
                  `
                  )
                  .join('')}

            </tbody>

            </table>

            <div style="position:absolute;top:1.67in;left:0.92in;width:4.58in;line-height:0.33in;"><span style="font-style:normal;font-weight:bold;font-size:22pt;font-family:Calibri;color:#000000">PHARMARCY NAME</span><span style="font-style:normal;font-weight:bold;font-size:22pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
            <img style="position:absolute;top:2.03in;left:1.33in;width:3.70in;height:0.38in" src="assets/receipt/vi_6.png" />
            <div style="position:absolute;top:2.13in;left:1.44in;width:3.52in;line-height:0.24in;"><span style="font-style:normal;font-weight:normal;font-size:16pt;font-family:Consolas;color:#000000">ADDRESS</span><span style="font-style:normal;font-weight:normal;font-size:16pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
            <img style="position:absolute;top:2.56in;left:1.59in;width:1.19in;height:0.41in" src="assets/receipt/vi_7.png" />
            <div style="position:absolute;top:2.66in;left:1.70in;width:0.76in;line-height:0.17in;"><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000">${invoice.date}</span><span style="font-style:normal;font-weight:normal;font-size:11pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
            <img style="position:absolute;top:2.54in;left:3.85in;width:0.85in;height:0.41in" src="assets/receipt/vi_8.png" />
            <img style="position:absolute;top:2.96in;left:0.24in;width:5.88in;height:0.37in" src="assets/receipt/vi_9.png" />
            <div style="position:absolute;top:3.06in;left:0.35in;width:5.65in;line-height:0.21in;"><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">****************************************</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">*</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">***</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">*</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">***</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
            <img style="position:absolute;top:3.26in;left:1.32in;width:3.71in;height:0.38in" src="assets/receipt/vi_10.png" />
            <div style="position:absolute;top:3.36in;left:1.44in;width:3.52in;line-height:0.24in;"><span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Consolas;color:#000000">Receipt </span><span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Consolas;color:#000000">No.</span><span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Consolas;color:#000000"> : <span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Consolas;color:#000000">${invoice.receiptNumber}</span><span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
            <img style="position:absolute;top:5.82in;left:2.94in;width:2.32in;height:0.38in" src="assets/receipt/vi_11.png" />
            <div style="position:absolute;top:5.93in;left:3.06in;width:2.06in;line-height:0.24in;"><span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Consolas;color:#000000">TOTAL : GH₵ ${invoice.totalAmount}</span><span style="font-style:normal;font-weight:bold;font-size:16pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
            <img style="position:absolute;top:7.03in;left:0.24in;width:5.88in;height:0.37in" src="assets/receipt/vi_12.png" />
            <div style="position:absolute;top:7.13in;left:0.35in;width:5.65in;line-height:0.21in;"><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">****************************************</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">*</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">***</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">*</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Consolas;color:#000000">***</span><span style="font-style:normal;font-weight:normal;font-size:14pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
            <img style="position:absolute;top:7.61in;left:1.33in;width:3.70in;height:1.29in" src="assets/receipt/vi_13.png" />
            <div style="position:absolute;top:7.72in;left:1.44in;width:3.60in;line-height:0.24in;"><span style="font-style:normal;font-weight:normal;font-size:16pt;font-family:Consolas;color:#000000">♥ Thank you for purchasing</span><span style="font-style:normal;font-weight:normal;font-size:16pt;font-family:Consolas;color:#000000"> </span><br/></SPAN></div>
            <div style="position:absolute;top:8.03in;left:1.44in;width:3.33in;line-height:0.24in;"><span style="font-style:normal;font-weight:normal;font-size:16pt;font-family:Consolas;color:#000000">your medication from us,</span><span style="font-style:normal;font-weight:normal;font-size:16pt;font-family:Consolas;color:#000000"> </span><br/></SPAN></div>
            <div style="position:absolute;top:8.33in;left:1.44in;width:3.39in;line-height:0.24in;"><span style="font-style:normal;font-weight:normal;font-size:16pt;font-family:Consolas;color:#000000">we hope to see you again.</span><span style="font-style:normal;font-weight:normal;font-size:16pt;font-family:Calibri;color:#000000"> </span><br/></SPAN></div>
        </div>

        <button id="printButton" style="background:#0559f5;color:#fff;border-radius:5px;font-size: 18px;margin:10px;">Print Receipt</button>

        <script>
          // Function to print the receipt when the "Print Receipt" button is clicked
          window.onload = function() {
            document.querySelector('#printButton').addEventListener('click', function() {
              // Hide the button before printing
              document.querySelector('#printButton').style.display = 'none';
        
              // Print the document
              window.print();
        
              // Show the button again after printing
              document.querySelector('#printButton').style.display = 'block';
            });
          };
        </script>
        
        <style>
          /* Hide the button when printing */
          @media print {
            #printButton {
              display: none;
              
            }
          }
        </style>
        
        </body>
      </html>
    `);
    popupWindow.document.close();
  
  };
  


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const getStatusDotColor = (status) => {
    switch (status) {
      case 'expired':
        return 'red';
      case 'active':
        return 'green';
      case 'expiring':
        return 'yellow';
      default:
        return 'green'; // or any other default color for unknown status
    }
  };
  
  

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <div className="app" style={{ overflowX: "auto" }}>
              <PharmacySidebar />
              <main className="content">
                <PharmacyTopbar />
                <Box m="20px">
                  <Header title="SELL MEDICINE" subtitle="Configure the details to sell medicine" />
                  <hr style={{ borderTop: "2px solid #02b6ff" }} />
                  <form>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}
                    >
                      <Autocomplete
                        fullWidth
                        options={medicineOptions.map(medicine => medicine.medicineName)}
                        value={selectedMedicine ? selectedMedicine.medicineName : null}
                        onInputChange={handleMedicineSelect}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Enter Medicine or Generic Name"
                            variant="filled"
                          />
                        )}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Quantity"
                        id="quantity"
                        sx={{ gridColumn: "span 2" }}
                        value={selectedMedicine ? selectedMedicine.quantity : ''}
                        onChange={(e) => {
                          setSelectedMedicine((prevState) => ({
                            ...prevState,
                            quantity: e.target.value
                          }));
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Unit Quantity"
                        id="unitQuantity"
                        sx={{ gridColumn: "span 2" }}
                        value={selectedMedicine ? selectedMedicine.unitQuantity : ''}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Expiry date"
                        id="expiryDate"
                        sx={{ gridColumn: "span 2" }}
                        value={selectedMedicine ? selectedMedicine.date : ''}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Price (GH₵)"
                        id="price"
                        sx={{ gridColumn: "span 2" }}
                        value={selectedMedicine ? selectedMedicine.price : ''}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Amount (GH₵)"
                        sx={{ gridColumn: "span 2" }}
                        value={selectedMedicine ? (selectedMedicine.quantity * selectedMedicine.price) || '' : ''}
                        disabled={!selectedMedicine || !selectedMedicine.quantity || !selectedMedicine.price}
                      />
                    </Box>
                  </form>
                  <Box m="20px 0 0 0"></Box>
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn-secondry add-item m-r5"
                      style={{ background: "#f7b205", color: "#000" }}
                      onClick={handleAddMedicine}
                    >
                      <i className="fa fa-fw fa-plus-circle"></i>Add Medicine
                    </button>
                  </div>
                  <hr style={{ borderTop: "2px solid #02b6ff" }} />
                  <Box m="20px 0 0 0"></Box>
                  <div className="table-responsive">
                    <table className="table">
                      <thead style={{ backgroundColor: colors.blueAccent[700], borderBottom: "none", color: "#fff" }}>
                        <tr>
                          <th></th>
                          <th>Medicine Name</th>
                          <th>Amount (GH₵)</th>
                          <th>Quantity</th>
                          <th>Status</th>
                          <th>Expiry Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicineList.map((medicine, index) => (
                          <tr key={index}>
                            <td>
                              <a
                                className="delete"
                                href="#removed"
                                style={{ color: "#f7b205" }}
                                onClick={() => handleDeleteMedicine(index)}
                              >
                                <i className="fa fa-close"></i>
                              </a>
                            </td>
                            <td>{medicine.medicineName}</td>
                            <td>{medicine.amount}</td>
                            <td>{medicine.quantity}</td>
                            <td>
                            <span
                            style={{
                              backgroundColor: getStatusDotColor(medicine.status),
                              display: 'inline-block',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              marginRight: '4px',
                            }}
                          />
                          {medicine.status}

                            </td>
                            <td>{medicine.expiryDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div><br />
                  <FormControl 
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  disabled>
                    <InputLabel htmlFor="outlined-adornment-amount">Total Amount</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">GH₵</InputAdornment>}
                      label="Amount"
                      value={totalAmount}
                    />
                  </FormControl><br /><br />
                  <div className="col-12">
                    <button
                      type="reset"
                      className="btn-secondry add-item m-r5"
                      style={{ background: "green", color: "#fff" }}
                      onClick={handleSellMedicine} 
                    >
                      Sell Medicine
                    </button>
                  </div><br /><br />
               
                </Box>
              </main>
            </div>
          </CssBaseline>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default SellMedicine;
