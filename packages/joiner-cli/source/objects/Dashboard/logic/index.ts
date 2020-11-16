// #region module
const dashboardStart = async () => {
    console.log(`start.`);
}


const dashboardStop = async () => {
    console.log(`stop.`);
}


const dashboardRegister = async (
    options: any,
) => {
    console.log(`register.`, options);
}


const dashboardDeregister = async (
    options: any,
) => {
    console.log(`deregister.`, options);
}
// #endregion module



// #region exports
export {
    dashboardStart,
    dashboardStop,
    dashboardRegister,
    dashboardDeregister,
};
// #endregion exports
