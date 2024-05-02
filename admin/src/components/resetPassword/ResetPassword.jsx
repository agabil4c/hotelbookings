import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const ResetPassword = () => {
    const history = useNavigate();
    const location = useLocation();
    const [token,setToken] = useState('');
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tokenParam = searchParams.get('token');
        if(tokenParam) {
            setToken(tokenParam);
        }
    }, [location.search])

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

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);

        const passwordError = validatePassword(password);
        if (passwordError) {
            setLoading(false);
            setErrorMessage(passwordError);
        return;
        }

        if (password !== confirmPassword) {
            setLoading(false);
            setErrorMessage("Passwords do not much");
        }
        await axios.post("/auth/reset-password",{token,password})
            .then((res) => {
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    title: `You have successfully reset your password`,
                    timer:2000
                });
                history("/login");
            })
            .catch((error) => {
                setLoading(false);
                setErrorMessage('Failed to reset password');
            })
    }

    return (
        <div className="reset">
            <div className="lContainer">
                <h1 className="text-2xl text-center mb-4">Reset Password</h1>
                <form className="max-w-md mx-auto" onSubmit={handleClick}>
                    <label>New Password</label>
                    <input type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm Password</label>
                    <input type="password"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    <>
                        {loading ? (
                        <CircularProgress />
                        ) : (
                            <button onClick={handleClick} className="lButton primary">
                                Reset
                            </button>
                        )}
                    </>
                    
                    {errorMessage && <span>{errorMessage}</span>}
                
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;