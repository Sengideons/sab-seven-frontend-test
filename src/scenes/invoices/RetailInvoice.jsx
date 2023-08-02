import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import './style.css';
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
//import { useHistory } from 'react-router-dom';



const RetailInvoice = () => {
  const[transactiondata, transactiondatachange]=useState(null);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  
  const LoadDetail = (id) => {
    navigate("/retail-invoice/retail-invoice-details/" + id);
}

const Removefunction = (id) => {
  if (window.confirm('Are sure you want to delete this item?')) {
      fetch("http://localhost:8000/RetailInvoice/" + id, {
          method: "DELETE"
      }).then((res) => {
          toast.success('Item deleted successfully.')
          window.location.reload();
      }).catch((err) => {
          console.log(err.message)
      })
  }
}


  useEffect(()=>{
    fetch("http://localhost:8000/RetailInvoice").then((res)=>{
      return res.json();
    }).then((resp)=>{
        transactiondatachange(resp);
    }).catch((err)=>{
      console.log(err.message);
    })
  }, [])

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  }


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const filteredData = transactiondata ? transactiondata.filter(item => {
    return item.itemName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.itemDescription.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchValue.toLowerCase())
  }) : null;

  return (
    <Box m="20px">
      <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            width="30%"
            justifyContent=""
            m="0"
            marginTop="-70px"
            marginBottom="60px"
            p="5px"
        >
            <InputBase 
            sx={{ ml: 2, flex: 1 }} 
            placeholder="Search" 
            value={searchValue}
            onChange={handleSearch}
            />
            <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
            </IconButton>
        </Box>
    <Header title="INVOICE" subtitle="This is the list of all invoices generated from wholesale store" />
    {transactiondata ? (
      <Box m="20px 0 0 0" sx={{overflow: "auto"}}>
        <table>
          <thead style={{backgroundColor: colors.blueAccent[700], borderBottom: "none", lineHeight: "40px"}}>
            <tr>
              <th style={{borderBottom: "none",}} >ID</th>
              <th style={{borderBottom: "none",}} >Item Name</th>
              <th style={{borderBottom: "none",}} >Quantity</th>
              <th style={{borderBottom: "none",}} >Description</th>
              <th style={{borderBottom: "none",}} >Unit Price (GHC)</th>
              <th style={{borderBottom: "none",}} >Date</th>
              <th style={{borderBottom: "none",}} >Amount</th>
              <th style={{borderBottom: "none",}} >Actions</th>
              <th style={{borderBottom: "none"}} ></th>
            </tr>
          </thead>
          <tbody style={{backgroundColor: colors.primary[400]}}>
            {filteredData.map((data) => (
              <tr key={data.id}>
                <td style={{width: "90"}}>{data.id}</td>
                <td style={{color: colors.greenAccent[300], width: "160"}}>{data.itemName}</td>
                <td style={{width: "150"}}>{data.quantity}</td>
                <td>{data.itemDescription}</td>
                <td>{data.price}</td>
                <td>{data.date}</td>
                <td>{data.amount}</td>
                
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<InfoIcon />}
                    sx={{ fontWeight: "700" }}
                    onClick={() => { LoadDetail(data.id) }}
                  >
                    Details
                  </Button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    sx={{ fontWeight: "700" }}
                    onClick={() => { Removefunction(data.id) }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    ) : (
      <Typography variant="h6">Loading...</Typography>
    )}
  </Box>
);
};

export default RetailInvoice;