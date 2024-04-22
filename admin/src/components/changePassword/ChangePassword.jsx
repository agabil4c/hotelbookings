import { useState } from "react";
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./ChangePassword.scss";

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const validatePassword = (password) => {
        // Password validation rules
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        if (password.length < minLength) {
          return 'Password must be at least 8 characters long';
        } else if (!hasUpperCase) {
          return 'Password must contain at least one uppercase letter';
        } else if (!hasLowerCase) {
          return 'Password must contain at least one lowercase letter';
        } else if (!hasNumber) {
          return 'Password must contain at least one number';
        } else if (!hasSpecialChar) {
          return 'Password must contain at least one special character';
        }
    
        return '';
      };

    const handlePasswordChange = () => {
        const passwordError = validatePassword(password);
        const userId = JSON.parse(localStorage.getItem("user"));
        if (passwordError) {
        setError(passwordError);
        return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
    
        axios.post(`/auth/change-password/${userId._id}`, {password})
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: `You have successfully changed your password`,
                    timer:2000
                });
                axios.post("/auth/logout");
                localStorage.clear();
                setLoading(false);
                history("/login");
            })
            .catch((error) => {
                console.log("The error is "+ error);
                setLoading(false);
                Swal.fire({
                    icon: "warning",
                    title: `There was an error changing your password`,
                    timer:4000
                });
            })
      };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    Change Password
                </div>
                <div className="bottom">
                    <div className="right">
                        <Grid container>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item xs={12}>
                                        
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        label="New Password"
                                        type="password"
                                        fullWidth
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        label="Confirm New Password"
                                        type="password"
                                        fullWidth
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        error={error !== ''}
                                        helperText={error}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {loading ? (
                                            <CircularProgress />
                                        ) : (
                                            <Button variant="contained" color="primary" onClick={handlePasswordChange}>
                                                Change Password
                                            </Button>
                                        )}
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ChangePassword;