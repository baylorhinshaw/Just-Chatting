const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {
      thoughtText: {
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
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
    }
  );
  

thoughtSchema
        .virtual("reactionCount")
        .get(function () {
            return this.reactions.length;
        });
  
const Thought = model("thought", thoughtSchema);
  
module.exports = Thought;