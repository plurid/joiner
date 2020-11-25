// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getConfigurations: ResponseConfigurations!
    }
`;


export const mutations = gql`
    extend type Mutation {
        executeCommand(input: InputExecuteCommand!): Response!
        generateConfiguration(input: InputValueString!): ResponseConfiguration!
        obliterateConfiguration(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseConfiguration {
        status: Boolean!
        error: Error
        data: Configuration
    }

    type ResponseConfigurations {
        status: Boolean!
        error: Error
        data: [Configuration!]
    }

    type Configuration {
        id: String!
        path: String!
        packages: [String!]
    }

    extend type Owner {
        configurations: [Configuration!]
    }
`;


export const inputs = gql`
    input InputExecuteCommand {
        configurationID: String!
        command: String!
        package: String!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
// #endregion exports
