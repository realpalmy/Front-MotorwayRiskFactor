import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Context from "./Context";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UpdateFactor from "./pages/UpdateFactor";

function App() {

  const path = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const updateData = (newData) => {
    setData(newData);
  };

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const riskFactorsData = await axios.get(path);
      //const data = JSON.parse(riskFactorsData.data);
      const data = riskFactorsData.data;
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Context.Provider value={{ data, updateData }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/update" element={<UpdateFactor />} />
          <Route path="*" element={<Search />}/>
        </Routes>
      </Context.Provider>
    </Fragment>
  );
}

export default App;
