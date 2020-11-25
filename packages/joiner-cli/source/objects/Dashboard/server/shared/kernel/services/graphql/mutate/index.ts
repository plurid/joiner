// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const OBLITERATE_CONFIGURATION = gql`
    mutation ObliterateConfiguration($input: InputValueString!) {
        obliterateConfiguration(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const EXECUTE_COMMAND = gql`
    mutation ExecuteCommand($input: InputExecuteCommand!) {
        executeCommand(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const LOGIN = gql`
    mutation Login($input: InputLogin!) {
        login(input: $input) {
            status
            error {
                type
                path
                message
            }
            data {
                id
            }
        }
    }
`;


export const LOGOUT = gql`
    mutation Logout {
        logout {
            status
            error {
                type
                path
                message
            }
        }
    }
`;
// #endregion module
