import {Link} from "react-router-dom";
import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";


export const Login = ({socket}: { socket: Socket }) => {
    const [room, setRoom] = useState('');
    const joinRoom = async () => {
        console.log(room)
        await socket.emit("join room", room)
    }
    return (
        <div>
            <form id="f" action="" onSubmit={e => {
                e.preventDefault()

            }
            }></form>
            <input type='text' placeholder="Username"/>
            <input type="text" autoComplete="off" placeholder="Room" onChange={e => {
                setRoom(e.target.value)


            }}/>
            <Link to={`/chat/${room}`} key={room}>
                <button onClick={joinRoom}>
                    Join
                </button>
            </Link>
        </div>
    )
}