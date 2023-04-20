import React from "react";

const Login = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "20px" }}
    >
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <h3 className="text-center">Giriş Yap</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Şifre</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Şifre"
                />
              </div>
              <div className="form-group">
              <button type="submit" className="btn btn-primary w-100 mt-2">
                Giriş Yap
              </button>
              </div>
           
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
