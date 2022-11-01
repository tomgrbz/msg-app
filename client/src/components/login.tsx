import {Link} from "react-router-dom";
import {Socket} from "socket.io-client";
import {useState} from "react";
import {LoginInput} from "./logininput";


export const Login = ({socket}: { socket: Socket }) => {
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    const joinRoom = async () => {
        console.log(room)
        await socket.emit("join room", {room, userName})
    }
    return (
        <div className="flex justify-center w-full items-center mt-72">
            <div className="flex justify-center flex-col">
                <form onSubmit={e => e.preventDefault()}>
                <LoginInput title={'What is your name?'} setState={setUserName}></LoginInput>

                <LoginInput title={'What Room would you like to join?'} setState={setRoom}></LoginInput>
                <Link to={`/chat/${room}/${userName}`} key={room}>
                    <button className="btn btn-primary" onClick={joinRoom}>
                        Join
                    </button>
                </Link>
                </form>
            </div>
        </div>
    )
}