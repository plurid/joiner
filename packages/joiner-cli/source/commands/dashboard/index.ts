// #region imports
    // #region external
    import {
        dashboardStatus,
        dashboardStart,
        dashboardStop,
        dashboardRegister,
        dashboardDeregister,
    } from '../../objects/Dashboard/logic';
    // #endregion external
// #endregion imports



// #region module
const resolveCommand = (
    value?: string,
) => {
    if (!value) {
        return 'start';
    }

    const cleanValue = value.toLowerCase().trim();

    if (
        cleanValue === 'status'
        || cleanValue === 'start'
        || cleanValue === 'stop'
        || cleanValue === 'register'
        || cleanValue === 'deregister'
    ) {
        return cleanValue;
    }

    return;
}


const dashboardCommand = async (
    value: string | undefined,
    options?: any,
) => {
    const command = resolveCommand(value);

    if (!command) {
        console.log(`Dashboard command '${value}' is not adequate.`);

        return;
    }

    switch(command) {
        case 'status':
            await dashboardStatus();
            break;
        case 'start':
            await dashboardStart();
            break;
        case 'stop':
            await dashboardStop();
            break;
        case 'register':
            await dashboardRegister(
                options,
            );
            break;
        case 'deregister':
            await dashboardDeregister(
                options,
            );
            break;
    }
}
// #endregion module



// #region exports
export default dashboardCommand;
// #endregion exports
