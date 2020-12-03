const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = graphql

module.exports = CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    name: { type: GraphQLString },
  }),
})
