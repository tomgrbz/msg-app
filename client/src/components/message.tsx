export const Message = ({userName, content}: { userName?: string, content: any }) => {

    return (
        <div className="my-3 mx-2 max-w-[500px]">
            <div>
                {userName === content.user ?
                    <div className="flex items-center outline rounded-lg min-h-min break-all max-w-[250px] float-right">
                        <div className="flex-row-reverse mx-2">
                            <div>
                                <p className='flex-end text-right'>
                                    From: {content.user}
                                </p>
                            </div>
                            <div className="self-end mr-2 text-right">

                                <p>{content.message}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex items-center float-left outline rounded-lg min-h-min break-all max-w-[250px]">
                        <div className="outline rounded-lg">
                            <div className="pl-3.5">
                                <p>
                                    From: {content.user}
                                </p>
                            </div>
                            <div className="pl-7 min-h-min text-left ml-2">

                                <p>{content.message}</p>
                            </div>
                        </div>

                    </div>
                }

            </div>
        </div>
    )

}