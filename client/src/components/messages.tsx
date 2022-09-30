import {Message} from "./message";



export const Messages = ({messages, user}: {messages:string[], user: string}) =>
    (<div>
        {messages.map((v, i)=> <Message key={i}
                                        userName={user} content={v}></Message>)}
    </div>
    )