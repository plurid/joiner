// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        registerPackage,
    } from '#server/logic/operators/packages';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const generatePackageLogs = generateMethodLogs('generatePackage');


const generatePackage = async (
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
        generatePackageLogs.infoStart,
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
                generatePackageLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    generatePackageLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const registeredPackage = await registerPackage(name);

            logger.log(
                generatePackageLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: registeredPackage,
            };
        }
        // #endregion private usage


        // #region public usage
        const registeredPackage = await registerPackage(name);

        logger.log(
            generatePackageLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: registeredPackage,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            generatePackageLogs.errorEnd,
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
export default generatePackage;
// #endregion exports
