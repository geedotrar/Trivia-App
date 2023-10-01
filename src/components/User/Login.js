import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const loginData = { ...login };
    loginData[e.target.name] = e.target.value;
    setLogin(loginData);
  };

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userName === login.userName && storedUser.password === login.password) {
      navigate("/homepage");
    } else {
      alert("Wrong Username Or Password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input type="text" name="userName" placeholder="Username" value={login.userName} onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" value={login.password} onChange={handleInputChange} />
      <button onClick={handleLogin}>Login</button>
      <Link className="link" to="/register">
        Register
      </Link>
    </div>
  );
}

export default Login;
