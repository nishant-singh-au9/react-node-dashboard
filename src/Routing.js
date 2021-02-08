import React from "react";
import Home from "./home/home";
import Admin from "./home/admin";
import Navbar from "./layout/navbar";
import { BrowserRouter, Route } from "react-router-dom";

const Routing = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/adduser" component={Admin} />
      </div>
    </BrowserRouter>
  );
};

export default Routing;
