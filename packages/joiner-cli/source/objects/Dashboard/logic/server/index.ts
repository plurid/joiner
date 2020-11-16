// #region imports
    // #region libraries
    import fsSync, {
        promises as fs,
    } from 'fs';

    import {
        spawn,
    } from 'child_process';
    // #endregion libraries
// #endregion imports



// #region module
const serverStart = async () => {
    const out = fsSync.openSync('./out.log', 'a');
    const error = fsSync.openSync('./out.log', 'a');

    const spawnedChild = spawn(
        'node',
        [
            './dashboard/index.js',
        ],
        {
            cwd: __dirname,
            stdio: [
                'ignore',
                out,
                error,
            ],
            detached: true,
        },
    );

    const {
        pid,
    } = spawnedChild;

    const port: string = await new Promise(async (resolve, _) => {
        setTimeout(async () => {
            const outFile = await fs.readFile(
                './out.log',
                'utf-8',
            );

            fs.unlink('./out.log');

            resolve(outFile);
        }, 1_000);
    });

    spawnedChild.unref();

    const parsedPort = parseInt(port);

    if (!parsedPort) {
        return;
    }

    return {
        pid,
        port: parsedPort,
    };
}
// #endregion module



// #region exports
export {
    serverStart,
};
// #endregion exports
