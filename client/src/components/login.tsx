import {Link} from "react-router-dom";
import {Socket} from "socket.io-client";
import {useState} from "react";
import {LoginInput} from "./logininput";


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
            <LoginInput title={'What is your name?'}></LoginInput>
            <LoginInput title={'What Room would you like to join?'} setRoom={setRoom}></LoginInput>
            <Link to={`/chat/${room}`} key={room}>
                <button onClick={joinRoom}>
                    Join
                </button>
            </Link>
        </div>
    )
}