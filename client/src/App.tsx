import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {io, Socket} from "socket.io-client";
import {Header} from "./components/header";
import {MainRouter} from "./components/mainRouter";
import {ChatForm} from "./components/chatform";

const socket:Socket = io('http://localhost:3001')
function App() {

    return (
        <div>
            {/*<ChatForm/>*/}
            {/*<MainRouter/>*/}
        </div>
    );
}

export default App;

