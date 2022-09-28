import './chatform.css'
import React, {useEffect, useRef, useState} from "react";
import {Socket} from "socket.io-client";
import {useParams} from "react-router-dom";
import {ChatRoom} from "./chatroom";
import {RoomModal} from "./roommodal";
import {Message} from "./message";
import {list} from "postcss";

class ChatMessage {
    author: string | undefined;
    message: string;

    constructor(author: string, message: string) {
        this.author = author;
        this.message = message
    }
}

class Room {
    name: string | undefined;
    messages: ChatMessage[];

    constructor(name: string, messages: ChatMessage[]) {
        this.name = name;
        this.messages = messages
    }
}

export const ChatForm = ({socket}: { socket: Socket }) => {
    const [room, setRoom] = useState<string>("")
    const [fieldState, setFieldState] = useState<string>("")
    const [messageReceived, setMessageReceived] = useState<string>("")
    const [listOfMsg, setListOfMsg] = useState<ChatMessage[]>([])
    const [listOfRoom, setListOfRoom] = useState<Room[]>([])


    const inputRef = useRef(null) as any
    const {roomId, userName}: any = useParams()


    const displayMessages: JSX.Element[] =
        listOfMsg.map((v, i) => {
                return (
                    <Message key={i} userName={v.author} content={v.message}></Message>
                )
            })



    useEffect(() => {
            socket.on('received message', (msg: string, user: string, r: string) => {
                setMessageReceived(msg)
                console.log(r)
                let newAuthor = new ChatMessage(user, msg)
                setListOfMsg([...listOfMsg, newAuthor])
            })
        },
        [displayMessages])

    useEffect(() => {
        setRoom(roomId)
        setListOfMsg([])
        joinNewRoom().then(r => console.log('Joined new Room!'))
    }, [roomId])

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
        <div className="mockup-window border bg-[length:200px_100px]">
            <ChatRoom roomId={room}></ChatRoom>
            <RoomModal socket={socket}></RoomModal>
            <div className='flex justify-center content-center'>

                <form id="form" action="" onSubmit={e => {
                    e.preventDefault();


                }}>
                    <div>
                        <ul className="h-[300px] w-[500px] overflow-auto">
                            {displayMessages}
                        </ul>
                    </div>

                    <input type="text" placeholder="Type here"
                           className="input input-bordered input-accent w-full max-w-xs"
                           value={fieldState} autoComplete="off" autoFocus={true}
                           onChange={(event) => {
                               setFieldState(event.target.value);
                           }}
                           ref={inputRef}
                    />

                    <button className='btn btn-accent' onClick={sendMessage}>Send</button>
                </form>


            </div>


        </div>


    )
}