import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="mt-20 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleClick}>
            <input type="text"
                  placeholder="username"
                  id="username"
                  onChange={handleChange} />
            <input type="password"
                  placeholder="password"
                  id="password"
                  onChange={handleChange} />
            <button className="primary">Login</button>
            {error && <span>{error.message}</span>}
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>

            </div>
          </form>
        </div>
        
      </div>

    </div>
    
    
  );
};

export default Login;
