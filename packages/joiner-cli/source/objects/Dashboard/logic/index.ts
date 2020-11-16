// #region imports
    // #region internal
    import {
        serverStart,
    } from './server';
    // #endregion internal
// #endregion imports



// #region module
const dashboardStatus = async () => {
    // read configuration file
    // log the data
    console.log(`status.`);
}


const dashboardStart = async () => {
    // read configuration file

    // check if server already started

    // start server
    const data = await serverStart();

    if (!data) {
        return;
    }

    const {
        pid,
        port,
    } = data;

    console.log(`start`, pid, port);
}


const dashboardStop = async () => {
    // read configuration file

    // check if server started

    // stop server
    console.log(`stop.`);
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
