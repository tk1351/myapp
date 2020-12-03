const graphql = require('graphql')
const Post = require('../models/post')
const Category = require('../models/category')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = graphql
const PostType = require('./postType')
const CategoryType = require('./categoryType')

module.exports = RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    getPostsById: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id)
      },
    },
    getAllPosts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({})
      },
    },
    getPostsByUid: {
      type: PostType,
      args: { uid: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.uid)
      },
    },
    getAllCategories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({})
      },
    },
  }),
})
