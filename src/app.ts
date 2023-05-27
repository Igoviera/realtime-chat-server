import express from 'express'
import http from 'http'
import cors from 'cors'
import routes from './routes'
import connection from './config/database'
import { Server } from 'socket.io'
import { Message } from './model/messageModel'
import { User } from './model/user.model'

const app = express()

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

app.use(cors())
app.use(express.json())

app.use(routes)

const port = 5000

io.on('connection', (socket) => {
    console.log('Novo cliente conectado!', socket.id)

    socket.on('username', (username) => {
        socket.data.username = username
        console.log(socket.data.username)
    })

    // Lógica do chat e eventos do Socket.IO
    socket.on('message', async (message) => {
        // console.log('Mensagem recebida:', message)

        // Lógica de processamento da mensagem e envio para outros clientes
        // ...
        const newMessage = new Message({
            sender: message.sender,
            recipient: message.recipient,
            message: message.message
        })

        try {
            const savedMessage = await newMessage.save()
            await User.findByIdAndUpdate(newMessage.sender, { $push: { messages: savedMessage._id } })
            await User.findByIdAndUpdate(newMessage.recipient, { $push: { messages: savedMessage._id } })
            // console.log('Mensagem salva:', savedMessage)

            io.emit('message', message)
        } catch (error) {
            console.error('Erro ao salvar a mensagem:', error)
        }

        // Exemplo de envio da mensagem de volta para o remetente
    })

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
        // await User.findByIdAndUpdate(userId, {status: true})
    })
})

connection
    .then(() => {
        console.log(' Banco de dados conectado!')
        httpServer.listen(port, () => {
            console.log(`🚀 Aplicação online na porta ${port}`)
        })
    })
    .catch((err) => console.log(err))
