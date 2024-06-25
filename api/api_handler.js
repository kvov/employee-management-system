const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { list, create, get, update, remove } = require('./employees');
require('dotenv').config();
const about = require('./about');

/** API HANDLERS * */
const resolvers = {
    Query: {
        about: about.getAboutMessage,
        employeeList: list,
        employee: get,
    },
    Mutation: {
        setAboutMessage: about.getAboutMessage,
        employeeCreate: create,
        employeeUpdate: update,
        employeeDelete: remove,
    },

    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Custom scalar type for Date',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            const options = { timeZone: 'UTC' }; 
            return new Date(value).toLocaleDateString('en-CA', options);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value); 
            }
            throw new UserInputError("Date shall be in yyyy-mm-dd format");
        },
    })
};


const server = new ApolloServer({
    typeDefs:fs.readFileSync('schema.graphql','utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

function installHandler(app) {
    const ENABLE_CORS = process.env.ENABLE_CORS === 'true';
    server.applyMiddleware({ app, path: '/graphql', cors: ENABLE_CORS });
}

module.exports = { installHandler };
