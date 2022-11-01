const {PrismaClient} = require('@prisma/client')

const db = new PrismaClient()

const prismaJoin = async (room, userName, socketId) => {
    let userExists = await db.user.count({
        where: {
            socketId: socketId,
        },
    })
    if (userExists === 0) {
        await db.user.create({
            data: {
                name: userName,
                socketId: socketId,
                messages: {},
            }
        })
    }


    console.log(`${userName} joined ${room} with socId: ${socketId}`)

}

const addMsg = async (msg, socketId, roomId) => {
    console.log(roomId)
    const u = await db.user.update({
            where: {
                socketId: socketId
            },
            data: {
                messages: {
                    create: {
                        message: msg,
                        room: roomId,
                    },
                },
            },
        }
    )
}

const retrieveMsgs = async (room) => {
    const msgs = await db.message.findMany({
        where: {
            room: room
        },
        include: {
            user: true,
        },
    })
    console.dir(msgs, {depth: null})
    return msgs
}

module.exports = {
    retrieveMsgs,
    db,
    prismaJoin,
    addMsg,
}

