// #region imports
    // #region imports
    import {
        execSync,
    } from 'child_process';

    import fetch from 'cross-fetch';
    // #endregion imports


    // #region external
    import {
        JoinerConfigurationFile,
    } from '../../../data/interfaces';

    import {
        updateConfigurationFile,
        readConfigurationFile,

        resolveAbsolutePath,
    } from '~services/utilities';
    // #endregion external


    // #region internal
    import {
        serverStart,
    } from './server';
    // #endregion internal
// #endregion imports



// #region module
const verifyDashboard = async (
    address: string,
) => {
    try {
        const response = await fetch(address);

        if (response.status !== 200) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}


const dashboardStatus = async () => {
    const configurationFile = await readConfigurationFile();
    const {
        dashboard,
    } = configurationFile;

    if (
        !dashboard?.port
        || !dashboard?.pid
    ) {
        console.log(`\n\tJoiner dashboard not started.\n`);
        return;
    }

    const dashboardAdress = `http://localhost:${dashboard.port}`;
    const dashboardActive = await verifyDashboard(dashboardAdress);

    if (!dashboardActive) {
        // Clean dashboard metadata since process is no longer active.
        const updatedConfigurationFile = {
            dashboard: undefined,
        };
        await updateConfigurationFile(updatedConfigurationFile);

        console.log(`\n\tJoiner dashboard not started.\n`);
        return;
    }

    console.log(`\n\tJoiner dashboard started on ${dashboardAdress}\n`);
}


const dashboardStart = async () => {
    const configurationFile = await readConfigurationFile();

    if (
        configurationFile?.dashboard
    ) {
        const dashboardAdress = `http://localhost:${configurationFile.dashboard.port}`;
        const dashboardActive = await verifyDashboard(dashboardAdress);

        if (dashboardActive) {
            console.log(`\n\tJoiner dashboard already started on ${dashboardAdress}\n`);
            return;
        } else {
            // Clean dashboard metadata since process is no longer active.
            const updatedConfigurationFile = {
                dashboard: undefined,
            };
            await updateConfigurationFile(updatedConfigurationFile);
        }
    }


    const data = await serverStart();
    if (!data) {
        return;
    }

    const {
        pid,
        port,
    } = data;
    if (!pid) {
        return;
    }

    const updatedConfigurationFile: Partial<JoinerConfigurationFile> = {
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

        try {
            const killCommand = `kill -9 ${dashboard.pid}`;
            execSync(killCommand);
        } catch (error) {
            // continue
        }

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
    try {
        const configurationFile = await readConfigurationFile();

        const pathValue = resolveAbsolutePath(options.path);

        const paths: string[] = [
            ...(configurationFile.paths || []),
            pathValue,
        ];

        await updateConfigurationFile({
            paths,
        });

        console.log(`\n\t${options.path} registered.\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
}


const dashboardDeregister = async (
    options: any,
) => {
    try {
        const configurationFile = await readConfigurationFile();

        const paths: string[] = [
            ...(configurationFile.paths || []),
        ];

        const pathValue = resolveAbsolutePath(options.path);

        const updatedPaths = paths.filter(path => path !== pathValue);

        await updateConfigurationFile({
            paths: updatedPaths,
        });

        console.log(`\n\t${options.path} deregistered.\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
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
