const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const prismaJoin = async(room, userName, socketId) => {
    await prisma.user.create({
        data: {
            name: userName,
            socketId: socketId,
            messages: {
                
            },
            rooms: {
                create: {
                    name: room
                }
            }
        }
    })
    console.log(`${userName} joined ${room} with socId: ${socketId}`)
    const allUsers = await prisma.user.findMany({
        include: {
            messages: true,
            rooms: true,
        }
    })
    console.dir(allUsers, { depth: null })
    
}

const addMsg = async (msg, socketId) => {

    const u = await prisma.user.update({
        where: {
            socketId: socketId
        },
        data: {
            messages: {
                create: {
                    message: msg
                }
            }
        }
    })
    // await prisma.message.create({
    //     data: {
    //         message: msg,
    //         user: {
    //             connect: [{socketId: socketId}]
    //         }, 
    //         userId: {
    //             connect: [{u}]
    //         },    
            
            
    //     }
    // })
    const sentMsg = await prisma.message.findFirst({
        where: {
            message: msg
        },
        include: {
            user: true
        }
    })
    console.dir(sentMsg, { depth: null })

    const allMsgs = await prisma.user.findFirst({
        where: {
            socketId: socketId,
        },
        include: {
            messages: true
        }
    })
    console.dir(allMsgs, {depth: null})
    
}

// async function main() {
//     // await prisma.message.create({
//     //     data: {
//     //         message: 'eojtajtejoa',

//     //     }
//     // })
//     await prisma.user.create({
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

//     const allUsers = await prisma.user.findMany({
//         include: {
//             messages: true,
//             rooms: true,
//         }
//     })
//     console.dir(allUsers, { depth: null })
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

module.exports = {
    prismaJoin,
    prisma,
    addMsg
}