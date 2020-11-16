// #region imports
    // #region libraries
    import PluridServer, {
        PluridServerMiddleware,
        PluridServerService,
        PluridServerServicesData,
        PluridServerPartialOptions,
        PluridServerTemplateConfiguration,
    } from '@plurid/plurid-react-server';

    import helmet from '#kernel-services/helmet';

    import reduxStore from '#kernel-services/state/store';
    import apolloClient from '#kernel-services/graphql/client';
    // #endregion libraries


    // #region external
    import {
        routes,
        shell,
    } from '../shared';
    // #endregion external


    // #region internal
    import preserves from './preserves';

    import setupHandlers from './handlers';
    // #endregion internal
// #endregion imports



// #region module
// #region constants
/** ENVIRONMENT */
const watchMode = process.env.PLURID_WATCH_MODE === 'true';
const isProduction = process.env.ENV_MODE === 'production';
const buildDirectory = 'distribution/dashboard';
const port = process.env.PORT || 10100;

const applicationRoot = 'joiner-application';
const openAtStart = watchMode
    ? false
    : isProduction
        ? false
        : true;
const debug = isProduction
    ? 'info'
    : 'error';


/** Custom styles to be loaded into the template. */
const styles: string[] = [
    //
];


/** Express-like middleware. */
const middleware: PluridServerMiddleware[] = [
    //
];


/** Services to be used in the application. */
const services: PluridServerService[] = [
    'Apollo',
    'Redux',
];


const servicesData: PluridServerServicesData = {
    apolloClient,
    reduxStore,
    reduxStoreValue: {},
};

const options: PluridServerPartialOptions = {
    serverName: 'Joiner Server',
    buildDirectory,
    open: openAtStart,
    debug,
    ignore: [
        '/joiner',
    ],
};

const template: PluridServerTemplateConfiguration = {
    root: applicationRoot,
};
// #endregion constants


// #region server
const joinerServer = new PluridServer({
    helmet,
    routes,
    preserves,
    shell,
    styles,
    middleware,
    services,
    servicesData,
    options,
    template,
});


const joinerSetup = (
) => {
    setupHandlers(
        joinerServer,
    );
}
// #endregion server
// #endregion module



// #region run
/**
 * If the file is called directly, as in `node build/index.js`,
 * it will run the server.
 *
 * The check is in place so that the server can also be imported
 * for programmatic usage.
 */
if (require.main === module) {
    joinerSetup(
        // mockLogic,
    );

    joinerServer.start(port);
}
// #endregion run



// #region exports
export {
    joinerSetup,
};

export default joinerServer;
// #endregion exports
