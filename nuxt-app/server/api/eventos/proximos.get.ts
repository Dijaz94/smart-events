export default defineEventHandler(async()=>{

    const ahora = new Date()
    return await prisma.evento.findMany({
        where: {
            fecha:{
                gte:ahora
            }
        },
        take:3,
        orderBy:{fecha:'desc'},
        
    })
})