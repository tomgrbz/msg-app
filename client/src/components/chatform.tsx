import './chatform.css'
import React, {useEffect, useRef, useState} from "react";
import {Socket} from "socket.io-client";
import {useParams} from "react-router-dom";
import {ChatRoom} from "./chatroom";
import {RoomModal} from "./roommodal";
import {Message} from "./message";
import {list} from "postcss";
import {Messages} from "./messages";

export const ChatForm = ({socket}: { socket: Socket }) => {
    const [user, setUser] = useState<string>("")
    const [room, setRoom] = useState<string>("")
    const [fieldState, setFieldState] = useState<string>("")
    const [messageReceived, setMessageReceived] = useState<string>("")
    const [listOfMsg, setListOfMsg] = useState<any[]>([])

    const inputRef = useRef(null) as any
    const formRef = useRef(null) as any
    const {roomId, userName}: any = useParams()

    useEffect(() => {
            socket.on('received message', (msg: string, user: string, r: string) => {
                setMessageReceived(msg)
                setUser(user)
                console.log(r)
                console.log(socket)
                setListOfMsg(listOfMsg=>[...listOfMsg, {message:msg, user: user}])
            })
        },
        [])

    useEffect(() => {
        setRoom(roomId)
        setUser(userName)
        console.log('changed rooms')
        setListOfMsg([])
        joinNewRoom().then(r => console.log('Joined new Room!'))
    }, [roomId, userName])

    const joinNewRoom = async () => {
        await socket.emit("join room", roomId)
    }
    const sendMessage = async () => {
        if (fieldState !== '') {
            await socket.emit("chat message", {msg: fieldState, id: room, user: userName});
        }
        setFieldState("")
        autoFocus()

    }
    const autoFocus = () => {
        inputRef.current.focus()
    }
    return (
        <div className="">
            {/*<ChatRoom roomId={room}></ChatRoom>*/}
            <RoomModal socket={socket} user={userName}></RoomModal>
            <div className='flex justify-center content-center'>

                <form id="form" action="" onSubmit={e => {
                    e.preventDefault();


                }}
                >
                    <div className="outline max-w-2xl">
                        <ul className="h-[300px] w-[500px] overflow-auto list-none">
                            <Messages messages={listOfMsg} user={userName}></Messages>
                        </ul>
                    </div>

                    <input type="text" placeholder="Type here"
                           className="input input-bordered input-accent w-full max-w-md"
                           value={fieldState} autoComplete="off" autoFocus={true}
                           onChange={(event) => {
                               setFieldState(event.target.value);
                           }}
                           ref={inputRef}
                    />

                    <button className='btn btn-accent mt-3.5' onClick={sendMessage}>Send</button>
                </form>


            </div>


        </div>


    )
}