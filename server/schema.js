import { gql } from 'apollo-server';

//This file defines the data types, kind of similar to Django's model?

const typeDefs = gql`
    type Post {
        id: Int!
        title: String!
        text: String
    }

    type PostResponse {
        success: Boolean!
        post: Post
    }

    input PostInput {
        Text: String
    }

    type Mutation {
        createPost(title: String!, text: String): PostResponse
        modifyById(id: Int!, title: String, text: String): PostResponse
        deletePostById(id: Int!): PostResponse
    }

    type Query {
        getAllPosts: [Post]!
        getPostById(id: Int!): Post
        getPostsByTitle(title: String!): [Post]!
    }
`;

export { typeDefs };