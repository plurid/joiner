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
    console.log(`start.`);
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
