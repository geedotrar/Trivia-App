import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

export default function Register() {
  const registerData = {
    userName: "",
    password: "",
  };

  const [register, setRegister] = useState(registerData);

  const handleChange = (e) => {
    const registrationData = { ...register };
    registrationData[e.target.name] = e.target.value;
    setRegister(registrationData);
  };

  const handleRegistration = () => {
    if (!register.userName || !register.password) {
      alert("Username or Password cannot be empty");
    } else {
      localStorage.setItem("user", JSON.stringify(register));
      alert("Registration successful!");
      setRegister(registerData);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input type="text" name="userName" placeholder="Username" value={register.userName} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={register.password} onChange={handleChange} />
      <button onClick={handleRegistration}>Register</button>
      <Link className="link" to="/">
        Login
      </Link>
    </div>
  );
}
