import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useFormik } from "formik";
import * as Yup from 'yup';
import AuthService from "../services/auth.service";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = (data) => {
    setMessage("");
    setLoading(true);
    AuthService.register(data.username, data.email, data.password).then(
      (response) => {
        setMessage(response.data.message);
        setLoading(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setLoading(false);
      }
    );
    
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });
  
  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: (data) => {
      console.log(JSON.stringify(data, null, 2));
      handleRegister(data);
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
            <label>Full Name</label>
            <input
              name="fullname"
              type="text"
              className={
                'form-control' +
                (formik.errors.fullname && formik.touched.fullname
                  ? ' is-invalid'
                  : '')
              }
              onChange={formik.handleChange}
              value={formik.values.fullname}
            />
            <div className="invalid-feedback">
              {formik.errors.fullname && formik.touched.fullname
                ? formik.errors.fullname
                : null}
            </div>
          </div>
  
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
            <label htmlFor="email"> Email </label>
            <input
              name="email"
              type="email"
              className={
                'form-control' +
                (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
              }
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="invalid-feedback">
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
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
  
          <div className="form-group">
            <label htmlFor="confirmPassword"> Confirm Password </label>
            <input
              name="confirmPassword"
              type="password"
              className={
                'form-control' +
                (formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? ' is-invalid'
                  : '')
              }
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <div className="invalid-feedback">
              {formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : null}
            </div>
          </div>
  
          <div className="form-group form-check">
            <input
              name="acceptTerms"
              type="checkbox"
              className={
                'form-check-input' +
                (formik.errors.acceptTerms && formik.touched.acceptTerms
                  ? ' is-invalid'
                  : '')
              }
              onChange={formik.handleChange}
              value={formik.values.acceptTerms}
            />
            <label htmlFor="acceptTerms" className="form-check-label">
              I have read and agree to the Terms
            </label>
            <div className="invalid-feedback">
              {formik.errors.acceptTerms && formik.touched.acceptTerms
                ? formik.errors.acceptTerms
                : null}
            </div>
          </div>
  
          <div className="form-group mt-2">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              className="btn btn-warning float-end"
              onClick={formik.handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      </div>
    );
};

export default Register;