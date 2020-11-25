// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getPackages: ResponsePackages!
    }
`;


export const mutations = gql`
    extend type Mutation {
        generatePackage(input: InputValueString!): ResponsePackage!
        obliteratePackage(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponsePackage {
        status: Boolean!
        error: Error
        data: Package
    }

    type ResponsePackages {
        status: Boolean!
        error: Error
        data: [Package!]
    }

    type Package {
        id: String!
        path: String!
    }

    extend type Owner {
        packages: [Package!]
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
`;
// #endregion exports
