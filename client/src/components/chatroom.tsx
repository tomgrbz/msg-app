import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const ChatRoom = ({roomId}: { roomId: string}) => {
    const [rooms, setRooms] = useState<string[]>([])
    const [currentRoom, setCurrentRoom] = useState<string>('')

    const generateRooms: any = () => {
        if (rooms[0] === '') {
            setRooms(rooms.slice(1))

        } else {
            console.log(rooms);
            return rooms.map((v, i) => {
                return (
                    <div key={i}>
                        <Link to={`/chat/${v}`}>
                            <div>{`Room: ${v}`}</div>
                        </Link>
                    </div>)
            })
        }
    }
    useEffect(
        () => {
            setCurrentRoom(roomId);
            let roomList: string[] = [...rooms, roomId];
            setRooms(roomList);
        }
        , [roomId])

    return (
        <div>
            {generateRooms()}
        </div>
    )
}