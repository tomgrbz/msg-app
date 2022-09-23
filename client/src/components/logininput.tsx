import React, {SetStateAction} from "react";

export const LoginInput = ({title, setRoom}: {title: string, setRoom?: any}) => {
    return (
        <div className="flex justify-center form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                   onChange={e => setRoom(e.target.value)}/>
            <label className="label">
            </label>
        </div>
    )
}