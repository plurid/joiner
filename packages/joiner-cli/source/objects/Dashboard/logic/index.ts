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
    const {
        dashboard,
    } = configurationFile;

    if (
        dashboard?.port
        && dashboard?.pid
    ) {
        console.log(`\n\tJoiner dashboard already started on http://localhost:${dashboard.port}\n`);
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

    console.log(`\n\tJoiner dashboard stopped on port ${dashboard.port}.\n`);
}


const dashboardRegister = async (
    options: any,
) => {
    // add options.path to configuration

    console.log(`register.`, options);
}


const dashboardDeregister = async (
    options: any,
) => {
    // remove options.path to configuration

    console.log(`deregister.`, options);
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
