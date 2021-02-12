// #region imports
    // #region libraries
    import React from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridIconPlay,
        PluridIconCommand,
        PluridIconReset,
        PluridIconAdd,
        PluridIconRepository,
        PluridIconExtract,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import client from '~kernel-services/graphql/client';

    import {
        EXECUTE_COMMAND,
    } from '~kernel-services/graphql/mutate';
    // #endregion external


    // #region internal
    import {
        StyledPackageLine,
        StyledPackageLineButtons,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface PackageLineProperties {
    // #region required
        // #region values
        id: string;
        name: string;
        theme: Theme;
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

const PackageLine: React.FC<PackageLineProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            id,
            name,
            theme,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region handlers
    const executeCommand = async (
        command: string
    ) => {
        try {
            const input = {
                configurationID: id,
                command,
                package: name,
            };

            client.mutate({
                mutation: EXECUTE_COMMAND,
                variables: {
                    input,
                },
            });

            return;
        } catch (error) {
            return;
        }
    }
    // #endregion handlers


    // #region render
    return (
        <StyledPackageLine
            theme={theme}
        >
            <div>
                {name}
            </div>

            <StyledPackageLineButtons>
                <PluridIconPlay
                    title="run"
                />

                <PluridIconCommand
                    title="command"
                />

                <PluridIconReset
                    title="update"
                    atClick={() => executeCommand('update')}
                />

                <PluridIconAdd
                    title="patch"
                    atClick={() => executeCommand('patch')}
                />

                <PluridIconRepository
                    title="commit"
                    atClick={() => executeCommand('commit')}
                />

                <PluridIconExtract
                    title="publish"
                    atClick={() => executeCommand('publish')}
                />
            </StyledPackageLineButtons>
        </StyledPackageLine>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default PackageLine;
// #endregion exports
