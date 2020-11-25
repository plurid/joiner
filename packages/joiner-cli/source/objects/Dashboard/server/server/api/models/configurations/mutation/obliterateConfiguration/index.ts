// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        deregisterConfiguration,
    } from '#server/logic/operators/configurations';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const obliterateConfigurationLogs = generateMethodLogs('obliterateConfiguration');


const obliterateConfiguration = async (
    input: InputValueString,
    context: Context,
) => {
    // #region context unpack
    const {
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
        obliterateConfigurationLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region input unpack
        const {
            value: name,
        } = input;
        // #endregion input unpack


        // #region private usage
        if (privateUsage) {
            logger.log(
                obliterateConfigurationLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    obliterateConfigurationLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await deregisterConfiguration(name);

            logger.log(
                obliterateConfigurationLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion private usage


        // #region public usage
        await deregisterConfiguration(name);

        logger.log(
            obliterateConfigurationLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            obliterateConfigurationLogs.errorEnd,
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
export default obliterateConfiguration;
// #endregion exports
