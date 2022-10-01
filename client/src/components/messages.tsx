import {Message} from "./message";
import {Scroll} from "./scroll";


export const Messages = ({messages, user}: { messages: string[], user: string }) =>
    (
        <div>
            <div className='flex flex-col' >
                {messages.map((v, i) => <Message key={i}
                                                 userName={user} content={v}></Message>)}
            </div>
            <Scroll></Scroll>
        </div>
    )