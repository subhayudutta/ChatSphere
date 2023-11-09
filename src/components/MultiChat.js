import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { formatDistanceToNow } from 'date-fns';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  getDocs
} from "firebase/firestore";

import "../App.css";

export const MultiChat = ({ room, name, imageURL, setIsInChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  const handleBackClick = () => {
    setIsInChat(false);
  };

  const handleSignOutClick = async () => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room)
    );

    const snapshot = await getDocs(queryMessages);

    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setIsInChat(false);
  };

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => {
      unsuscribe();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: name,
      imageURL,
      room,
    });

    setNewMessage("");
  };


  return (
    <div className="chat-app" style={{ padding: '15px 40px 120px 40px' }}>
      <div className="header">
        <h1 class="text-center pb-3 text-info">Welcome to Group chat</h1>
      </div>
      <div class="bg-success-subtle p-4" className="chat-messages scrollable-container" style={{ display: 'flex flex-col gap-5', overflow: 'auto' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.user === name ? 'flex-end' : 'flex-start',
            }}
          >

            <div class="position-relative">
              <div class="chat-message-left pb-4">
                <div>
                  <img src={message.imageURL ? message.imageURL : "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                  {message.createdAt && (
                    <div class="text-muted small text-nowrap mt-2">{formatDistanceToNow(message.createdAt.toDate(), { addSuffix: true })}</div>
                  )}
                </div>
                <div class="sbdutt flex-shrink-1 rounded py-2 px-3 ml-3" style={{
                  marginLeft: '10px',
                  color: message.user === name ? '#05386B' : '#112D32',
                  backgroundColor: message.user === name ? '#8EE4AF' : '#E3AFBC',
                }}>
                  <div class="font-weight-bold mb-1" style={{ fontWeight: 'bolder' }}>{message.user}</div>
                  <div>{message.text}</div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>



      <div className="input-fix bg-light">
        <form onSubmit={handleSubmit} className="new-message-form">
          <div class="flex-grow-0 py-3 px-4 border-top">

            <div class="input-group">

              <input type="text"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)} class="form-control" placeholder="Type your message" />
              <button type="submit" class="btn btn-success">Send</button>
            </div>
          </div>

        </form>

        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
          <button class="btn btn-outline-warning" type="submit" onClick={handleBackClick}>Leave the chat</button>

        </div>

      </div>

    </div>
  );
};

export default MultiChat;