import React, { useState } from "react";

import "./css/App.css";

import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Start from "./pages/Start";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Detail from "./pages/Detail";

import Setting from "./pages/Settings/Setting";

import { Routes, Route } from "react-router-dom";

function App() {
  const [LoggedIn, setLoggedIn] = useState(false);

  const handleSignIn = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/SignIn" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/Detail" element={<Detail id={2} />} />
        <Route path="/Setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default App;
