import { Link } from 'react-router-dom';
import './Register.css'

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import AdminAuthRegister from './auth-forms/AdminAuthRegister';

// ================================|| REGISTER ||================================ //

const AdminRegister = () => (
    <div className='lgn-bg'>
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.33 }}>
                        Admin Sign up</Typography>
                    <Typography component={Link} to="/login" variant="body1" 
                    sx={{ textDecoration: 'none', fontSize: '0.875rem', color: 'rgb(24, 144, 255)', fontWeight: 400, lineHeight: 1.57}}>
                        Already have an account?
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <AdminAuthRegister />
            </Grid>
        </Grid>
    </AuthWrapper>
    </div>
);

export default AdminRegister;
