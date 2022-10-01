import {useEffect, useState} from "react";
import {Button, Modal} from "react-daisyui";
import {Link} from "react-router-dom";
import {Socket} from "socket.io-client";

export const RoomModal = ({socket, user}: {socket: Socket, user: string}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [newRoom, setNewRoom] = useState("")

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const joinRoom = async () => {
        console.log(newRoom)
        await socket.emit("join room", newRoom)
    }

    return (
        <div className="font-sans mt-[200px] mx-10">
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