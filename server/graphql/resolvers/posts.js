const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        return await Post.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Cannot fetch getPosts", error);
      }
    },

    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        throw new Error("Post not found");
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createPost: async (_, args, context) => {
      console.log(args, "BODY");
      const { body } = args;
      console.log("mutating...");
      console.log(body);
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError(
            "Authentication Error! Action is not allowed."
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
