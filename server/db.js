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

    // const sentMsg = await db.message.findFirst({
    //     where: {
    //         message: msg
    //     },
    //     include: {
    //         user: true
    //     }
    // })
    // console.dir(sentMsg, { depth: null })
    // const allMsgs = await db.user.findFirst({
    //     where: {
    //         socketId: socketId,
    //     },
    //     include: {
    //         messages: true,
    //     }
    // })
    // console.dir(allMsgs, {depth: null})
}

const retrieveMsgs = async (room) => {
    const msgs = await db.message.findMany({
        where: {
            room: room
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
// async function main() {
//     // await db.message.create({
//     //     data: {
//     //         message: 'eojtajtejoa',

//     //     }
//     // })
//     await db.user.create({
//         data: {
//             name: 'Thomas',
//             socketId: '2352352389523',
//             messages: {
//                 create: {
//                     message: "Hello how are you?",

//                     }
//             },
//             rooms: {
//                 create: {
//                     name: 'Room 1'
//                 }
//             },

//             },
//         },
//     )

//     const allUsers = await db.user.findMany({
//         include: {
//             messages: true,
//             rooms: true,
//         }
//     })
//     console.dir(allUsers, { depth: null })
// }

// main()
//     .then(async () => {
//         await db.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await db.$disconnect()
//         process.exit(1)
//     })

