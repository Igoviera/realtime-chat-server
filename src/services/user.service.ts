import { User, IsUser } from '../model/user.model'
import userRepository from '../repositories/user.repository'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const secretJWT = process.env.JWT_SECRET_KEY || ''

class UserServices {
    async createUser(user: IsUser) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
        }
        return userRepository.createUser(user)
    }

    async auth(cpf: string, password: string) {
        const user = await userRepository.userByCpf(cpf)

        if (!user) throw new Error('CPF ou senha inválido')
        
        if (user.password && typeof user.password === 'string') {
            const result = await bcrypt.compare(password, user.password)

            if (result) {
                const tokenPayload = {
                    _id: user._id,
                    name: user.name
                }

                const token = Jwt.sign(tokenPayload, secretJWT, {
                    expiresIn: '24h'
                })

                // Retornar o token JWT junto com os dados do usuário
                return {
                    token,
                    user: tokenPayload
                }
            }


        }

        throw new Error('Email ou senha inválido')
    }

    async findAllUsers() {
        return await userRepository.findAllUsers()
    }

    async userById(id: string) {
        const userId = await userRepository.userById(id)

        if (!userId) {
            throw new Error('Usuário não encontrado')
        }
        return userId
    }

    async userByCpf(cpf: string) {
        const userCpf = await userRepository.userByCpf(cpf)

        if (!userCpf) {
            throw new Error('Usuário não encontrado')
        }
        return userCpf
    }

    async updateUser(id: string, user: Partial<IsUser>) {
        const userId = await userRepository.userById(id)

        if (!userId) {
            throw new Error('Usuário não encontrado')
        }
        return await userRepository.updateUser(id, user)
    }
    
    async deleteMessage(id: string){
        const userMessage = await userRepository.deleteMessage(id)
        if(!userMessage){
            throw new Error('Menssagens não encontradas')
        }

        return 'Menssagens excluidas com sucesso'
    }

    async deleteUser(id: string) {
        const user = await userRepository.deleteUser(id)
        if (!user) {
            throw new Error('Usuário não encontrado')
        }
        return 'Usuário excluido com sucesso'
    }
}

export default new UserServices()
