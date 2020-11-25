// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';

    import {
        PluridCopyableLine,
    } from '@plurid/plurid-ui-react';
    // #endregion libraries


    // #region external
    import {
        JoinerConfiguration,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const configurationRowRenderer = (
    configuration: JoinerConfiguration,
    handleConfigurationObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        path,
    } = configuration;

    return (
        <>
            <PluridCopyableLine
                data={path}
            />

            <div>
                {path}
            </div>

            <PluridIconDelete
                atClick={() => handleConfigurationObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    configurations: JoinerConfiguration[],
) => {
    const searchTerms = configurations.map(
        configuration => {
            const {
                id,
                path,
            } = configuration;

            const searchTerm = {
                id,
                data: [
                    path.toLowerCase(),
                    id.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
