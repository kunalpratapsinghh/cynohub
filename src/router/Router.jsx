import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../component/Home";
import Login from "../component/Login";
import Modal from "../component/Modal";
import SignUp from "../component/SignUp";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/edit/:id" element={<Modal/>}/>
    </Routes>
  );
};

export default Routers;
