import React, { useState, useEffect} from 'react';
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "../../theme";
import PharmacySidebar from '../../scenes/global/PharmacySidebar';
import PharmacyTopbar from '../../scenes/global/PharmacyTopbar';
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const Users = () =>{
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);


    const[userdata, userdatachange]=useState(null);
    const[admindata, admindatachange]=useState(null);
    const navigate = useNavigate();
  
    const LoadDetail = (id) => {
        navigate("/team/team-wholesale-details/" + id);
    }

    const Removefunction = (id) => {
    if (window.confirm('Are sure you want to delete this User?')) {
        fetch("https://crazy-cod-sweater.cyclic.cloud/user/" + id, {
            method: "DELETE"
        }).then((res) => {
            toast.success('User deleted successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
    }
    const Removefunctionadmin = (id) => {
    if (window.confirm('Are sure you want to delete this User?')) {
        fetch("https://crazy-cod-sweater.cyclic.cloud/admin/" + id, {
            method: "DELETE"
        }).then((res) => {
            toast.success('User deleted successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
    }

    /*const LoadDetail = (managedata) => {
        navigate("/manage-wholesale-invoice/detail/" + managedata);
    }*/

    useEffect(()=>{
    fetch("https://crazy-cod-sweater.cyclic.cloud/user").then((res)=>{
        return res.json();
    }).then((resp)=>{
        userdatachange(resp);
    }).catch((err)=>{
        console.log(err.message);
    })
    }, [])


    useEffect(()=>{
    fetch("https://crazy-cod-sweater.cyclic.cloud/admin").then((res)=>{
        return res.json();
    }).then((resp)=>{
        admindatachange(resp);
    }).catch((err)=>{
        console.log(err.message);
    })
    }, [])



  return (
    <>
    
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="app">
          <PharmacySidebar />
          <main className="content">
            <PharmacyTopbar />
            {/* Dashboard Main Body*/}
            <Box m="20px">
            <Header title="USERS" subtitle="This is the list of accounts having access to this software" />
            <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="right"
            borderRadius="4px"
            >
            </Box>
            <Typography variant="h3" color="secondary">Employee Account</Typography>
            <br />
            <Link to={'/employee-register'}>
            <div className="col-12">
                <button
                    type="reset"
                    className="btn-secondry add-item m-r5"
                    style={{ background: "green", color: "#fff" }}
                >
                    <PersonAddIcon/> Resgister Employee
                </button>
            </div>
            </Link>

            {userdata ? (
            <Box m="20px 0 0 0" sx={{overflow: "auto"}}>
                <table>
                <thead style={{backgroundColor: colors.blueAccent[700], borderBottom: "none", lineHeight: "40px"}}>
                    <tr>
                    <th style={{borderBottom: "none",}} >USERNAME</th>
                    <th style={{borderBottom: "none",}} >FULL NAME</th>
                    <th style={{borderBottom: "none",}} >EMAIL</th>
                    <th style={{borderBottom: "none",}} >Actions</th>
                    <th style={{borderBottom: "none"}} ></th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor: colors.primary[400]}}>
                    {userdata.map((data) => (
                    <tr key={data.id}>
                        <td style={{width: "90"}}>{data.username}</td>
                        <td style={{color: colors.greenAccent[300], width: "160"}}>{data.fullname}</td>
                        <td style={{width: "150"}}>{data.email}</td>
                        
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
            <Typography variant="h2" sx={{color: colors.blueAccent[700]}}>Loading...</Typography>
            )}


            {/* ADMIN ACCOUNTS*/}
            <br />
            <Typography variant="h3" color="secondary">Admin Account</Typography>
            <br /><Link to={'/admin-register'}>
            <div className="col-12">
                <button
                    type="reset"
                    className="btn-secondry add-item m-r5"
                    style={{ background: "green", color: "#fff" }}
                >
                    <PersonAddIcon 
                    /> Resgister Admin
                </button>
            </div>
            </Link>

            {admindata ? (
            <Box m="20px 0 0 0" sx={{overflow: "auto"}}>
                <table>
                <thead style={{backgroundColor: colors.blueAccent[700], borderBottom: "none", lineHeight: "40px"}}>
                    <tr>
                    <th style={{borderBottom: "none",}} >USERNAME</th>
                    <th style={{borderBottom: "none",}} >FULL NAME</th>
                    <th style={{borderBottom: "none",}} >EMAIL</th>
                    <th style={{borderBottom: "none",}} >Actions</th>
                    <th style={{borderBottom: "none"}} ></th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor: colors.primary[400]}}>
                    {admindata.map((data) => (
                    <tr key={data.id}>
                        <td style={{width: "90"}}>{data.username}</td>
                        <td style={{color: colors.greenAccent[300], width: "160"}}>{data.fullname}</td>
                        <td style={{width: "150"}}>{data.email}</td>
                        
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
                            onClick={() => { Removefunctionadmin(data.id) }}
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
            <Typography variant="h2" sx={{color: colors.blueAccent[700]}}>Loading...</Typography>
            )}
        </Box>
            {/* End of Main Body*/}
          </main>
        </div>
      </CssBaseline>
    </ThemeProvider>
  </ColorModeContext.Provider>
  </>
  );
}

export default Users;