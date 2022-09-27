export const Message = ({userName, content}: { userName: string, content: string }) => {

    return (
        <div className="my-3 mx-2">
            <div className="outline rounded-lg">
                <div className="pl-3.5">
                    <p>
                        From: {userName}
                    </p>
                </div>
                <div className="pl-7">

                    <p>{content}</p>
                </div>
            </div>
        </div>
    )

}