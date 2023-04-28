import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar, avatar.name);
    
  
    axios.post("http://localhost:5000/api/register",formData)
    .then(res => {
     localStorage.setItem("token",JSON.stringify(res.data.token));
     localStorage.setItem("user",JSON.stringify(res.data.user));
      navigate("/")
    })
  }
  

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <h1>Register Page</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                Name
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
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
              <div className="form-group mt-2 ">
                Avatar
                <input
                  required
                  type="file"
                  className="form-control"
                  id="avatar"
                  name="avatar"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  placeholder="Avatar"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-blue-500 p-2 text-white"
                >
                  Register
                </button>
              </div>
            </form>
            <NavLink to={"/login"} className="mt-2 flex justify-end">
              Giriş Yap
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
