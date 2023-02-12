const mongoose = require("mongoose");
const { schema } = require("./user.model");
const Schema = mongoose.Schema;

const Conversation = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Conversation", Conversation);
