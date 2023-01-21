import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const forgotPassword = (email) => {
  return axios
    .post(API_URL + "forgot-password", {
      email
    })
    .then((response) => {
      return response.data;
    });
};

const resetPassword = (password, confirmPassword,resetPasswordToken) => {
  return axios
    .post(API_URL + "reset-password", {
      password,
      confirmPassword,
      resetPasswordToken
    })
    .then((response) => {
      return response.data;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getCurrentUser,
};

export default AuthService;