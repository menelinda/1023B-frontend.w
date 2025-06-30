import mysql from 'mysql2/promise'
import fastify from 'fastify'
import cors from '@fastify/cors'

const produtos = fastify()
produtos.register(cors)

produtos.get("/produtos", async (_request, reply) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'shopee',
            port: 8000
        })
        const [dados] = await conn.query('SELECT * FROM Produtos')
        await conn.end()
        reply.status(200).send(dados)
    } catch (erro: any) {
        console.log(erro)
        reply.status(500).send({ mensagem: "Erro ao encontrar produtos" })
    }
})

produtos.listen({ port: 8000 }, (err) => {
    if (err) {
        console.error(err)
    }
    console.log("iniciei")
})
