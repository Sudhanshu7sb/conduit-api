
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./User");

var commentSchema = new Schema(
    {
      body: String,
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  );

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;