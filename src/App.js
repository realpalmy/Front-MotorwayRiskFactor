import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { Fragment, useState, useEffect } from 'react';
import Home from './pages/Home';
import Search from './pages/Search';
import UpdateFactor from './pages/UpdateFactor';



function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/update" element={<UpdateFactor />} />
      </Routes>
    </Fragment >
  );
}

export default App;
