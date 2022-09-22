import {useEffect, useState} from "react";
import {Button, Modal} from "react-daisyui";
import {Link} from "react-router-dom";
import {Socket} from "socket.io-client";

export const RoomModal = ({socket}: {socket: Socket}) => {
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
        <div className="font-sans">
            <Button onClick={toggleVisible}>Open Modal</Button>
            <Modal open={visible} onClickBackdrop={toggleVisible}>
                <Modal.Header className="font-bold">
                    Congratulations random Interner user!
                </Modal.Header>

                <Modal.Body>
                    <p>Please Enter the new room you'd like to join!</p>
                    <input type="text" autoComplete="off" placeholder="Room" onChange={e => {
                        setNewRoom(e.target.value)

                    }}/>
                    <Link to={`/chat/${newRoom}`} key={newRoom}>
                        <button onClick={joinRoom}>
                            Join
                        </button>
                    </Link>
                </Modal.Body>
            </Modal>
        </div>
    )
}