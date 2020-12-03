const graphql = require('graphql')
const Post = require('../models/post')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = graphql
const PostType = require('./postType')

module.exports = RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        uid: { type: GraphQLID },
        categoryId: { type: GraphQLID },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        url: { type: GraphQLString },
        fav: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const post = new Post({
          uid: args.uid,
          categoryId: args.categoryId,
          title: args.title,
          text: args.text,
          url: args.url,
          fav: args.fav,
        })
        return post.save()
      },
    },
  },
})
