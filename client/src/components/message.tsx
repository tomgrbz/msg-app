export const Message = ({userName, content}: { userName?: string, content: any }) => {

    return (
        <div className="my-3 mx-3 flex-wrap">
            <div>
                {userName === content.user ?
                    <div className="flex items-center outline rounded-lg min-h-min break-all max-w-[400px] float-right">
                        <div className="flex-row-reverse mx-2">
                            <div className='flex-end px-2 mr-2 text-right'>
                                <p>
                                    From: {content.user}
                                </p>
                            </div>
                            <div className="self-start pl-3.5 mr-2 text-left">

                                <p>{content.message}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex items-center float-left outline rounded-lg min-h-min break-all max-w-[400px]">
                        <div className="outline rounded-lg">
                            <div className="px-2 mr-2">
                                <p>
                                    From: {content.user}
                                </p>
                            </div>
                            <div className="pl-3.5 min-h-min text-left mr-2 self-start">

                                <p>{content.message}</p>
                            </div>
                        </div>

                    </div>
                }

            </div>
        </div>
    )

}