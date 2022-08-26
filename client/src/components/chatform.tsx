import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";



export const ChatForm = ({socket}:any) => {
    const [fieldState, setFieldState] = useState("")
    const [messageReceived, setMessageReceived] = useState("")
    useEffect(()=> {
        socket.on('received message', (msg:string) => {
            setMessageReceived(msg)
            console.log(msg)

        })


    }, [socket])
    const sendMessage = async () => {

        if (fieldState != '') {
            await socket.emit("chat message",  fieldState)
        }


    }
    return (
        <div>
        <form id="form" action="" onSubmit={e => {e.preventDefault(); console.log('prevented')}}>
            <input id="input" value={fieldState} autoComplete="off" onChange={(event) => {
                setFieldState(event.target.value)
            }}/>
            <button onClick={sendMessage}>Send</button>
        </form>
        <p>Message: {messageReceived}</p>
        </div>
    )
}