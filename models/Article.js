var mongoose = require("mongoose");
var slug = require("slug");

var User = require("./User");
var Schema = mongoose.Schema;

var articleSchema = new Schema(
    {
      slug: String,
      title: {
        type: String,
        required: true,
      },
      description: String,
      body: String,
      tags: [String],
      favorited: [String],
      favoritesCount: {
        type: Number,
        default: 0,
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    },
    { timestamps: true }
  );



  articleSchema.pre("save", async function (next) {
    try {
      if (this.title) {
        this.slug = slug(this.title, { lower: true }) + Date.now();
      }
    } catch (error) {
      res.json({ error: "Something went wrong" });
    }
  });

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;