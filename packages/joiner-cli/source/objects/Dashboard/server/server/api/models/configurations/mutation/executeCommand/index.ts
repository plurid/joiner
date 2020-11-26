// #region imports
    // #region libraries
    import fsSync from 'fs';

    import {
        spawn,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputExecuteCommand,
    } from '#server/data/interfaces';

    import {
        generateMethodLogs,
    } from '#server/utilities';

    import {
        hashString,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const identifyConfiguration = (
    paths: string[],
    id: string,
) => {
    for (const path of paths) {
        const hash = hashString(path);

        if (id === hash) {
            return path;
        }
    }

    return;
}


export const executeCommandLogs = generateMethodLogs('executeCommand');


const executeCommand = async (
    input: InputExecuteCommand,
    context: Context,
) => {
    try {
        const {
            paths,
        } = context;

        const {
            command,
            configurationID,
            package: packageName,
        } = input;


        const configurationPath = identifyConfiguration(
            paths,
            configurationID,
        );

        if (!configurationPath) {
            return {
                status: false,
            };
        }

        const out = fsSync.openSync('./out.log', 'a');
        const error = fsSync.openSync('./out.log', 'a');
        const spawnedChild = spawn(
            'joiner',
            [
                '-c',
                configurationPath,
                command,
                packageName,
            ],
            {
                stdio: [
                    'ignore',
                    out,
                    error,
                ],
                detached: true,
            },
        );

        spawnedChild.unref();

        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default executeCommand;
// #endregion exports
