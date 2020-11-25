// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        registerConfiguration,
    } from '#server/logic/operators/configurations';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const generateConfigurationLogs = generateMethodLogs('generateConfiguration');


const generateConfiguration = async (
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
        generateConfigurationLogs.infoStart,
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
                generateConfigurationLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    generateConfigurationLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const registeredConfiguration = await registerConfiguration(name);

            logger.log(
                generateConfigurationLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: registeredConfiguration,
            };
        }
        // #endregion private usage


        // #region public usage
        const registeredConfiguration = await registerConfiguration(name);

        logger.log(
            generateConfigurationLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: registeredConfiguration,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            generateConfigurationLogs.errorEnd,
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
export default generateConfiguration;
// #endregion exports
