const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = graphql

module.exports = PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    uid: { type: GraphQLID },
    categoryId: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    image: { type: GraphQLString },
    url: { type: GraphQLString },
    fav: { type: GraphQLInt },
  }),
})
