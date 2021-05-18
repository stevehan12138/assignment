//This file defines how quries and mutations are resolved(how it's finding the data)

export default {
    Query: {
        getAllPosts: (_, __, { dataSources }) => 
            dataSources.postAPI.getAllPosts(),
        getPostById: (_, { id }, { dataSources }) =>
            dataSources.postAPI.findPost({id: id}),
        getPostsByTitle: (_, { title }, { dataSources }) =>
            dataSources.postAPI.searchByTitle({ title }),

    },
    Mutation: {
        createPost: async (_, { title, text }, { dataSources }) => {
            const post = await dataSources.postAPI.createPost({ title, text });
            return {
                success: true,
                post: post,
            }
        },
        deletePostById: async (_, { id }, { dataSources }) => {
            return {
                success: await dataSources.postAPI.deletePost({ id }),
            }
        },
        modifyById: async (_, { id, title, text }, { dataSources }) => {
            const status = await dataSources.postAPI.modifyById({ id: id, title: title, text:text });
            return {
                success: status,
                post: await dataSources.postAPI.findPost({ id }),
            }
        }
    }
}