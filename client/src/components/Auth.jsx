import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import signinImage from "../images/lav_medium.jpg";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

export const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
    // console.log(form);
  };
  toast.configure();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // console.log(form);
      const { username, password, phoneNumber, avatarURL } = form;

      let isnum = /^\d+$/.test(phoneNumber);
      if (isSignup && (!isnum || phoneNumber.length !== 10)) {
        toast("Enter a valid phone number", { type: "error" });
      }

      if (isSignup && password.length < 6) {
        toast("Password is required and must be at least 7 characters", {
          type: "error",
        });
      }

      // toast("Failed! Payment is not completed", { type: "error" });

      const URL = "https://messagerbackend.herokuapp.com/auth";
      // const URL = "http://localhost:5000/auth";

      const {
        data: { token, userId, hashedPassword, fullName },
      } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
        username,
        password,
        fullName: form.fullName,
        phoneNumber,
        avatarURL,
      });

      cookies.set("token", token);
      cookies.set("username", username);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);

      if (isSignup) {
        cookies.set("phoneNumber", phoneNumber);
        cookies.set("avatarURL", avatarURL);
        cookies.set("hashedPassword", hashedPassword);
      }

      window.location.reload();
    } catch (err) {
      if(isSignup){
        toast("Username already exists", { type: "error" });
      }
      else{
      toast("Please enter correct password", { type: "error" });
      }
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="auth_form-container">
      <div className="auth_form-container_fields">
        <div className="auth_form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth_form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth_form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="auth_form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* {isSignup && (
              <div className="auth_form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )} */}

            <div className="auth_form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="auth_form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth_form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>

          <div className="auth_form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </p>

            <span onClick={switchMode}>{isSignup ? "Sign In" : "Sign Up"}</span>
          </div>
        </div>
      </div>

      <div className="auth_form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};
