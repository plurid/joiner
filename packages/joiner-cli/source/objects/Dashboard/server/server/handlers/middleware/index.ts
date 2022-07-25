// #region imports
    // #region libraries
    import {
        Express,
    } from 'express';

    import {
        json as jsonParser,
    } from 'body-parser';

    import cookieParser from 'cookie-parser';
    // #endregion libraries


    // #region external
    import {
        HEALTH_CHECK_ENDPOINT,

        Headers,
        ContentTypes,
    } from '~server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const setupMiddleware = async (
    instance: Express,
) => {
    instance.use(
        cookieParser() as any,
        jsonParser({
            limit: '100mb',
        }) as any,
    );

    instance.post(
        HEALTH_CHECK_ENDPOINT,
        (request, response, next) => {
            response.setHeader(
                Headers.ContentType,
                ContentTypes.json,
            );

            response.end(
                JSON.stringify(
                    { status: true },
                ),
            );
        },
    );
}
// #endregion module



// #region exports
export default setupMiddleware;
// #endregion exports
