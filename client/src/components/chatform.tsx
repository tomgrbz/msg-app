import './chatform.css'
import React, {useEffect, useRef, useState} from "react";
import {Socket} from "socket.io-client";
import {useParams} from "react-router-dom";
import {ChatRoom} from "./chatroom";
import {RoomModal} from "./roommodal";
import {Message} from "./message";
import {list} from "postcss";
import {Messages} from "./messages";
import {useFetch} from "../hooks/usefetch";

export const ChatForm = ({socket}: { socket: Socket }) => {
    const [user, setUser] = useState<string>("")
    const [room, setRoom] = useState<string>("")
    const [fieldState, setFieldState] = useState<string>("")
    const [messageReceived, setMessageReceived] = useState<string | undefined>(undefined)
    const [listOfMsg, setListOfMsg] = useState<any[]>([])
    const [rooms, setRooms] = useState<string[]>([])

    const inputRef = useRef(null) as any
    const {roomId, userName}: any = useParams()
    const {loading, data, error} = useFetch(`http://localhost:3001/rooms/${roomId}`)
    useEffect(() => {

            socket.on('received message', (msg: string, user: string, r: string) => {
                setMessageReceived(msg)
                setUser(user)
                console.log(r)
                setListOfMsg(listOfMsg => [...listOfMsg, {message: msg, user: user}])
            })
            return () => {
                socket.off('received message')
            }
        },
        [])
    useEffect(() => {
        setListOfMsg(data.map((v: string, i) => {
                return {message: data[i]['message'], user: data[i]['user']['name']}
            }
        ))
        console.log(data)
    }, [data])
    useEffect(() => {
        setRoom(roomId)
        setUser(userName)
        setRooms([...rooms, roomId])
        console.log('changed rooms to ' + roomId)
        console.log(error)
    }, [roomId, userName])

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
            <RoomModal socket={socket} user={userName} rooms={rooms}></RoomModal>
            <div className='flex justify-center content-center'>

                <form id="form" action="" onSubmit={e => {
                    e.preventDefault();

                }}>
                    <div className="outline max-w-2xl w-">
                        {loading ? <p>loading msgs</p> :
                            <ul className="h-[300px] w-[500px] overflow-auto list-none">
                                <Messages messages={listOfMsg} user={userName}></Messages>
                            </ul>
                        }
                    </div>
                    <div className="max-w-2xl mt-3">
                        <span>
                        <input type="text" placeholder="Type here"
                               className="input input-bordered input-accent w-96 max-w-md"
                               value={fieldState} autoComplete="off" autoFocus={true}
                               onChange={(event) => {
                                   setFieldState(event.target.value);
                               }}
                               ref={inputRef}
                        />

                        <button className='btn btn-accent mt-3.5 ml-3' onClick={sendMessage}>Send</button>
                            </span>
                    </div>
                </form>


            </div>


        </div>


    )
}