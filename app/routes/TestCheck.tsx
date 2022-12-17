import React from "react";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import * as Yup from "yup";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(1, "Username must be more then 1 characters")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(4, "Password must be more then 4 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });

  return (
    <main className="login">
      <div className="card">
        <div className="left">
          <h1>Groupomania</h1>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="err">{formik.errors.username}</div>
            ) : null}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="err">{formik.errors.password}</div>
            ) : (
              <div className="err">{error && error}</div>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Login;
