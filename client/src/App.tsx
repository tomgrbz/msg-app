import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {io, Socket} from "socket.io-client";
import {ChatForm} from "./components/chatform";

const socket:Socket = io('http://localhost:3001')

function App() {

  return (
    <div className="App">
      <ChatForm socket={socket}/>
    </div>
  );
}

export default App;

