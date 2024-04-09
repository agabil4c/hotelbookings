import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h1 className="text-2xl text-center mb-4">Welcome to the Admin Panel</h1>
        <form className="max-w-md mx-auto" onSubmit={handleClick}>
          <input type="text"
                placeholder="username"
                id="username"
                onChange={handleChange} />
          <input type="password"
                placeholder="password"
                id="password"
                onChange={handleChange} />
          <button disabled={loading} onClick={handleClick} className="lButton primary">
            Login
          </button>
          <button></button>
          {error && <span>{error.message}</span>}
          
          <Button variant="text" href="/forgot-password"> Forgot Password</Button>
        </form>
      </div>
    </div>
    
  );
};

export default Login;
