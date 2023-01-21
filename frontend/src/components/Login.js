import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useFormik } from "formik";
import * as Yup from 'yup';

import AuthService from "../services/auth.service";

/*const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};*/

const Login = () => {
  let navigate = useNavigate();

  /*const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");*/
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");/*

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  */

  const handleLogin = (data) => {
    //e.preventDefault();

    //setMessage("");
    setLoading(true);

    //form.current.validateAll();

    //if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(data.username, data.password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    /*} else {
      setLoading(false);
    }*/
  };
  
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
    //.min(6, "Username must be at least 6 characters")
    //.max(20, "Username must not exceed 20 characters"),
  password: Yup.string()
    .required("Password is required")
    //.min(6, "Password must be at least 6 characters")
    //.max(40, "Password must not exceed 40 characters")
});

const formik = useFormik({
  initialValues: {
    username: "",
    password: ""
  },
  validationSchema,
  // validateOnChange: false,
  // validateOnBlur: false,
  onSubmit: (data) => {
    console.log(data);
    handleLogin(data);
  },
});

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
  };
  

  return (
    <div className="col-md-12">
      <div className="card card-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username"> Username </label>
          <input
            name="username"
            type="text"
            className={
              'form-control' +
              (formik.errors.username && formik.touched.username
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <div className="invalid-feedback">
            {formik.errors.username && formik.touched.username
              ? formik.errors.username
              : null}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password </label>
          <input
            name="password"
            type="password"
            className={
              'form-control' +
              (formik.errors.password && formik.touched.password
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="invalid-feedback">
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : null}
          </div>
        </div>

        <div className="form-group mt-2">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {/*<button
            type="button"
            className="btn btn-warning float-right"
            onClick={formik.handleReset}
          >
            Reset
          </button>*/}
        </div>
      </form>
      <div className="forgot-password-link">
        <p onClick={() => navigate("/forgot-password")} className="link-secondary">Forgot Password?</p>
    </div>
    </div>
    </div>
  );
};

export default Login;