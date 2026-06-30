
export default defineEventHandler(async()=>{
     const eventos = await prisma.evento.findMany({
        orderBy:{fecha:'desc'},

    include:{
        _count:{
            select:{
                inscrito:true
            }
        }
    }

    
})

return  eventos.map(evento=>({
        id: evento.id_evento,
        titulo: evento.titulo,
        fecha: evento.fecha,
        lugar:evento.lugar,
        valor:evento.valor,
        imagen:evento.imagen, 
        inscrito:evento._count?.inscrito
    }))

})