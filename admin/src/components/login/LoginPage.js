import React, { useState } from 'react';
import './LoginPage.css';
import { useLogin, useNotify } from 'react-admin';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#0d6efd",
};

export default function LoginPage() {

  const [emailorphone, setEmailorphone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [color, setColor] = useState("#0000ff");
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    login({ emailorphone, password }).then((res)=>{
      setLoader(false);
      window.location.reload();
    }).catch(() =>
      notify('Invalid email or password')
    );
  };


  return (
    <div>
      <div className='front'>
      <div className="bg-img"></div>
      </div>
      <div className="form-container login">
        <div className='title' >
          <LockPersonIcon fontSize='large' style={{
            color: '#0d6efd',
            border: '2px solid #0d6efd',
            borderRadius: '50%',
            height: '1.3em',
            width: '1.3em',
            padding: '5px'
          }} />
          <h5 style={{ marginTop: '.7rem' }}>Admin Login</h5>
        </div>
        <div>
        <ClipLoader
        color={color}
        loading={loader}  
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
        <div className="registration-form row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} className="container">
              <div className="input-error">{errors.inputs}</div>
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>
                <input
                  value={emailorphone}
                  onChange={(e) => {
                    setEmailorphone(e.target.value);
                  }}
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                />
                <div className="input-error">{errors.email}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                />
                <div className="input-error">{errors.password}</div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
              {/* <div className="container signin">
                <p>
                  Don't have an account? <Link to="/">Sign Up</Link>.
                </p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}