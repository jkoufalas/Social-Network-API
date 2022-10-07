const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

//formats the date for the query return
function formatThoughtDate(createdAt) {
  return (
    [
      createdAt.getDate(),
      createdAt.getMonth() + 1,
      createdAt.getFullYear(),
    ].join("/") +
    " " +
    [createdAt.getHours(), createdAt.getMinutes(), createdAt.getSeconds()].join(
      ":"
    )
  );
}

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatThoughtDate,
    },
    username: {
      type: String,
      required: true,
    },

    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

//making sure that the getters are being used in queries
thoughtSchema.set("toObject", { getters: true });
thoughtSchema.set("toJSON", { getters: true });

// Initialize our Video model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
