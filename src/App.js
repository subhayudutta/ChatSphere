import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Cookies from "universal-cookie";
import "./App.css";


const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const [imageURL, setImageURL] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setImageURL(imageSrc);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>


      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">ChatSphere</h1>
        <p class="lead">ChatSphere is a versatile messaging app that allows you
          to create chat rooms with multiple participants, making group conversations a breeze.</p>
      </div>

      <div class="row row-cols-1 row-cols-md-2 g-5 mx-5 px-5 pb-5 text-center">
        <div class="col">
          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Group Chat</h4>
            </div>
            <div class="card-body">
              <ul class="list-unstyled mt-3 mb-4">
                <li>Create and join chat rooms with friends or colleagues.
                  Collaborate, share, and chat with multiple participants in an organized way.</li>

              </ul>
              <button type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/mulhome" style={{ textDecoration: 'none' }}>Chat Now</Link></button>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Duo Chat</h4>
            </div>
            <div class="card-body">
              <ul class="list-unstyled mt-3 mb-4">
                <li>Ensure private and secure conversations by entering
                  a unique room name to chat with selected participants confidentially in
                  organized manner.</li>
              </ul>
              <button type="button" class="btn btn-lg btn-block btn-outline-primary"><Link to="/home" style={{ textDecoration: 'none' }}>Chat Now</Link></button>
            </div>
          </div>
        </div>

      </div>

      <div class="text-bg-light p-3 text-center text-warning">&copy; Designed by Subhayu Dutta</div>

    </>
  );
}

export default App;