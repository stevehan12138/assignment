import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema.js';
import { PostAPI, generateData } from './data/post.js';
import resolvers from './resolvers.js';

const data = generateData();

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        postAPI: new PostAPI({ data }),
    }),
    //debug mode?
    introspection: true,
})

data.db.sync().then(() => {
    server.listen().then(({ url }) => {
        console.log(`Server running at ` + url);
    });
})
