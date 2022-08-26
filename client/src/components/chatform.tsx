import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";



export const ChatForm = ({socket}:any) => {
    const [fieldState, setFieldState] = useState<string>("")
    const [messageReceived, setMessageReceived] = useState<string>("")
    const [listOfMsg, setListOfMsg] = useState<string[]>([])
    const displayMsgs: any = listOfMsg.map((v, i) => {
        return (<li key={i}>{v}</li>)
    })
    useEffect(()=> {
        socket.on('received message', (msg:string) => {
            setMessageReceived(msg)
            let newMsgs: string[] = [
                ...listOfMsg, msg
            ]
            setListOfMsg(newMsgs)
            console.log(msg)
            console.log(listOfMsg)

        })


    }, [socket, displayMsgs])

    const sendMessage = async () => {

        if (fieldState != '') {
            await socket.emit("chat message",  fieldState)
        }


    }
    return (
        <div>
            <form id="form" action="" onSubmit={e => {e.preventDefault(); console.log('prevented')}}>
            <input id="input" value={fieldState} autoComplete="off" autoFocus={true} onChange={(event) => {
                setFieldState(event.target.value);
                event.target.value = ''
            }}/>
            <button onClick={sendMessage}>Send</button>
            </form>
            <p>Message: {messageReceived}</p>
            <div>
                <ul>
                    {displayMsgs}
                </ul>
            </div>
        </div>
    )
}