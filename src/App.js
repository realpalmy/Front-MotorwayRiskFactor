import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import Context from "./Context";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UpdateFactor from "./pages/UpdateFactor";
import { riskFactors } from "./data/riskFactors";

function App() {
  const [data, setData] = useState(riskFactors);
  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <Fragment>
      <Context.Provider value={{data, updateData}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/update" element={<UpdateFactor />} />
        </Routes>
      </Context.Provider>
    </Fragment>
  );
}

export default App;
