export const Message = ({userName, content}: { userName?: string, content: any }) => {

    return (
        <div className="my-3 mx-2">
            <div className="outline rounded-lg">
                <div className="pl-3.5">
                    <p>
                        From: {content.user}
                    </p>
                </div>
                <div className="pl-7">

                    <p>{content.message}</p>
                </div>
            </div>
        </div>
    )

}