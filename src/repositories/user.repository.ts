import { IsUser, User } from '../model/user.model'

class UserRepository {
    async createUser(user: IsUser) {
        const userExist = await User.findOne({ email: user.email })

        if (userExist) {
            throw new Error('Email já cadastrado!')
        }

        user.status = false

        return await User.create(user)
    }

    async findAllUsers() {
        return await User.find().select('-password').populate('messages')
    }

    async userById(id: string) {
        return await User.findById(id).select('-password').populate('messages')
    }

    async userByEmail(email: string) {
        return await User.findOne({ email: email })
    }

    async userByCpf(cpf: string) {
        return await User.findOne({ cpf: cpf })
    }

    async updateUser(id: string, user: Partial<IsUser>) {
        return await User.updateOne({ _id: id }, { $set: user })
    }

    async deleteMessage(id: string) {
        const user = await User.findOne({ _id: id });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }
    
        const messageIds = user.messages.map(message => message._id);
    
        await User.deleteMany({ _id: { $in: messageIds } });
    
        user.messages = [];
    
        await user.save();
    
        return 'Mensagens excluídas com sucesso';
    }

    async deleteUser(id: string) {
        const user = await User.findOne({ _id: id })
        if (!user) {
            throw new Error('Usuário não encontrado')
        }
        return await User.deleteOne({ _id: id })
    }
}
export default new UserRepository()
