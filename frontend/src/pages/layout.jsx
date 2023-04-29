import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const checkLogin = () => {
    let token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            My Social Media
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
            <div  onClick={logout} className="btn text-black ">
              Çıkış Yap
            </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
