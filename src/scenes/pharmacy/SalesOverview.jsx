import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const SalesOverview = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch sales data from the JSON Server API
    axios.get('http://localhost:8000/SalesInvoice')
      .then(response => {
        setSalesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom
      sx={{color:"#70d8bd!important"}}
      >
        Sales Overview 📌
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{background:"#21BF73!important"}}>
              <TableCell sx={{color:"#562B08!important", fontWeight:"bold"}}>Date</TableCell>
              <TableCell sx={{color:"#562B08!important", fontWeight:"bold"}}>Items Sold</TableCell>
              <TableCell sx={{color:"#562B08!important", fontWeight:"bold"}}>Quantity Sold</TableCell>
              <TableCell sx={{color:"#562B08!important", fontWeight:"bold"}}>Amount Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map(sale => (
              <TableRow key={sale.id}>
                <TableCell>{sale.date}</TableCell>
                <TableCell>
                  {sale.medicines.map((medicine, index) => (
                    <div key={index}>{medicine.medicineName}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {sale.medicines.map((medicine, index) => (
                    <div key={index}>{medicine.quantity}</div>
                  ))}
                </TableCell>
                <TableCell>{sale.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesOverview;
