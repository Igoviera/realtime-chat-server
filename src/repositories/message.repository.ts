import { IsMenssage, Message } from "../model/messageModel";
import {User} from "../model/user.model";

class MessageRepository{
    async createMessage(message: IsMenssage) {
        const createdMessage = await Message.create(message)

        await User.findByIdAndUpdate(
            message.sender,
            {$push: {messages: createdMessage._id}}
        )

        await User.findByIdAndUpdate(
            message.recipient,
            {$push: {messages: createdMessage._id}}
        )

        return createdMessage
    };

    async deleteMessage(){
        await Message.deleteMany() 
    }

    async findAllMessage(){
        return await Message.find()
    }
}
export default new MessageRepository();