import { IsMenssage } from "../model/messageModel"; 
import messageRepository from "../repositories/message.repository"; 

class MessageServices {
  async createUser(message: IsMenssage) {
    return messageRepository.createMessage(message);
  };

  async findAllMessage(){
    return messageRepository.findAllMessage()
  }
}

export default new MessageServices();
