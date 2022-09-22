import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {RoomModal} from "./roommodal";


export const ChatRoom = ({roomId}: {roomId: string}) => {
    const [rooms, setRooms] = useState<string[]>([])
    const [currentRoom, setCurrentRoom] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const generateRooms: any = () => {
        return rooms.map((v, i) => {
            return (
                <div key={i}>
                    <Link to={`/chat/${v}`}>
                        <div>{`Room: ${v}`}</div>
                    </Link>
                </div>)
        })
    }
    useEffect(
        () => {
            setCurrentRoom(roomId);
            let roomList: string[] = [...rooms, roomId];
            setRooms(roomList);
        }
        , [roomId])

    useEffect(()=> {}, [showModal])
    return (
        <div>
                {generateRooms()}
        </div>
    )
}