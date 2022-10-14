import {useState} from "react";
import {Button, Modal} from "react-daisyui";
import {Link} from "react-router-dom";
import {Socket} from "socket.io-client";

export const RoomModal = ({socket, user, rooms}: { socket: Socket, user: string, rooms: string[] }) => {
    const [newRoom, setNewRoom] = useState("")

    const joinRoom = async () => {
        console.log(newRoom)
        await socket.emit("join room", {room: newRoom, userName: user})
    }

    return (
        <div className="font-sans mt-[200px] mx-10">
            {rooms.filter((v, i, a) => a.indexOf(v) === i).map((v, i) => {
                return (<Link
                    to={`/chat/${v}/${user}`}
                              key={i}>
                    <p>Change to room: {v}</p>
                </Link>)
            })}
            <p>Please Enter the new room you'd like to join!</p>
            <input type="text" autoComplete="off" placeholder="Room" onChange={e => {
                setNewRoom(e.target.value)

            }}/>
            <Link to={`/chat/${newRoom}/${user}`} key={newRoom}>
                <Button onClick={joinRoom}>
                    Join
                </Button>
            </Link>

        </div>
    )
}