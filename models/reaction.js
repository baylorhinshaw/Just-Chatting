const { Schema, Types} = require("mongoose");

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: date => {
          const year = date.getFullYear();
          const month = date.getMonth()+1;
          const day = date.getDate();
          return `${year}-${month}-${day}`
      }
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  
  module.exports = reactionSchema;