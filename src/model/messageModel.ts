import mongoose, { Schema } from "mongoose";

export interface IsMenssage {
    sender: string,
    recipient: string,
    message: string,
    createdAt: string | Date
}

export const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'O remetente é obrigatorio']
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'O destinatario é obrigatorio']
    },
    message: {
        type: String,
    },
    // createdAt: {
    //     type: Date,
    //     default: new Date()
    // },
},{ timestamps: true })

export const Message = mongoose.model('Message', messageSchema)