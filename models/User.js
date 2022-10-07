const { Schema, model } = require("mongoose");

const validateEmail = (email) => {
  const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return regex.test(email);
};

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      // validate is used on creation
      validate: [validateEmail, "Please fill a valid email address"],
      //match is used to validate when save is used
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });

userSchema.path("email").set(function (email) {
  const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (regex.test(email)) {
    return email;
  } else {
    throw "Please fill a valid email address";
  }
});

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
