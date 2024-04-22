import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const style2 = {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 345,
    bgcolor: 'background.paper',
    border: '0px',
    boxShadow: 0,
    p: 4,
  };

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post("/auth/forgot-password",{email:email})
        .then((res) => {
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: `Reset Password email has been sent to ${email}`,
                timer:2000
            });
        })
        .catch((error) => {
            setLoading(false);
            Swal.fire({
                icon: "warning",
                title: `Error`,
                text: error.response.data,
                timer:4000
            });
        })
    }
    return (
        <Box sx={style2}>
            <div>
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>Please enter your email below:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    {/* <button type="submit">Reset Password</button> */}
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            
                        </Grid>
                        <Grid item xs={8}>
                            {loading ? (
                                <CircularProgress />
                            ) :(
                                <Button variant="outlined" color="success" type="submit" size="medium"> Reset Password</Button>
                            )}
                        </Grid>
                    </Grid>
                    
                </form>
            </div>
        </Box>
        
    )
}

export default ForgotPassword