import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useFormik } from "formik";
import * as Yup from 'yup';

import AuthService from "../services/auth.service";

const ResetPassword = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState('');

  useEffect(() => {
    const token = location.pathname.split('/')[2];
    setResetPasswordToken(token);
  }, [location]);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: (data) => {
      console.log(data);
      handleReset(data);
    },
  });

  const handleReset = (data) => {
    setLoading(true);

    AuthService.resetPassword(data.password, data.confirmPassword, resetPasswordToken).then(
      () => {
        navigate("/login");
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
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
      <form onSubmit={formik.handleSubmit}>
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

        <div className="form-group mt-2">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Submit</span>
                    </button>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default ResetPassword;


