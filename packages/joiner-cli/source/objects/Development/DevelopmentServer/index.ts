// #region imports
    // #region libraries
    import http from 'http';
    // #endregion libraries


    // #region external
    import {
        ConfigurationFile,
    } from '~data/interfaces';

    import DevelopmentWatcher from '../DevelopmentWatcher';
    // #endregion external
// #endregion imports



// #region module
class DevelopmentServer {
    private server: http.Server;
    private configuration: ConfigurationFile;
    private watcher: DevelopmentWatcher;

    constructor(
        configuration: ConfigurationFile,
    ) {
        this.configuration = configuration;
        this.watcher = new DevelopmentWatcher(configuration);
        this.server = http.createServer();

        process.addListener('SIGINT', () => {
            this.watcher.stop();

            console.log('\n\tJoiner development linking server closed.\n');

            this.server.close();
        });
    }

    start() {
        const port = this.configuration.development.serverPort;
        this.server.listen(port, () => {
            console.log(`\n\tJoiner development linking server started on port ${port}\n`);

            this.watcher.start();
        });
    }
}
// #endregion module



// #region exports
export default DevelopmentServer;
// #endregion exports
