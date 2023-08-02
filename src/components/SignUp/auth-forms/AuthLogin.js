import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Button,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
} from '@mui/material';

import { Formik } from 'formik';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const AuthLogin = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
            },[]);

            const ProceedLogin = (e) => {
                e.preventDefault();
                if (validate()) {
                    fetch("http://localhost:8000/user?username=" + username) // Use the correct identifier field here
                        .then((res) => {
                            return res.json();
                        })
                        .then((resp) => {
                            if (resp.length === 0) { // Since it's an array of matching users, check the length
                                fetch("http://localhost:8000/admin?username=" + username) // Use the correct identifier field here
                                    .then((res) => {
                                        return res.json();
                                    })
                                    .then((adminResp) => {
                                        if (adminResp.length === 0) { // Check the length
                                            toast.error("Please Enter valid username");
                                        } else {
                                            if (adminResp[0].password === password) { // Access the first user in the array
                                                toast.success(
                                                    "Admin Login Successfull, please wait for the page to load"
                                                );
                                                sessionStorage.setItem("username", username);
                                                usenavigate("/admin-home");
                                            } else {
                                                toast.error("Please Enter valid credentials");
                                            }
                                        }
                                    })
                                    .catch((err) => {
                                        toast.error("Login Failed due to :" + err.message);
                                    });
                            } else {
                                // If the username is found in the "user" table.
                                if (resp[0].password === password) { // Access the first user in the array
                                    toast.success(
                                        "User Login Successfull, please wait for the page to load"
                                    );
                                    sessionStorage.setItem("username", username);
                                    usenavigate("/");
                                } else {
                                    toast.error("Please Enter valid credentials");
                                }
                            }
                        })
                        .catch((err) => {
                            toast.error("Login Failed due to :" + err.message);
                        });
                }
            };
            

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Your Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Your Password');
        }
        return result;
    }

    return (
        <>
            <Formik>
                {({isSubmitting}) => (
                    <form onSubmit={ProceedLogin}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login" sx={{fontSize: '0.875rem', lineHeight: '1.4375em', fontWeight: '400'}}
                                    >User Name</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="username"
                                        name="username"
                                        placeholder="Enter your username"
                                        fullWidth
                                        sx={{fontSize: '0.875rem'}}
                                        value={username} 
                                        onChange={e => usernameupdate(e.target.value)}
                                    />
                                    
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login" sx={{fontSize: '0.875rem', lineHeight: '1.4375em', fontWeight: '400'}}
                                    >Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                        sx={{fontSize: '0.875rem'}}
                                        value={password} 
                                        onChange={e => passwordupdate(e.target.value)}
                                    />
                                    
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    <Link variant="h6" component={RouterLink} to="" color="text.primary" sx={{fontSize: '0.875rem', color: 'rgb(24, 144, 255)', fontWeight: 400, lineHeight: 1.57}}>
                                        
                                    </Link>
                                </Stack>
                            </Grid>
                            
                            <Grid item xs={12}>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Login
                                    </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
