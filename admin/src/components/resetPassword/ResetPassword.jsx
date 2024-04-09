import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const history = useNavigate();
    const location = useLocation();
    const [token,setToken] = useState('');
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tokenParam = searchParams.get('token');
        if(tokenParam) {
            setToken(tokenParam);
        }
    }, [location.search])

    const handleClick = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not much")
        }
        await axios.post("/auth/reset-password",{token,password})
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: `You have successfully reset your password`,
                    timer:2000
                });
                history("/login");
            })
            .catch((error) => {
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
                    <button onClick={handleClick} className="lButton primary">
                        Reset
                    </button>
                    {errorMessage && <span>{errorMessage}</span>}
                
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;