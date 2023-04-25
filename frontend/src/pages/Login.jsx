import React, { useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <h3 className="text-center">Giriş Yap</h3>
          </div>
          <div className="card-body">
            <form autoComplete="off" onSubmit={login}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  required
                  email="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group mt-2 ">
                <label htmlFor="password">Şifre</label>
                <input
                  required
                  password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Şifre"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="w-full bg-blue-500 text-white mt-2 rounded-lg p-2">
                  Giriş Yap
                </button>
              </div>
            </form>
            <NavLink to={"/register"} className="flex justify-end pt-2"> Üye ol</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
