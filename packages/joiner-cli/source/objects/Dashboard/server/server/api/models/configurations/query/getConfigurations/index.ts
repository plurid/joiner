// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        readConfigurations,
    } from '#server/logic/operators/configurations';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getConfigurationsLogs = generateMethodLogs('getConfigurations');

const getConfigurations = async (
    context: Context,
) => {
    // #region context unpack
    const {
        paths,

        request,

        privateUsage,
        privateOwnerIdentonym,

        customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        getConfigurationsLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                getConfigurationsLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    getConfigurationsLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                getConfigurationsLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: [
                    // ...Configurations,
                ],
            };
        }
        // #endregion private usage


        // #region public usage
        logger.log(
            getConfigurationsLogs.infoSuccessCustomLogicUsage,
            logLevels.info,
        );

        const data = await readConfigurations(paths);

        return {
            status: true,
            data,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            getConfigurationsLogs.errorEnd,
            logLevels.error,
            error,
        );

        return {
            status: false,
        };
        // #endregion error handle
    }
}
// #endregion module



// #region exports
export default getConfigurations;
// #endregion exports
