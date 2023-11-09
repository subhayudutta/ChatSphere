import React, { useState, useEffect } from "react";
import { Chat } from "./Chat.js";
import Cookies from "universal-cookie";
import "./chat.css";

const cookies = new Cookies();

function Home() {
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
        
        <h1 class="h3 mb-3 font-weight-normal">DuoTalk</h1>
        <p>Seamlessly converse with just two participants in an intimate, focused
          , and private conversation space. Simplify one-on-one discussions.</p>
          <p class="text-success">Room Name for Both participant must be same.</p>
      </div>

      <div class="form-label-group">
        <input type="text" id="inputname" class="form-control" placeholder="Your Name" onChange={(e) => setName(e.target.value)} required autofocus/>
        <label for="inputname">Your Name</label>
      </div>

      <div class="form-label-group">
        <input type="text" id="inputRoom" class="form-control" placeholder="Room Name" onChange={(e) => setRoom(e.target.value)} required/>
        <label for="inputRoom">Room Name</label>
      </div>

      <div class="form-label-group" style={{marginBottom:'0px'}}>
        <input type="file" accept="image/*" onChange={handleImageUpload} id="inputImage" class="form-control" style={{display: 'none'}}/>
        <div class="flex">
        <img style={{margin:'0px 15px'}} src={"https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
        <label for="inputImage">Click to Upload your Avatar</label>
        </div>
        <br/>
      </div>

      <button class="btn btn-lg btn-primary btn-block" type="submit" style={{width:'100%',marginTop:'0px'}} onClick={() => {
              setIsInChat(true);
            }}>Chat Now</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; Subhayu Dutta</p>
    </form>
    </div>
    ) : (
        <Chat room={room} name={name} imageURL={imageURL} setIsInChat={setIsInChat} />
      )}


      </>

  );
}

export default Home;