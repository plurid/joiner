// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
        PluridIconInfo,
    } from '@plurid/plurid-icons-react';

    import {
        PluridLink,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        JoinerLog,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const logRowRenderer = (
    log: JoinerLog,
    handleLogObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        package: packageName,
        command,
        startAt,
        finishedAt,
    } = log;

    return (
        <>
            <div>
                {startAt} {packageName} {command}
            </div>

            <PluridLink
                route={`/log/${id}`}
                devisible={true}
                style={{
                    display: 'grid',
                }}
            >
                <PluridIconInfo
                    // title="details"
                    atClick={() => {}}
                />
            </PluridLink>

            <PluridIconDelete
                // title="delete"
                atClick={() => handleLogObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    logs: JoinerLog[],
) => {
    const searchTerms = logs.map(
        log => {
            const {
                id,
                package: packageName,
                command,
            } = log;

            const searchTerm = {
                id,
                data: [
                    packageName.toLowerCase(),
                    command.toLowerCase(),
                    id.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
