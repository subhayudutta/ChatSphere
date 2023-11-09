import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "./chat.css";
import MultiChat from "./MultiChat.js";

const cookies = new Cookies();

function MultiHome() {
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

      {!isInChat ? (
        <div className="myhome">
          <form class="form-signin">
            <div class="text-center mb-4">

              <h1 class="h3 mb-3 font-weight-normal">GroupChat</h1>
              <p>Connect and chat with anyone, anywhere.
                Bring people together in one conversation.</p>
              <p class="text-danger">Disclaimer: Accessible to all, owners not liable for inappropriate messages, user discretion advised.</p>
            </div>

            <div class="form-label-group">
              <input type="text" id="inputname" class="form-control" placeholder="Your Name" onChange={(e) => setName(e.target.value)} required autofocus />
              <label for="inputname">Your Name</label>
            </div>

            <div class="form-label-group" style={{ marginBottom: '0px' }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} id="inputImage" class="form-control" style={{ display: 'none' }} />
              <div class="flex">
                <img style={{ margin: '0px 15px' }} src={"https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                <label for="inputImage">Click to Upload your Avatar</label>
              </div>
              <br />
            </div>

            <button class="btn btn-lg btn-primary btn-block" type="submit" style={{ width: '100%', marginTop: '0px' }} onClick={() => {
              setIsInChat(true);
            }}>Chat Now</button>
            <p class="mt-5 mb-3 text-muted text-center">&copy; Subhayu Dutta</p>
          </form>
        </div>
      ) : (
        <MultiChat room={"KSVUPYRGTH"} name={name} imageURL={imageURL} setIsInChat={setIsInChat} />
      )}

    </>
  );
}

export default MultiHome;