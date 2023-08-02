import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import { Formik } from 'formik';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';


const AdminAuthRegister = () => {
    const [level] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const [username, usernamechange] = useState("");
    const [fullname, fullnamechange] = useState("");
    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState("");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter your ';
        if (username === null || username === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (fullname === null || fullname === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let regobj = {username, fullname, email, password}
        if (IsValidate()) {
        //console.log(regobj)
        fetch("http://localhost:8000/admin", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('New Admin Account Created Successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    };


    return (
        <>
            <Formik >
                {() => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup" 
                                    sx={{fontSize: '0.875rem', lineHeight: '1.4375em', fontWeight: '400'}}
                                    >Full Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="fullname"
                                        name="fullname"
                                        placeholder="Sen Gideons"
                                        fullWidth
                                        sx={{fontSize: '0.875rem'}}
                                        value={fullname}
                                        onChange={e => fullnamechange(e.target.value)}
                                    />
                                  
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup" sx={{fontSize: '0.875rem', lineHeight: '1.4375em', fontWeight: '400'}}
                                    >User Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="lastname-signup"
                                        type="username"
                                        name="username"
                                        placeholder="Gideons"
                                        inputProps={{}}
                                        sx={{fontSize: '0.875rem'}}
                                        value={username}
                                        onChange={e => usernamechange(e.target.value)}
                                    />
                                   
                                </Stack>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup" sx={{fontSize: '0.875rem', lineHeight: '1.4375em', fontWeight: '400'}}
                                    >Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="email-login"
                                        type="email"
                                        name="email"
                                        placeholder="email@gmail.com"
                                        inputProps={{}}
                                        sx={{fontSize: '0.875rem'}}
                                        value={email}
                                        onChange={e => emailchange(e.target.value)}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup" sx={{fontSize: '0.875rem', lineHeight: '1.4375em', fontWeight: '400'}}
                                    >Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="password-signup"
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
                                        placeholder="******"
                                        inputProps={{}}
                                        sx={{fontSize: '0.875rem'}}
                                        value={password}
                                        onChange={e => passwordchange(e.target.value)}
                                    />
                                    
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{fontSize: '0.75rem', fontWeight: '400', lineHeight: '1.66'}}>
                                    By Signing up, you agree to our &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#" sx={{fontSize: '0.75rem', fontWeight: '400', lineHeight: '1.66'}}>
                                        Terms of Service
                                    </Link>
                                    &nbsp; and &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#" sx={{fontSize: '0.75rem', fontWeight: '400', lineHeight: '1.66'}}>
                                        Privacy Policy
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{fontSize: '0.9375rem', fontWeight: '400'}}
                                    >
                                        Create Account
                                    </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AdminAuthRegister;
