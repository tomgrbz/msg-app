import {ChatForm} from "./chatform";
import {Login} from './login'
import React from "react";
import {io, Socket} from "socket.io-client";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const socket:Socket = io('http://localhost:3001')

export const MainRouter = () => {
    return (

        <Routes>
            <Route path='/' element={<Login socket={socket}/>}/>
            <Route path="/chat/:roomId" element={<ChatForm socket={socket}/>}> </Route>
        </Routes>

    )
}