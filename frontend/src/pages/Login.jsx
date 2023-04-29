import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((error) => {
     alert(error.response.data.message)
      });
  };
  return (
    <div className="flex h-screen items-center justify-center ">
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
                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-blue-500 p-2 text-white"
                >
                  Giriş Yap
                </button>
              </div>
            </form>
            <NavLink to={"/register"} className="flex justify-end pt-2">
              {" "}
              Üye ol
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
