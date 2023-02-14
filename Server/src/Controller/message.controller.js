const Message = require('../models/message.model');
const ChatGPTService = require('../services/chatgpt.service');
const mongoose = require('mongoose');

class MessageController {
    async showAll(req, res) {
        try {
            const conversationId = req.query.conversationId || null
            let messages
            if(conversationId){
                messages = await Message.aggregate([
                    {
                        $match: {
                            conversationId: mongoose.Types.ObjectId(conversationId)
                        }
                    }
                ])
            }else{
                messages = await Message.find({})
            }
            res.json({ success: true, messages})
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const message = await Message.findById(id)
            if (!message) return res.json({ success: false, messages: 'Invalid message' })
            res.json({ success: true, message })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async store(req, res) {
        try {
            const message = new Message(req.body)
            await message.save()
            res.json({ success: true, messages: "Send message successfully" })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async botReponse(req, res) {
        try {
            let responseMessage
            const { conversationId, text } = req.body;
            const messages = await Message.aggregate([
                {
                    $match: {
                        conversation: mongoose.Types.ObjectId(conversationId)
                    }
                }
            ])
            await ChatGPTService.generateCompletion(text, messages).then(async responseMsg => {
                responseMessage = responseMsg
                const messageBot = new Message({ conversationId, bot : true, text: responseMsg})
                await messageBot.save()
            });
            res.json({ success: true, messages: responseMessage })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const message = await Message.updateOne({ _id: id }, req.body, { new: true })
            if (!message) return res.json({ success: false, messages: 'Cant update message' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const message = await Message.deleteOne({ _id: id })
            if (!message) return res.status(401).json({ success: false, messages: 'Cant delete message' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new MessageController()