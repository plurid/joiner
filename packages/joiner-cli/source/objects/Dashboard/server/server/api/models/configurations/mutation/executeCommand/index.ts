// #region imports
    // #region libraries
    import path from 'path';
    import fs from 'fs';

    import {
        spawn,
    } from 'child_process';

    import {
        sha,
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputExecuteCommand,
    } from '~server/data/interfaces';

    import {
        generateMethodLogs,
    } from '~server/utilities';

    import {
        hashString,
    } from '~services/utilities';
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
            logsPath,
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

        const packageSha = await sha.compute(packageName);
        const logFilename = path.join(
            logsPath,
            `./out-${packageSha}-${command}-${uuid.multiple(2)}.log`,
        );

        const out = fs.openSync(logFilename, 'a');
        const error = fs.openSync(logFilename, 'a');

        fs.writeFileSync(
            logFilename,
            `started at ${new Date(Date.now()).toLocaleString()}\n\n`,
        );

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

        spawnedChild.on('exit', () => {
            fs.appendFileSync(
                logFilename,
                `\nfinished at ${new Date(Date.now()).toLocaleString()}\n`,
            );
        });

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
