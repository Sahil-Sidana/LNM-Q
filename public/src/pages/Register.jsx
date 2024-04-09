import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";

const im = require("../assets/im.jpg");

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate("/posts");
    }
  }, []);

  const handleValidation = (event) => {
    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      alert("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      alert("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 5) {
      alert("Password should be equal or greater than 5 characters.");
      return false;
    } else if (email === "") {
      alert("Email is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation(event)) {
      const username = event.target.elements.username.value;
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const confirmPassword = event.target.elements.confirmPassword.value;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("USER", JSON.stringify(data.user));
        navigate("/posts");
      }
    }
    // console.log("Form Submitted register");
  };

  return (
    <>
      {/* <div className="FormContainer">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <div className="heading">
              <h1>LNM Q</h1>
          </div>
            <h2>REGISTER</h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
        </div> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className=" max-w-md mx-auto bg-[#F8E7D5] rounded-xl shadow-xl border border-gray-300 overflow-hidden md:max-w-2xl">
          <div className="md:grid md:grid-cols-2">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full "
                src={im}
                alt="Modern building architecture"
              />
            </div>
            <div className="p-8">
              <div className="p-8">
                <h2 className="font-dongpora text-6xl text-[#F1853B]">
                  Sign Up
                </h2>
                <p className="text-lg py-1 text-gray-500">Welcome to LNM-Q</p>
                <form
                  className="space-y-5 mt-5"
                  action=""
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Username"
                    name="username"
                    min="3"
                  />
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Email"
                    name="email"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Password"
                    name="password"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                  <button
                    className="w-full p-3 bg-[#1E75D5] text-white rounded-md"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-2">
                  Existing user ?{" "}
                  <span className="text-[#1E75D5] cursor-pointer">
                    <Link to="/login">Login.</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
