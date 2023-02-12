const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "conversations",
        },
        text: {
            type: String,
        },
        bot: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("messages", Message);
