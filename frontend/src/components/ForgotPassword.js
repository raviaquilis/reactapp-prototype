import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useFormik } from "formik";
import * as Yup from 'yup';

import AuthService from "../services/auth.service";

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address")
  });

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema,
    onSubmit: async (data) => {
      try {
        const response = AuthService.forgotPassword(data.email).then(
          () => {
            navigate("/login");
            //window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            ///setLoading(false);
            setMessage(resMessage);
          })
      } catch (err) {
        setMessage(err.message);
      }
    },
  });

  return (
    <div className="col-md-12">
    <div className="card card-container">
    <form onSubmit={formik.handleSubmit}>
      <h1>Forgot Password</h1>
      <div className="form-group">
        <label htmlFor="email"> Email </label>
        <input
          name="email"
          type="email"
          className={
            'form-control' +
            (formik.errors.email && formik.touched.email
              ? ' is-invalid'
              : '')
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <div className="invalid-feedback">
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : null}
        </div>
      </div>

      <button className="btn btn-primary mt-2" disabled={formik.isSubmitting || !formik.isValid}>
        Submit
      </button>
      {message && <p>{message}</p>}
    </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
