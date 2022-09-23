import './chatform.css'
import {useEffect, useState} from "react";
import {Socket} from "socket.io-client";
import {useParams} from "react-router-dom";
import {ChatRoom} from "./chatroom";
import {RoomModal} from "./roommodal";


export const ChatForm = ({socket}: { socket: Socket }) => {
    const [room, setRoom] = useState<string>("")
    const [fieldState, setFieldState] = useState<string>("")
    const [messageReceived, setMessageReceived] = useState<string>("")
    const [listOfMsg, setListOfMsg] = useState<string[]>([])
    const [newRoomFlag, setNewRoomFlag] = useState(false)

    const displayMessages: any = listOfMsg.map((v, i) => {
        return (<div key={i}>{v}</div>)
    })
    const {roomId}: any = useParams()


    useEffect(() => {
        socket.on('received message', (msg: string) => {
            setMessageReceived(msg)
            let newMessages: string[] = [
                ...listOfMsg, msg
            ]
            setListOfMsg(newMessages)
            console.log(msg)
            console.log(listOfMsg)


        })


    }, [displayMessages])
    useEffect(() => {
        setRoom(roomId)
        setNewRoomFlag(!newRoomFlag)
        setListOfMsg([])
        const joinNewRoom = async () => {
            await socket.emit("join room", roomId)
        }
        joinNewRoom().then(r => console.log('Joined new Room!'))
    }, [roomId])

    const sendMessage = async () => {

        if (fieldState !== '') {
            await socket.emit("chat message", {msg: fieldState, id: room});
        }
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
                        <ul>
                            {displayMessages}
                        </ul>
                    </div>
                    <input type="text" placeholder="Type here"
                           className="input input-bordered input-accent w-full max-w-xs"
                           value={fieldState} autoComplete="off" autoFocus={true}
                           onChange={(event) => {
                               setFieldState(event.target.value);
                               event.target.value = '';
                           }}/>

                    <button className='btn btn-accent' onClick={sendMessage}>Send</button>
                </form>


            </div>


        </div>


    )
}