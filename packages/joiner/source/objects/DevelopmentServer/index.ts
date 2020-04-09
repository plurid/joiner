import http from 'http';

import {
    ConfigurationFile,
} from '../../data/interfaces';

import DevelopmentWatcher from '../DevelopmentWatcher';



class DevelopmentServer {
    private server: http.Server;
    private configuration: ConfigurationFile;
    private watcher: DevelopmentWatcher;

    constructor(
        configuration: ConfigurationFile,
    ) {
        this.configuration = configuration;
        this.watcher = new DevelopmentWatcher(configuration);
        this.server = http.createServer((req, res) => {
        });

        process.addListener('SIGINT', () => {
            this.watcher.stop();

            console.log('\n\tJoiner development server closed.\n');

            this.server.close();
        });
    }

    start() {
        const port = this.configuration.development.serverPort;
        this.server.listen(port, () => {
            console.log(`\n\tJoiner development server started on port ${port}\n`);

            this.watcher.start();
        });
    }
}


export default DevelopmentServer;
