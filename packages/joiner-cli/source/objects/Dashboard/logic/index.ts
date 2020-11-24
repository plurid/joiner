// #region imports
    // #region imports
    import {
        execSync,
    } from 'child_process';
    // #endregion imports


    // #region external
    import {
        updateConfigurationFile,
        readConfigurationFile,

        resolveAbsolutePath,
    } from '#services/utilities';
    // #endregion external


    // #region internal
    import {
        serverStart,
    } from './server';
    // #endregion internal
// #endregion imports



// #region module
const dashboardStatus = async () => {
    const configurationFile = await readConfigurationFile();
    const {
        dashboard,
    } = configurationFile;

    if (
        dashboard?.port
        && dashboard?.pid
    ) {
        console.log(`\n\tJoiner dashboard started on http://localhost:${dashboard.port}\n`);
        return;
    }

    console.log(`\n\tJoiner dashboard not started.\n`);
}


const dashboardStart = async () => {
    const configurationFile = await readConfigurationFile();

    if (
        configurationFile?.dashboard
    ) {
        console.log(`\n\tJoiner dashboard already started on http://localhost:${configurationFile.dashboard.port}\n`);
        return;
    }


    const data = await serverStart();
    if (!data) {
        return;
    }

    const {
        pid,
        port,
    } = data;

    const updatedConfigurationFile = {
        dashboard: {
            pid,
            port,
        },
    };
    await updateConfigurationFile(updatedConfigurationFile);

    console.log(`\n\tJoiner dashboard started on http://localhost:${port}\n`);
}


const dashboardStop = async () => {
    try {
        const configurationFile = await readConfigurationFile();
        const {
            dashboard,
        } = configurationFile;

        if (
            !dashboard
        ) {
            console.log(`\n\tJoiner dashboard not started.\n`);
            return;
        }

        const killCommand = `kill -9 ${dashboard.pid}`;
        execSync(killCommand);

        const updatedConfigurationFile = {
            dashboard: undefined,
        };
        await updateConfigurationFile(updatedConfigurationFile);

        console.log(`\n\tJoiner dashboard stopped on port ${dashboard.port}.\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
}


const dashboardRegister = async (
    options: any,
) => {
    const configurationFile = await readConfigurationFile();

    const pathValue = resolveAbsolutePath(options.path);

    const paths: string[] = [
        ...(configurationFile.paths || []),
        pathValue,
    ];

    await updateConfigurationFile({
        paths,
    });

    console.log(`${options.path} registered.`);
}


const dashboardDeregister = async (
    options: any,
) => {
    const configurationFile = await readConfigurationFile();

    const paths: string[] = [
        ...(configurationFile.paths || []),
    ];

    const pathValue = resolveAbsolutePath(options.path);

    const updatedPaths = paths.filter(path => path !== pathValue);

    await updateConfigurationFile({
        paths: updatedPaths,
    });

    console.log(`${options.path} deregistered.`);
}
// #endregion module



// #region exports
export {
    dashboardStatus,
    dashboardStart,
    dashboardStop,
    dashboardRegister,
    dashboardDeregister,
};
// #endregion exports
