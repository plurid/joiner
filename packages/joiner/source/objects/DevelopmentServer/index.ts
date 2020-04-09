import http from 'http';

import {
    ConfigurationFile,
} from '../../data/interfaces';



class DevelopmentServer {
    private server: http.Server;
    private configuration: ConfigurationFile;

    constructor(
        configuration: ConfigurationFile,
    ) {
        this.configuration = configuration;
        this.server = http.createServer((req, res) => {
        });

        process.addListener('SIGINT', () => {
            this.server.close();
        });
    }

    start() {
        this.server.listen(this.configuration.development.serverPort, () => {
            console.log('Joiner development server started.');
        });
    }
}


export default DevelopmentServer;
