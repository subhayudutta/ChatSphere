import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import { Chat } from './components/Chat';
import MultiHome from './components/MultiHome';

const routing = (
  
    <Router>
    <Routes>
    <Route exact path="/" element={<App />}></Route>
    <Route path="/home" element={<Home />} />
    <Route path="/mulhome" element={<MultiHome />} />
    </Routes>
    </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(routing,document.getElementById("root"));
